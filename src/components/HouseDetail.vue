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
      <b-col
        >{{ this.house_detail.is_full_rent ? '整租' : '合租' }} ·
        {{ house_detail.neiborghood
        }}{{ convert_room_amount2cn(house_detail.room_amount) }} -
        {{ house_detail.room_name }}</b-col
      >
    </b-row>
  </b-container>
</template>

<script>
import AdOrCampaign from './AdOrCampaign.vue'
import SearchBox from './SearchBox.vue'
export default {
  data() {
    return {
      house_detail: null,
      images: [],
    }
  },
  methods: {
    get_current_house_detail() {
      return {
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
      }
    },
    get_image_list(id) {
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
    convert_room_amount2cn(amount) {
      let map = [null, '一', '两', '三', '四', '五', '六', '七', '八']
      return map[amount] + '居室'
    },
  },
  created() {
    this.house_detail = this.get_current_house_detail(this.$routes.params.id)
    console.log(this.house_detail)
    this.images = this.get_image_list(this.$routes.params.id)
  },
  components: { SearchBox, AdOrCampaign },
}
</script>

<style></style>
