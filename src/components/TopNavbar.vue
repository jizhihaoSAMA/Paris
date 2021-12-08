<template>
  <div id="top-header">
    <b-container>
      <b-row align-v="center">
        <b-col cols="5">
          <h3>如家</h3>
        </b-col>
        <b-col cols="5">
          <ul style="float: right">
            <li v-for="{ title, href } in tabs" :key="title" class="header-li">
              <a
                :href="href"
                v-text="title"
                class="header-url"
                :style="$route.path == href ? 'color: white' : ''"
              ></a>
            </li>
          </ul>
        </b-col>
        <b-col cols="2">
          <ul v-if="$store.state.user_info" style="float: left">
            <li class="header-li" style="float: left">
              <a href="/profile" class="header-url">
                <b-icon icon="person" font-scale="1.5"></b-icon>关于我</a
              >
            </li>
          </ul>
          <ul v-else style="float: left">
            <li class="header-li" style="float: left">
              <a class="header-url" style="cursor: pointer">登陆</a>
            </li>
            <li class="header-li" style="float: left">
              <a class="header-url" style="cursor: pointer">注册</a>
            </li>
          </ul>
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

.header-url {
  text-decoration: none;
  color: #9399a5;
  font-size: 10px;
}

.header-li {
  margin-right: 22px;
  display: inline-block;
}
</style>

<style>
ol,
ul {
  padding-inline-start: 0px;
  list-style: none;
  margin: 0;
}
</style>
