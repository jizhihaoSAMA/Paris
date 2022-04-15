<template>
  <div>
    <b-container>
      <b-row align-v="center">
        <b-col
          cols="3"
          style="padding: 40px"
        >
          <b-img
            :src="require('@/assets/logo_orange.png')"
            fluid-grow
            @click="$router.replace({ name: 'home' }).catch((err) => {})"
          />
        </b-col>
        <b-col cols="8">
          <search-box />
        </b-col>
      </b-row>
      <router-view />
    </b-container>
  </div>
</template>

<script>
import searchBox from '@/components/SearchBox'
import NavFilter from './NavFilter.vue'
import ListGroup from './ListGroup.vue'
import HouseDetail from './HouseDetail.vue'

export default {
  data () {
    return {}
  },
  components: {
    searchBox,
    NavFilter,
    ListGroup,
    HouseDetail,
  },
}
</script>

<style scoped></style>
