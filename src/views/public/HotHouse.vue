<template>
  <b-container>
    <p></p>
    <p>今日房屋变化趋势 <em style="font-size: 8px;">(每日0点清空)</em>
    </p>
    <b-list-group-item
      v-for="item, index in items"
      :key="item.id"
    >
      <div class="d-flex w-100 justify-content-between">
        <div>
          <p>
            {{ index+1 }}.
            <a :href="'/index/house/detail/'+item.id">{{ item.name }}</a>
          </p>

          <div>{{item.house_loc_area}} / {{item.house_loc_bc}} / {{item.house_neighborhood}}</div>
        </div>
        <div
          style="color: red"
          v-if="item.score < 0"
        >
          <b-icon-arrow-down />{{Math.abs(item.score)}}
        </div>
        <div
          style="color: green"
          v-else
        >
          <b-icon-arrow-up /> {{Math.abs(item.score)}}
        </div>
      </div>

    </b-list-group-item>
    <p></p>
  </b-container>
</template>
<script>
import request from '@/request/request.js'
export default {
  data () {
    return {
      items: null,
    }
  },
  mounted () {
    request.get("/houseList", {
      params: {
        trend: 1,
      }
    }).then(res => {
      this.items = res.data.data.houses
    })
  }
}
</script>
