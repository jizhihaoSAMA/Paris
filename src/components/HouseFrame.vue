<template>
  <div>
    <b-container>
      <b-row align-v="center">
        <b-col cols="3" style="padding: 40px">
          <b-img
            :src="require('@/assets/logo.png')"
            fluid-grow
            @click="$router.replace({ name: 'home' }).catch((err) => {})"
          />
        </b-col>
        <b-col cols="8">
          <search-box />
        </b-col>
      </b-row>
    </b-container>
    <nav-filter />
    <list-group />
  </div>
</template>

<script>
import searchBox from '@/components/SearchBox'
import NavFilter from './NavFilter.vue'
import ListGroup from './ListGroup.vue'

export default {
  data() {
    return {}
  },
  components: {
    searchBox,
    NavFilter,
    ListGroup,
  },
}
</script>

<style scoped></style>
