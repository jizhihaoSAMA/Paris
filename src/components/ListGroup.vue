<template>
  <div style="padding: 20px 0">
    <nav-filter />
    <ad-or-campaign />
    <b-container>
      <h5 style="margin: 20px 0">查询符合条件的房屋 共找到 {{ total_count }} 条</h5>
      <b-row>
        <b-col
          cols="4"
          v-for="(item, index) in itemList"
          :key="item.id"
          class="mt-2 mb-2 item"
        >
          <b-card
            no-body
            @mouseenter="
              (e) => {
                enter_item(e, index)
              }
            "
            @mouseleave="
              (e) => {
                outer_item(e, index)
              }
            "
          >
            <b-carousel
              v-bind:interval="index == hover_item_index ? 1000 : 0"
              :ref="index"
              no-hover-pause
            >
              <b-carousel-slide
                v-for="url in get_image_list(item.id, item.image_amount)"
                :key="url"
              >
                <b-img-lazy
                  slot="img"
                  :src="url"
                  fluid-grow
                  :width="image_width"
                  :height="image_height"
                  blank-color="#bbb"
                  blank
                  center
                  class="item_image"
                />
              </b-carousel-slide>

            </b-carousel>
            <b-list-group-item>
              <div
                class="w-100"
                style="overflow: hidden; text-overflow: ellipsis"
              >
                <b-link
                  style="color: black;  white-space: nowrap"
                  class="text-decoration-none item_link w-100"
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
              <div class="price">¥{{ item.house_price }}元/月</div>
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
                  v-for="item in getSpecialTags(item)"
                  :key="item"
                  class="special_tag"
                  style="white-space: nowrap;"
                >{{ item }}</div>

              </div>

            </b-list-group-item>
          </b-card>
        </b-col>
      </b-row>
      <div class="overflow-auto p-3">
        <b-pagination-nav
          :link-gen="linkGen"
          :number-of-pages="totalPage"
          use-router
          pills
          v-model="currentPage"
          align="center"
        ></b-pagination-nav>
      </div>
    </b-container>
  </div>
</template>

<script>
import AdOrCampaign from './AdOrCampaign.vue'
import NavFilter from './NavFilter.vue'
import request from '@/request/request.js'

export default {
  data () {
    return {
      hover_item_index: null,
      itemList: null,
      image_width: 400,
      image_height: 400,
      total_count: 103,
      specialTags: {
        "has_lift": "有电梯",
        "support_short_term_rent": "支持短租",
        "has_single_toilet": "有独卫",
        "has_single_balcony": "有独立阳台",
      },
      totalPage: 1,
      currentPage: 1,
    }
  },
  watch: {
    '$route.query': {
      handler: function (to) {
        this.getHouseList()
      },
      deep: true,
    }
  },
  methods: {
    linkGen (pageNum) {
      return {
        query: {
          ...this.$route.query,
          page: pageNum,
        }
      }
    },
    get_image_list (id, amount) {
      if (amount == 0) {
        return ['http://localhost:8081/api/house/houseDetail404.jpg']
      }
      var images = []
      for (let index = 0; index < amount; index++) {
        images.push(
          `http://localhost:8081/api/house/${id}/${index}.png`,
        )
      }
      return images
    },
    convert_room_amount2cn (amount) {
      let map = [null, '一', '两', '三', '四', '五', '六', '七', '八']
      return map[amount] + '居室'
    },
    enter_item (e, index) {
      this.$refs[index][0].interval = 500
      e.target.children[0].children[1].style.display = null
    },
    outer_item (e, index) {
      this.$refs[index][0].interval = 0
      e.target.children[0].children[1].style.display = 'none'
    },
    getHouseList () {
      return request.get('/houseList', {
        params: {
          type: this.$route.query.type,
          area: this.$route.query.area,
          bc: this.$route.query.bc == "不限" ? "" : this.$route.query.bc,
          priceStart: this.$route.query.priceStart,
          priceEnd: this.$route.query.priceEnd,
          fieldMapper: "index",
          page: this.$route.query.page,
          rentType: this.$route.query.rentType,
          supportShortTermRent: this.$route.query.supportShortTermRent,
          hasLift: this.$route.query.hasLift,
          hasSingleToilet: this.$route.query.hasSingleToilet,
          hasSingleBalcony: this.$route.query.hasSingleBalcony,
        }
      }).then(res => {
        this.itemList = res.data.data.houses
        this.totalPage = res.data.data.total_page
        this.total_count = res.data.data.total_count
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
    }
  },
  computed: {
  },
  mounted () {
    this.getHouseList()
  },
  components: {
    NavFilter,
    AdOrCampaign,
  },
}
</script>

<style scoped>
.extra_info {
  color: rgba(0, 0, 0, 0.4);
}

.price {
  position: absolute;
  /* float: right; */
  right: 20px;
  font-size: 20px;
  color: orange;
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

.item_link:hover {
  color: orange !important;
}
</style>
