<template>
  <div id="right-navbar">
    <div id="right-navbar-items">
      <b-button-group vertical>
        <b-button
          v-for="{ icons, text, href, is_split } in button_infos"
          @click="$router.push((path = href))"
          :key="text"
          variant="link"
          :style="
            (is_split ? 'margin: -0.5rem 0' : 'margin: 1rem 0') + ';padding:0;'
          "
          class="text-decoration-none"
          :disabled="is_split"
          v-b-popover.hover.left="text"
        >
          <hr v-if="is_split" style="border: 1px dotted #999 !important" />
          <b-iconstack font-scale="1.8" v-else-if="icons.length == 1">
            <b-icon stacked :icon="icons[0]"></b-icon>
          </b-iconstack>
          <b-iconstack font-scale="1" v-else-if="icons.length == 2">
            <b-icon stacked :icon="icons[0]" shift-v="2" shift-h="-2"></b-icon>
            <b-icon stacked :icon="icons[1]" shift-v="-2" shift-h="2"></b-icon>
          </b-iconstack>
        </b-button>
      </b-button-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      button_infos: [
        {
          icons: ["person"],
          text: "我的信息",
          href: "profile",
        },
        {
          icons: ["bookmark-heart"],
          text: "我喜爱的房源",
          href: "love",
        },
        {
          is_split: true,
        },
        {
          icons: ["house-door", "house-door-fill"],
          text: "房屋对比",
          href: "compare",
        },
        {
          icons: ["headphones"],
          text: "联系客服",
          href: "Contact",
        },
        {
          is_split: true,
        },
        {
          icons: ["arrow-up"],
          text: "回到顶部",
        },
      ],
    };
  },
  mounted() {},
};
</script>

<style>
#right-navbar {
  position: fixed;
  right: 0%;
  width: 3%;
  height: 100%;
  box-shadow: gray 10px 10px 10px 10px;
  text-align: center;
  display: flex;
  align-items: center;
  background: white;
  z-index: 99;
}

#right-navbar-items {
  margin: 0 auto;
}
</style>