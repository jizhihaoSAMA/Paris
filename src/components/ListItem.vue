<template>
  <b-card no-body>
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
        <b>
          {{ item.is_full_rent ? '整租' : '合租' }} · {{ item.neiborghood
          }}{{ convert_room_amount2cn(item.room_amount) }} -
          {{ item.room_name }}
        </b>
      </div>
      <div class="price">¥{{ item.price }}元/月</div>
      <div class="extra_info">
        <small>
          {{ item.size }}㎡ | {{ item.located_floor }}/{{ item.total_floor }}层
        </small>
        <div>
          <small>
            <b-icon icon="geo-alt" />
            {{ item.neiborghood_geo }}
          </small>
        </div>
        <div>
          <div class="special_tag" v-for="tag in item.special_tags" :key="tag">
            {{ tag }}
          </div>
        </div>
      </div>
    </b-list-group-item>
  </b-card>
</template>

<script>
export default {
  props: ["item", "index"],
  methods: {
    get_image_list(id) {
      var width = 400
      var height = 300
      var images = []
      for (let i = id, count = 0; count < 4; i = i * 2, count++) {
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
  }
}
</script>

<style></style>
