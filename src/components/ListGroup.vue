<template>
  <div style="padding: 20px 0">
    <b-container>
      <h5 style="margin: 20px 0">共找到相应结果 {{ total_count }} 条</h5>
      <b-row>
        <b-col cols="4" v-for="item in items_list" :key="item.id">
          <b-card no-body>
            <b-carousel img-height="200" img-width="200" controls>
              <b-carousel-slide
                v-for="url in get_image_list(item.id)"
                :key="url"
                :img-src="url"
              >
              </b-carousel-slide>
            </b-carousel>
            <!-- >{{ item.is_full_rent ? '整租' : '合租' }} · {{ item.neiborghood
              }}{{ convert_room_amount2cn(item.room_amount) }} -
              {{ item.room_name }} -->
            <b-list-group-item>
              <div>
                {{ item.is_full_rent ? '整租' : '合租' }} · {{ item.neiborghood
                }}{{ convert_room_amount2cn(item.room_amount) }} -
                {{ item.room_name }}
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
      items_list: [
        {
          id: 1,
          is_full_rent: true,
          neiborghood: '你好小区',
          room_amount: 3,
          room_name: '南卧',
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
      for (let i = id, count = 0; count < 4; i = i * 10, count++) {
        images.push(`https://picsum.photos/${width}/${height}/?image=${i}`)
      }
      return images
    },
    convert_room_amount2cn(amount) {
      let map = [null, '一', '两', '三', '四', '五', '六', '七', '八']
      return map[amount] + '居室'
    },
  },
}
</script>

<style></style>
