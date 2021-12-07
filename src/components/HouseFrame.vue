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

    <b-tabs>
      <b-tab v-for="{ area } in location" v-text="area" :key="area"></b-tab>
    </b-tabs>
  </div>
</template>

<script>
import searchBox from '@/components/SearchBox'

export default {
  data() {
    return {
      location: require('@/assets/city_name2code.json'),
    }
  },
  components: {
    searchBox,
  },
}
</script>

<style></style>
