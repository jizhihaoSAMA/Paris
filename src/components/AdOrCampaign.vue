<template>
  <div class="mt-4 mb-4">
    <b-container fluid>
      <!-- <b-row v-for="item in items" :key="item.img_src">
        <b-img-lazy :src="item.img_src" blank-color="#bbb" class="ad_camp" />
      </b-row> -->
      <b-row class="text-center">
        <b-col cols="12">
          <b-skeleton-img width="100%" animation="wave" height="90px" no-aspect
        /></b-col>
      </b-row>
      <b-row class="text-center mt-2">
        <b-col cols="12">
          <b-skeleton-img width="100%" animation="wave" height="90px" no-aspect
        /></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          img_src: require('@/assets/ad1.png'),
          href: 'test',
        },
      ],
    }
  },
  methods: {
    convert_room_amount2cn(amount) {
      let map = [null, '一', '两', '三', '四', '五', '六', '七', '八']
      return map[amount] + '居室'
    },
  },
}
</script>

<style scoped>
.ad_camp {
  width: 99%;
  height: 80%;
}

h1 {
  background: orange;
  border-radius: 2px;
  border: 1px dotted black;
  padding: 15px 20px;
}
</style>
