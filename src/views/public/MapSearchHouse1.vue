<template>
  <div>
    <b-row no-gutters>
      <b-col cols="4">
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
                  >
                    {{ option }}
                  </b-dropdown-item-button>
                </b-dropdown>
              </b-col>
            </b-row>

          </b-list-group-item>
          <input
            type="text"
            v-model="test"
          >
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
          max-zoom="19"
          @ready="ready"
        >
          <div v-if="showOverLay">
            <map-over-lay
              ref="test"
              :geo="node.location"
              :text="node.name"
              :amount="23"
              @selectionChanged="getSelection"
              v-for="node in nodeList"
              :key="node.name"
              :showNeigbor="getZoomLevel() == 4"
            />
          </div>
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        </baidu-map>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import MapOverLay from '../../components/MapOverLay.vue'
export default {
  components: { MapOverLay },
  mounted () {
    this.$jsonp("https://api.map.baidu.com/place/v2/search", {
      ak: this.AK,
      query: "商圈",
      tag: "商圈",
      region: "海淀区",
      output: "json",
      page_size: 20,
    }).then(res => {
      console.log(res)
    })
    this.getNodeList()
  },
  methods: {
    syncCenterAndZoom (e) {
      // 11为最小缩放级别，整个北京市。
      // 18为最大缩放级别，街道。

      // 故缩放级别为15显示区域
      // 综上11显示北京区，12-14显示北京街道，15-18显示具体的小区
      this.zoom = e.target.getZoom()
      // 缩放结束再请求
      if (e.type == "onzoomend" || e.type == "onmoveend") {
        this.getNodeList()
      }
    },
    getNodeList () {
      this.nodeList = new Array()
      this.showOverLay = false
      var zoomLevel = this.getZoomLevel()
      console.log(zoomLevel, this.zoom)
      if (zoomLevel == 1) {
        // 后期应该改成查询数据库区域的请求
        this.nodeList = [
          {
            name: "北京市",
            amount: 999,
            location: { lng: 116.404, lat: 39.915 },
          }
        ]
        this.showOverLay = true
      } else if (zoomLevel == 2) {
        this.nodeList = [{ "name": "东城区", "amount": 167, "location": { "lng": "116.42", "lat": "39.93" } }, { "name": "西城区", "amount": 118, "location": { "lng": "116.37", "lat": "39.92" } }, { "name": "崇文区", "amount": 105, "location": { "lng": "116.43", "lat": "39.88" } }, { "name": "宣武区", "amount": 86, "location": { "lng": "116.35", "lat": "39.87" } }, { "name": "朝阳区", "amount": 99, "location": { "lng": "116.43", "lat": "39.92" } }, { "name": "丰台区", "amount": 32, "location": { "lng": "116.28", "lat": "39.85" } }, { "name": "石景山区", "amount": 131, "location": { "lng": "116.22", "lat": "39.9" } }, { "name": "海淀区", "amount": 105, "location": { "lng": "116.3", "lat": "39.95" } }, { "name": "门头沟区", "amount": 157, "location": { "lng": "116.1", "lat": "39.93" } }, { "name": "房山区", "amount": 123, "location": { "lng": "116.13", "lat": "39.75" } }, { "name": "通州区", "amount": 161, "location": { "lng": "116.65", "lat": "39.92" } }, { "name": "顺义区", "amount": 74, "location": { "lng": "116.65", "lat": "40.13" } }, { "name": "昌平区", "amount": 161, "location": { "lng": "116.23", "lat": "40.22" } }, { "name": "大兴区", "amount": 3, "location": { "lng": "116.33", "lat": "39.73" } }, { "name": "怀柔区", "amount": 18, "location": { "lng": "116.63", "lat": "40.32" } }, { "name": "平谷区", "amount": 173, "location": { "lng": "117.12", "lat": "40.13" } }, { "name": "密云县", "amount": 140, "location": { "lng": "116.83", "lat": "40.37" } }, { "name": "延庆县", "amount": 185, "location": { "lng": "115.97", "lat": "40.45" } }]
        this.showOverLay = true
      } else if (zoomLevel == 3) {
        let allBC = Object.values(require('@/assets/city_name2code.json'))
        for (const index in allBC) {
          this.nodeList.push(...allBC[index])
        }
      } else {
        console.log(1)
        this.getLiving()
      }
    },
    getSelection (e) {
      const { lng, lat } = e
      this.zoom += 2
      this.map.setZoom(this.zoom)
      this.map.setCenter(new this.BMap.Point(lng, lat))
    },
    getLiving () {
      var total = 0
      // var totalLiving = new Array()
      var asyncList = new Array()
      var bounds = this.map.getBounds()
      this.nodeList = new Array()
      var payload = {
        query: '小区',
        tag: "住宅区",
        location: Object.values(this.map.getCenter()).reverse().join(),
        radius: Math.ceil(this.map.getDistance(bounds.getNorthEast(), bounds.getSouthWest()) / 2),
        ak: this.AK,
        output: 'json',
        radius_limit: true,
        page_size: 20,
      }
      setTimeout(() => {
        this.$jsonp("https://api.map.baidu.com/place/v2/search", { page_num: 0, ...payload }).then(res => {
          total = res.total
          for (let page = 0; page < Math.ceil(total / 20); page++) {
            let p = new Promise((resolve, reject) => {
              this.$jsonp("https://api.map.baidu.com/place/v2/search", {
                page_num: page, ...payload
              }).then(res => {
                resolve([...res.results.map(n => { return { name: n.name, location: n.location } })])
              })
            })
            asyncList.push(p)
          }
          Promise.all(asyncList).then((res) => {
            this.showOverLay = true
            res.forEach(element => {
              this.nodeList.push(...element)
            });
          })
        })
      }, 1000)

    },
    getZoomLevel () {
      if ([11].indexOf(this.zoom) != -1) {
        this.test = "查北京市"
        return 1
      } else if ([12, 13].indexOf(this.zoom) != -1) {
        this.test = "查区域"
        return 2
      } else if ([14, 15, 16].indexOf(this.zoom) != -1) {
        this.test = "查商圈"
        return 3
      } else {
        this.test = "查小区"
        return 4
      }
    },
    ready ({ map, BMap }) {
      this.map = map
      this.BMap = BMap
    }
  },
  data () {
    return {
      zoom: 11,
      test: "",
      nodeList: null,
      map: null,
      BMap: null,
      showOverLay: true,
      filter_map: {
        整租合租: {
          不限: { type: 'all' },
          整租: { type: 'full' },
          合租: { type: 'part' },
        },
        价格筛选: {
          '不限': {},
          '0-2000': {
            start: '0',
            end: '2000',
          },
          '2000-4000': {
            start: '2000',
            end: '4000',
          },
          '4000-6000': {
            start: '4000',
            end: '6000',
          },
          '8000-10000': {
            start: '8000',
            end: '10000'
          },
          '10000-12000': {
            start: '10000',
            end: '12000'
          },
          '12000以上': {
            start: '12000'
          }
        },
        朝向: {
          南: {
            direction: 'south',
          },
          东: {
            direction: 'east',
          },
          北: {
            direction: 'north',
          },
          西: {
            direction: 'western'
          }
        }
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

div.col-4 {
  padding: 0;
}

div.col-8 {
  padding: 0;
}
</style>
