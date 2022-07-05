<template>
  <div
    class=""
    id=""
  >
    <b-row no-gutters>
      <b-col
        cols="4"
        style="overflow-y: scroll; height: 100vh;"
      >
        <b-list-group>
          <b-list-group-item>
            <b-row>
              <b-col
                v-for="(info, filter_name) in filter_map"
                :key="filter_name"
                cols="3"
              >
                <b-dropdown
                  :text="filter_name"
                  variant="outline-info"
                >
                  <b-dropdown-item-button
                    v-for="(value, option) in info"
                    :key="option"
                    @click="addFilter(value)"
                  >
                    {{ option }}
                  </b-dropdown-item-button>
                </b-dropdown>
              </b-col>
            </b-row>

          </b-list-group-item>
          <b
            v-if="this.houses.length == 0"
            class="text-center"
          >选择指定小区后将显示列表</b>
          <b-list-group-item
            v-for="item in getFilterHouse"
            :key="item.id"
            href="#"
            @click="$router.push({
                      name: 'detail',
                      params: { house_id: item.id },
                    })"
          >
            <div class="w-100 d-flex justify-content-between">
              <div>
                <div>
                  <b-link
                    style="color: black"
                    class="text-decoration-none item_link"
                    @click="
                    $router.push({
                      name: 'detail',
                      params: { house_id: item.id },
                    })
                  "
                  >
                    {{ item.is_full_rent ? '整租' : '合租' }} ·
                    {{ item.house_name}}
                  </b-link>
                </div>
                <br>
                <div class="price">¥{{ item.house_price  }}元/月</div>
                <div class="extra_info">
                  <small>

                    {{ item.house_size }}㎡ | {{ item.floor_info }}
                    层
                  </small>
                  <div>
                    <small>
                      <b-icon icon="geo-alt" />
                      {{ item.house_loc_area }}/{{ item.house_loc_bc }}/{{ item.house_neighborhood }}
                    </small>
                  </div>

                  <div
                    v-for="i in getSpecialTags(item)"
                    :key="i"
                    class="special_tag"
                    style="white-space: nowrap;"
                  >{{ i }}</div>

                </div>
              </div>
              <div>
                <img
                  slot="img"
                  :src="`http://localhost:8081/api/house/${item.id}/0.png`"
                  width="150px"
                  height="150px"
                  blank-color="#bbb"
                  blank
                  center
                  class="item_image"
                  @error="$event.target.src='http://localhost:8081/api/house/houseDetail404.jpg'"
                />
              </div>
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col cols="8">
        <baidu-map
          class="map"
          center="北京"
          :scroll-wheel-zoom="true"
          :zoom="zoom"
          @moving="syncCenterAndZoom"
          @moveend="syncCenterAndZoom"
          @zoomend="syncCenterAndZoom"
          :map-click="false"
          min-zoom="11"
          max-zoom="20"
          @ready="ready"
        >
          <div v-if="this.showNeighbor">
            <neighbor-over-lay
              :geo="info.location"
              :text="name"
              :amount="info.amount"
              @selectionChanged="getSelection"
              v-for="(info, name) in nodeList[4]"
              :key="name"
            />

          </div>
          <div v-else>
            <map-over-lay
              :geo="info.location"
              :text="name"
              :amount="info.amount"
              @selectionChanged="getSelection"
              v-for="(info, name) in nodeList[this.getZoomLevel]"
              :key="name"
            />
          </div>
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        </baidu-map>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import request from '@/request/request.js'
import NeighborOverLay from '../../components/NeighborOverLay.vue'
import MapOverLay from '../../components/MapOverLay.vue'
import Vue from 'vue'

export default {
  components: { NeighborOverLay, MapOverLay },

  methods: {
    syncCenterAndZoom (e) {
      // 11为最小缩放级别，整个北京市。
      // 18为最大缩放级别，街道。

      // 故缩放级别为15显示区域
      // 综上11显示北京市，12-14显示北京各个区，15-显示具体的小区
      this.zoom = e.target.getZoom()
      // 缩放结束再请求

      if (e.type == "onzoomend" || e.type == "onmoveend") {
        this.getAmount()
      }
    },
    getSelection (e) {
      const { lng, lat, showNeighbor } = e
      if (!showNeighbor) {
        this.zoom += 2
        this.map.setZoom(this.zoom)
        this.map.setCenter(new this.BMap.Point(lng, lat))
        this.getAmount()
      } else {
        request.get("/houseList", {
          params: {
            neighborhood: showNeighbor.name,
            fieldMapper: 'index',
          }
        }).then(res => {
          this.houses = res.data.data.houses
          console.log(res)
        })
      }
    },
    getAmount () {
      return {
        1: this.getAllCount,
        2: this.getAreaGroupAmount,
        3: this.getBCGroupAmount,
        4: this.getNeighborhoodAmount,
      }[this.getZoomLevel]()
    },

    ready ({ map, BMap }) {
      this.map = map
      this.BMap = BMap
    },
    getAreaGroupAmount () {
      request.get('/counter', {
        params: {
          'zoomLevel': 2,
        }
      }).then(res => {
        for (const name in res.data.data.counter) {
          console.log(this.nodeList[2][name], name)
          this.nodeList[2][name].amount = res.data.data.counter[name]
        }
      })
    },
    getBCGroupAmount () {
      // 先获取可视区域内的商圈
      var bounds = this.map.getBounds()
      var northEast = bounds.getNorthEast(), southWest = bounds.getSouthWest()
      var res = []
      for (const bc in this.nodeList[3]) {
        const info = this.nodeList[3][bc];
        if (southWest.lat <= info.location.lat
          && info.location.lat <= northEast.lat
          && southWest.lng <= info.location.lng
          && info.location.lng <= northEast.lng) {
          res.push(bc)
        }
      }
      request.get('/counter', {
        params: {
          'zoomLevel': 3,
          'places': res + "",
        }
      }).then(res => {
        console.log(res.data.data.counter)
        for (const key in res.data.data.counter) {
          this.nodeList[3][key].amount = res.data.data.counter[key]
        }
      })
    },
    getNeighborhoodAmount () {
      // 直接传经纬度
      var bounds = this.map.getBounds()
      var northEast = bounds.getNorthEast(), southWest = bounds.getSouthWest()
      request.get('/counter', {
        params: {
          'zoomLevel': 4,
          'location': northEast.lat + "," + northEast.lng + "-" + southWest.lat + "," + southWest.lng,
        }
      }).then(res => {
        for (const key in res.data.data.counter) {
          let value = res.data.data.counter[key];
          let [lat, lng] = value.location.split(", ")
          // 普通的方法没作用，需要用set，vue才会更新
          Vue.set(this.nodeList[4], key, {
            location: { lat, lng },
            amount: value.count
          })
        }
      })
    },
    getAllCount () {
      request.get("/counter", {
        params: {
          "zoomLevel": 1
        }
      }).then(res => {
        this.nodeList[1].北京市.amount = res.data.data.total
      })
    },
    getSpecialTags (item) {
      var res = []
      for (const key in this.specialTags) {
        if (Object.hasOwnProperty.call(this.specialTags, key) && item[key]) {
          const element = this.specialTags[key];
          res.push(element)
        }
      }
      return res
    },
    addFilter (f) {
      if (f.clear) {
        for (let index = 0; index < f.clear.length; index++) {
          const element = f.clear[index];
          Vue.delete(this.filter, element)

        }
        return
      }
      this.filter = { ...this.filter, ...f }
    }
  },
  computed: {
    getZoomLevel () {
      if (this.zoom == 11) {
        return 1
      } else if ([12, 13, 14].includes(this.zoom)) {
        return 2
      } else if ([15, 16].includes(this.zoom)) {
        return 3
      } else {
        return 4
      }
    },
    showNeighbor () {
      return this.getZoomLevel == 4
    },
    getFilterHouse () {
      if (Object.keys(this.filter) == 0) {
        return this.houses
      } else {
        return this.houses.filter((e) => {
          var res = []
          if (this.filter.type == 'full') {
            res.push(e.is_full_rent == true)
          } else if (this.filter.type == 'part') {
            res.push(e.is_full_rent == false)
          }

          if ('start' in this.filter) {
            res.push(e.house_price >= this.filter.start)
          }

          if ('end' in this.filter) {
            res.push(e.house_price < this.filter.end)
          }
          return res.every(e => e == true)
        })
      }
    }
  },
  mounted () {
    this.getAllCount()
  },
  data () {
    return {
      zoom: 11,
      map: null,
      BMap: null,
      commonNodeList: require("@/assets/bc_info.json"),
      houses: [],
      filter: {},
      nodeList: {
        1: { 北京市: { location: { lat: 39.904989, lng: 116.405285 }, amount: "" } },
        2: require("@/assets/area_info.json"),
        3: require("@/assets/bc_info.json"),
        4: {},
      },
      filter_map: {
        整租合租: {
          不限: { clear: ['type'] },
          整租: { type: 'full' },
          合租: { type: 'part' },
        },
        价格筛选: {
          '不限': { clear: ['start', 'end'] },
          '0-1999': {
            start: '0',
            end: '2000',
          },
          '2000-3999': {
            start: '2000',
            end: '4000',
          },
          '4000-5999': {
            start: '4000',
            end: '6000',
          },
          '6000-7999': {
            start: '6000',
            end: '8000',
          },
          '8000-9999': {
            start: '8000',
            end: '10000'
          },
          '10000-11999': {
            start: '10000',
            end: '12000'
          },
          '12000以上': {
            start: '12000',
            end: '99999999',
          }
        },
      },
      specialTags: {
        "has_lift": "有电梯",
        "support_short_term_rent": "支持短租",
        "has_single_toilet": "有独卫",
        "has_single_balcony": "有独立阳台",
      },
    }
  }
}
</script>
<style scoped>
.map {
  width: 100%;
  height: 100vh;
}
.special_tag {
  margin: 10px 0px;
  font-size: 4px;
  padding: 5px 10px;
  margin-right: 5px;
  background: rgba(0, 0, 0, 0.03);
  display: inline-block;
  border-radius: 10%;
}
</style>