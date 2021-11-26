<template>
  <div>
    <div id="home-background-image">
    </div>
    <b-container>
      <b-row>
        123
      </b-row>
    </b-container>
    <!-- <img alt="Vue logo" src="@/assets/background.jpeg"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>

<style scoped>
#home-background-image {
  background: url("../../assets/background.jpeg") no-repeat;
  background-position: 55% 50%;
  filter: alpha(opacity=60);
  width: 100%;
  height: 610px; 
  position:fixed;
  z-index:-999;
  opacity: 0.5;
}
</style>