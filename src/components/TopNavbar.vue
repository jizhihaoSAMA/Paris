<template>
  <div id="top-header">
    <b-container>
      <b-row>
        <b-col cols="2">
          <h3>如家</h3>
        </b-col>
        <b-col cols="10">
          <b-tabs align="right" pills lin>
            <b-tab
              v-for="{ title, href } in tabs"
              :key="title"
              :title="title"
              no-body
              :active="$route.path == href"
              @click="$router.push((path = href))"
              style="font-size: 0.25rem"
            ></b-tab>
          </b-tabs>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: this.$store.state.tabs,
    }
  },
}
</script>

<style scoped>
#top-header {
  background: #222;
  color: white;
}
</style>
