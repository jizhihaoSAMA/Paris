<template>
  <div style="padding: 20px 0">
    <b-container>
      <h5 style="margin: 20px 0">共找到相应结果 {{ total_count }} 条</h5>
      <b-row>
        <b-col
          cols="4"
          v-for="(item, index) in items_list"
          :key="item.id"
          class="mt-2 mb-2"
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
                v-for="url in get_image_list(item.id)"
                :key="url"
                :img-src="url"
              >
              </b-carousel-slide>
            </b-carousel>
            <b-list-group-item>
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
                  {{ item.neiborghood
                  }}{{ convert_room_amount2cn(item.room_amount) }} -
                  {{ item.room_name }}
                </b-link>
              </div>
              <div class="price">¥{{ item.price }}元/月</div>
              <div class="extra_info">
                <small>
                  {{ item.size }}㎡ | {{ item.located_floor }}/{{
                    item.total_floor
                  }}层
                </small>
                <div>
                  <small>
                    <b-icon icon="geo-alt" />
                    {{ item.neiborghood_geo }}
                  </small>
                </div>
                <div>
                  <div
                    class="special_tag"
                    v-for="tag in item.special_tags"
                    :key="tag"
                  >
                    {{ tag }}
                  </div>
                </div>
              </div>
            </b-list-group-item>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hover_item_index: null,
      items_list: [
        {
          id: 1,
          is_full_rent: true,
          neiborghood: '你好小区',
          room_amount: 3,
          room_name: '南卧',
          size: 12,
          located_floor: 3,
          total_floor: 6,
          special_tags: ['深呼吸1.0', '新校区', '可短签'],
          price: 2300,
          neiborghood_geo: '距离地铁站1km',
        },
        {
          id: 2,
          is_full_rent: true,
          neiborghood: '你好小区',
          room_amount: 3,
          room_name: '南卧',
          size: 12,
          located_floor: 3,
          total_floor: 6,
          special_tags: ['深呼吸1.0', '新校区', '可短签'],
          price: 2300,
          neiborghood_geo: '距离地铁站1km',
        },
        {
          id: 3,
          is_full_rent: true,
          neiborghood: '你好小区',
          room_amount: 3,
          room_name: '南卧',
          size: 12,
          located_floor: 3,
          total_floor: 6,
          special_tags: ['深呼吸1.0', '新校区', '可短签'],
          price: 2300,
          neiborghood_geo: '距离地铁站1km',
        },
        {
          id: 4,
          is_full_rent: true,
          neiborghood: '你好小区',
          room_amount: 3,
          room_name: '南卧',
          size: 12,
          located_floor: 3,
          total_floor: 6,
          special_tags: ['深呼吸1.0', '新校区', '可短签'],
          price: 2300,
          neiborghood_geo: '距离地铁站1km',
        },
      ],
      total_count: 103,
    }
  },
  methods: {
    get_image_list(id) {
      var width = 400
      var height = 300
      var images = []
      for (let i = id, count = 0; count < 3; i = i * 8, count++) {
        images.push(`https://picsum.photos/${width}/${height}/?image=${i}`)
      }
      return images
    },
    convert_room_amount2cn(amount) {
      let map = [null, '一', '两', '三', '四', '五', '六', '七', '八']
      return map[amount] + '居室'
    },
    enter_item(e, index) {
      this.$refs[index][0].interval = 1000
      e.target.children[0].children[1].style.display = null
    },
    outer_item(e, index) {
      this.$refs[index][0].interval = 0
      e.target.children[0].children[1].style.display = 'none'
    },
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
  font-size: 80%;
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
