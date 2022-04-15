<template>
  <b-container>
    <ad-or-campaign />
    <b-row>
      <b-col cols="7">
        <b-carousel>
          <b-carousel-slide
            v-for="image in images"
            :key="image"
            :img-src="image"
            img-width="200"
            img-height="200"
          >
          </b-carousel-slide>
        </b-carousel>
      </b-col>
      <b-col>
        <b-row>
          <h3>{{ this.house_detail.is_full_rent ? '整租' : '合租' }} ·
            {{ house_detail.neiborghood
        }}{{ convert_amount2cn(house_detail.room_amount) }}居室 -
            {{ house_detail.room_name }}</h3>
          <h2 style="color: orange">￥ {{ house_detail.price }} / 月</h2>
        </b-row>
        <b-row>
          <p>服务费另计，详情请咨询管家</p>
        </b-row>
        <div class="split-line"></div>
        <b-row style="text-align:center">
          <b-col>
            <p class="info-aside">面积</p>
            <h5>{{ house_detail.size}}㎡</h5>
          </b-col>
          <b-col>
            <p class="info-aside">
              户型
            </p>
            <h5>{{ house_detail.room_amount }}室{{ house_detail.saloon_amount}}厅{{house_detail.toilet_amount}}卫</h5>
          </b-col>
          <b-col>
            <p class="info-aside">
              朝向
            <h5>{{ house_detail.room_located}}</h5>
            </p>
          </b-col>
        </b-row>
        <div class="split-line"></div>
        <div
          v-for="(k, v) in get_info_map()"
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
          <b-col>
            <b-button size="lg">
              <b-icon icon="person-bounding-box"></b-icon> 预约看房
            </b-button>
          </b-col>
          <b-col>
            <b-button size="lg">
              <b-icon icon="wallet2"></b-icon> 购买
            </b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <div class="pt-2 pb-2">
      <b-card>
        <b-tabs>
          <b-tab
            v-for="tab in tab_list"
            :key="tab"
            :title="tab"
          >{{ tab }}</b-tab>
        </b-tabs>
      </b-card>
    </div>
  </b-container>
</template>

<script>
import AdOrCampaign from './AdOrCampaign.vue'
import SearchBox from './SearchBox.vue'
export default {
  data () {
    return {
      house_detail: null,
      images: [],
      tab_list: ['房源简介', '租约信息', '相似推荐']
    }
  },
  methods: {
    get_current_house_detail () {
      return {
        id: 1,
        is_full_rent: true,
        neiborghood: '你好小区',
        neiborghood_location: 'A区B街道C号',
        room_amount: 3,
        toilet_amount: 1,
        saloon_amount: 1,
        room_name: '南卧',
        room_located: '南',
        size: 12,
        located_floor: 3,
        total_floor: 6,
        special_tags: ['深呼吸1.0', '新校区', '可短签'],
        price: 2300,
        neiborghood_geo: '距离地铁站1km',
        lift: true
      }
    },
    get_image_list (id) {
      var image_width = 500
      var image_height = 500
      var images = []
      for (let i = id, count = 0; count < 3; i = i * 8, count++) {
        images.push(
          `https://picsum.photos/${image_width}/${image_height}/?image=${i}`,
        )
      }
      return images
    },
    convert_amount2cn (amount) {
      let map = [null, '一', '两', '三', '四', '五', '六', '七', '八']
      return map[amount]
    },
    get_info_map () {
      return {
        小区位置: this.house_detail.neiborghood_location,
        楼层: this.house_detail.located_floor,
        电梯: (this.house_detail.lift ? "有" : "无"),
      }
    }
  },
  created () {
    this.house_detail = this.get_current_house_detail(this.$route.params.house_id)
    console.log(this.house_detail)
    this.images = this.get_image_list(this.$route.params.house_id)
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
</style>
