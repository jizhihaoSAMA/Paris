<template>
  <div v-if="!$route.meta.admin">
    <right-navbar />
    <router-view />
    <page-footer />
  </div>
  <div v-else>

    <router-view />
  </div>
</template>

<script>
import RightNavbar from '@/components/RightNavbar'
import PageFooter from '@/components/PageFooter.vue'

export default {
  components: {
    RightNavbar,
    PageFooter,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
