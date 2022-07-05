<template>
  <b-container>
    <ad-or-campaign />
    <b-row>
      <b-col cols="7">
        <b-carousel
          :interval="0"
          controls
          v-model="slide"
        >
          <b-carousel-slide
            v-for="image in this.imageArr"
            :key="image"
            :img-src="image"
          >
          </b-carousel-slide>
        </b-carousel>
        <div
          class="w-100"
          style="display: flex"
        >
          <div
            v-for="(image, index) in this.imageArr"
            :key="image + 'for show'"
            style="flex-shirnk: 0px; width: 100px; height: 100px; margin: 4px;"
          >
            <b-img
              @click="jump2Img(index)"
              :src="image"
              style="cursor: pointer;"
              class="w-100 h-100"
            ></b-img>
          </div>
        </div>
      </b-col>
      <b-col>
        <b-row>
          <h3>{{houseDetail.house_name}}</h3>
        </b-row>
        <b-row>
          <h4 style="color: orange">￥ {{ houseDetail.house_price }} / 月</h4>
        </b-row>
        <b-row>
          <p>服务费另计，详情请咨询管理员</p>
        </b-row>
        <div class="split-line"></div>
        <b-row style="text-align:center">
          <b-col>
            <p class="info-aside">面积</p>
            <h5>{{ houseDetail.house_size }}㎡</h5>
          </b-col>
          <b-col>
            <p class="info-aside">
              户型
            </p>
            <h5>{{ roomAmount }}室{{ hallAmount}}厅{{toiletAmount}}卫</h5>
          </b-col>
          <b-col>
            <p class="info-aside">
              朝向
            <h5>{{ houseDetail.house_direction}}</h5>
            </p>
          </b-col>
        </b-row>
        <div class="split-line"></div>
        <div
          v-for="(k, v) in getInfoMap()"
          :key="k"
        >
          <b-row style="padding:10px 0">
            <b-col cols="3">
              <p class="info-aside">{{v}}</p>
            </b-col>
            <b-col>
              <h5>{{k}}</h5>
            </b-col>
          </b-row>
          <div class="split-line"></div>
        </div>
        <b-row class="pt-2 pb-2">
          <b-col cols="10">
            <b-button
              class="w-100"
              :variant="houseDetail.appointed ?'primary' :  'outline-primary'"
              @click="showModal"
            >
              <b-icon icon="person-bounding-box"></b-icon> {{houseDetail.appointed ? '取消预约':'预约看房'}}
            </b-button>
          </b-col>
          <b-col cols="#">
            <b-button
              class="w-100 h-100"
              variant="link"
              @click="starHouse"
            >
              <b-icon
                :icon="houseDetail.starred ? 'star-fill': 'star'"
                class="w-100 h-100"
              ></b-icon>
            </b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <div class="pt-2 pb-2">
      <b-card no-body>
        <b-nav
          tabs
          card-header
          slot="header"
          v-b-scrollspy:nav-scroller
        >
          <b-nav-item
            v-for="tab in ['房源简介', '租约信息', '周边信息']"
            :key="tab"
            :href="'#'+tab"
            @click="scrollIntoView"
          >{{tab}}</b-nav-item>
        </b-nav>
        <b-card-body
          id="nav-scroller"
          ref="content"
          style="height:80vh; overflow-y:scroll; position:relative;"
        >
          <div
            class="p-2 m-2"
            id="房源简介"
          >

            <h4>
              房源简介
            </h4>
            <hr>
            <p> {{ houseDetail.house_description}}</p>

            <b-row class="row-cols-5">
              <b-col
                v-for="(v, k, index) in furnitureList"
                :key="k"
                class="text-center"
              >
                <b-img
                  :src="require('@/assets/furniture/'+ v + '.png')"
                  :style="furnitureSelected[index] ? '' : 'opacity: 0.2'"
                ></b-img>
                <p>{{k}}</p>
              </b-col>
            </b-row>
          </div>

          <div
            class="p-2 m-2"
            id='租约信息'
          >
            <h4>
              租约信息
            </h4>
            <hr>
            <p>能否短租： {{houseDetail.support_short_term_rent? '支持短租': '不支持短租'}}</p>
            <p>什么时候起租： {{houseDetail.start_rented_time}}</p>
          </div>
          <div
            class="p-2 m-2"
            id='周边信息'
          >
            <div>
              <h4 style="display: inline;">
                周边信息
              </h4>
              <small>点击地点可查看详情</small>
            </div>

            <hr>
            <!-- <baidu-map
              class="map"
              :map-click="false"
              min-zoom="17"
              max-zoom="17"
              @ready="ready"
            ></baidu-map> -->
            <b-tabs>
              <b-tab
                v-for="(v, item) in aroundList"
                :key="item"
                :title="item"
                lazy
                @click.once="getAround(item)"
              >
                <b-list-group-item
                  v-for="i in aroundList[item]"
                  :key="i.name"
                  :href="i.href"
                >
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{i.name}} </h5>
                    <small class="text-muted">
                      <b-icon-geo-alt />距离小区 {{ i.distance }} m
                    </small>
                  </div>
                  <small>{{ i.address }}</small>
                </b-list-group-item>
              </b-tab>
            </b-tabs>
          </div>
        </b-card-body>
      </b-card>
      <b-modal
        id="modal"
        title="选择预约时间"
        ok-title="确定"
        cancel-title="取消"
        @ok="makeAppointment"
      >
        <b-form-datepicker
          id="example-datepicker"
          v-model="appointedTime"
          class="mb-2"
          :min="new Date()"
          v-bind="labels || {}"
        ></b-form-datepicker>
      </b-modal>
    </div>
  </b-container>
</template>

<script>
import AdOrCampaign from './AdOrCampaign.vue'
import SearchBox from './SearchBox.vue'
import request from '@/request/request.js'

import store from '@/store'

export default {
  data () {
    return {
      houseDetail: {
        floor_info: null,
        furniture_info: 0,
        has_lift: null,
        house_detail_address: null,
        house_direction: null,
        house_loc_area: null,
        house_loc_bc: null,
        house_name: null,
        house_neighborhood: null,
        house_price: null,
        house_size: null,
        image_amount: null,
        owner_id: null,
        start_rented_time: null,
        status: null,
        structure_amount: null,
        support_short_term_rent: null,
        starred: false,
        appointed: false,
        id: null,
      },
      slide: 0,
      furnitureList: { '洗衣机': "xiyiji", '独卫': "toilet", '阳台': "yangtai", 'WIFI': "wifi", '暖气': "nuanqi", '冰箱': "bingxiang", '燃气灶': "ranqizhao", '空调': "airConditioner", "热水器": "reshuiqi", "电视机": "tv" },
      roomAmount: 0,
      hallAmount: 0,
      toiletAmount: 0,
      appointedTime: null,
      map: null,
      BMap: null,
      aroundList: { '美食': [], '购物': [], '休闲娱乐': [], '交通设施': [], '旅游景点': [] },
      labels: {
        weekdayHeaderFormat: 'narrow',
        labelPrevDecade: '过去十年',
        labelPrevYear: '上一年',
        labelPrevMonth: '上个月',
        labelCurrentMonth: '当前月份',
        labelNextMonth: '下个月',
        labelNextYear: '明年',
        labelNextDecade: '下一个十年',
        labelToday: '今天',
        labelSelected: '选定日期',
        labelNoDateSelected: '未选择日期',
        labelCalendar: '日历',
        labelNav: '日历导航',
        labelHelp: '使用光标键浏览日期'
      },
    }
  },
  methods: {
    starHouse () {
      if (!store.state.userModule.userInfo) {
        return this.toast("操作失败", "请先登录", "danger")
      }

      if (this.houseDetail.starred) {
        request.delete("/star", {
          data: {
            houseID: this.houseDetail.id,
          }
        }).then(res => {
          this.houseDetail.starred = false
          this.toast('通知', "取消收藏成功")
          console.log(res)
        }).catch(err => {
          this.toast('通知', "取消收藏失败")
          console.log(err)
        })
      } else {
        request.post("/star", {
          houseID: this.houseDetail.id,
        }).then(res => {
          this.houseDetail.starred = true
          this.toast('通知', "收藏成功")
          console.log(res)
        }).catch(err => {
          this.toast('通知', "收藏失败")
          console.log(err)
        })
      }

    },
    scrollIntoView (event) {
      event.preventDefault()
      const href = event.target.getAttribute('href')
      const el = href ? document.querySelector(href) : null
      if (el) {
        this.$refs.content.scrollTop = el.offsetTop
      }
    },
    getCurrentHouseDetail () {
      request.get('/house', {
        params: {
          id: this.$route.params.house_id
        }
      }).then(res => {
        console.log(res)
        this.houseDetail = res.data.data.house

        var [a, b, c] = res.data.data.house.structure_amount.split(",")
        this.roomAmount = a, this.hallAmount = b, this.toiletAmount = c
      }).catch(err => {
        if (err.status == 403) {

          this.toast("通知", err.data.msg, "danger")
          setTimeout(() => {
            this.$router.go(-1)
          }, 1000)
        }
      })
    },
    convert_amount2cn (amount) {
      let map = [null, '一', '两', '三', '四', '五', '六', '七', '八']
      return map[amount]
    },
    getInfoMap () {
      return {
        小区位置: this.houseDetail.house_loc_area + ' / ' + this.houseDetail.house_loc_bc,
        详细位置: this.houseDetail.house_neighborhood + this.houseDetail.house_detail_address,
        楼层: this.houseDetail.floor_info,
        电梯: (this.houseDetail.has_lift ? "有" : "无"),
      }
    },
    getAround (type_) {
      if (this.aroundList[type_].length != 0) {
        return
      }
      this.location.then(loc => {
        return this.$jsonp("https://api.map.baidu.com/place/v2/search", {
          ak: this.AK,
          region: this.houseDetail.house_loc_area,
          tag: type_,
          query: type_,
          radius: 5000,
          radius_limit: true,
          output: 'json',
          scope: 2,
          location: loc,
          page_size: 20,
        })
      }).then(res => {
        for (let index = 0; index < res.results.length; index++) {
          const element = res.results[index]
          this.aroundList[type_].push({
            address: element.address,
            distance: element.detail_info.distance,
            name: element.name,
            href: element.detail_info.detail_url,
          })
        }
        this.aroundList[type_].sort((a, b) => a.distance - b.distance)
      })
    },
    jump2Img (index) {
      this.slide = index
    },
    showModal () {
      if (!store.state.userModule.userInfo) {
        return this.toast("操作失败", "请先登录")
      }
      this.$bvModal.show('modal')

    },
    makeAppointment () {
      if (!store.state.userModule.userInfo) {
        return this.toast("操作失败", "请先登录")
      }

      if (this.houseDetail.appointed) {
        request.delete("/appointment", {
          data: {
            houseID: this.houseDetail.id,
          }
        }).then(res => {
          this.houseDetail.appointed = false
          this.toast('通知', "取消预约成功")
          console.log(res)
        }).catch(err => {
          console.log(err)
          this.toast('通知', "取消预约失败")
        })
      } else {
        request.post('/appointment', {
          houseID: this.houseDetail.id,
          appointedTime: this.appointedTime,
        }).then(res => {
          this.houseDetail.appointed = true
          this.toast('通知', "预约成功")
          console.log(res)
        }).catch(err => {
          console.log(err)
          this.toast('通知', "预约失败")
        })
      }
    }
  },
  computed: {
    furnitureSelected: function () {
      let n = this.houseDetail.furniture_info
      return [...Array(n)].map((x, i) => n >> i & 1)
    },
    location: function () {
      let n = this.houseDetail.house_neighborhood
      return this.$jsonp("https://api.map.baidu.com/geocoding/v3/", {
        ak: this.AK,
        address: n,
        city: '北京市',
        output: 'json',
      }).then(res => {
        return res.result.location.lat + "," + res.result.location.lng
      })
    },
    imageArr: function () {

      var arr = []
      var id = this.$route.params.house_id
      var length = this.houseDetail.image_amount
      if (length == 0) {
        return [`${this.backApi}/house/houseDetail404.jpg`]
      }
      for (let i = 0; i < length; i++) {
        arr.push(
          `${this.backApi}/house/${id}/${i}.png`,
        )
      }
      return arr
    }
  },
  mounted () {
    this.getCurrentHouseDetail()
    setTimeout(() => { this.getAround('美食') }, 1400)
  },
  components: { SearchBox, AdOrCampaign },
}
</script>

<style>
.split-line {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0 -15px;
}

.info-aside {
  color: rgba(0, 0, 0, 0.4);
  margin-bottom: 10px;
}

.map {
  width: 100%;
  height: 500px;
}
</style>
