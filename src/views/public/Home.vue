<template>
  <div>
    <div
      id="home-background-image"
      :style="'height:' + this.height + 'px'"
    ></div>
    <b-container id="home-nav" :style="'height:' + this.height + 'px'">
      <b-row style="padding: 40px 0" align-v="center">
        <b-col cols="2">
          <b-img
            :src="require('../../assets/logo_white.png')"
            fluid-grow
            @click="$router.replace({ name: 'home' }).catch((err) => {})"
          />
        </b-col>
        <b-col cols="10">
          <b-tabs align="right" pills>
            <b-tab
              v-for="{ title } in tabs"
              :key="title"
              :title="title"
              no-body
              aria-selected="false"
            ></b-tab>
          </b-tabs>
        </b-col>
      </b-row>
      <b-row
        style="height: 350px"
        align-v="center"
        align-h="center"
        class="text-center"
      >
        <b-col cols="12">
          <h1 style="font-weight: 1000; font-size: 3.5rem">给予如家一般温暖</h1>
          <p>
            目前在租房屋共计
            <span v-text="house_count">{{ house_count }}</span> 个
          </p>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col cols="8" class="text-center">
          <b-input-group>
            <b-form-input
              placeholder="请输入区域、商圈或者小区名开始找房"
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="primary">搜索房源</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
    </b-container>
    <b-container id="home-intro" fluid class="pt-5 text-center fade-in-anime">
      <div
        class="m-5"
        style="height: 150px"
        :class="show_title ? 'fade-in-anime downward-anime' : ''"
      >
        <span
          class="custom-header"
          v-b-visible.1000.once="
            (v) => {
              fade_in(v, 'show_title');
            }
          "
          >为什么选择我们?
        </span>
      </div>
      <div :class="show_intro ? 'fade-in-anime downward-anime' : ''">
        <b-container fluid>
          <b-row align-h="center">
            <b-col
              cols="3"
              v-for="{ icon, description } in descriptions"
              :key="description"
              v-b-visible.1000.once="
                (v) => {
                  fade_in(v, 'show_intro');
                }
              "
            >
              <b-row align-h="center">
                <b-col cols="4">
                  <b-icon :icon="icon" font-scale="4"></b-icon>
                </b-col>
              </b-row>
              <b-row class="mt-5">
                <b-col cols="12" v-html="description"></b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </b-container>
    <!-- <img alt="Vue logo" src="@/assets/background.jpeg"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  data() {
    return {
      house_count: 20100,
      show_title: false,
      show_intro: false,
      height: null,
      tabs: [
        {
          title: "首页",
        },
        {
          title: "我要租房",
        },
        {
          title: "发布房源",
        },
        {
          title: "工具",
        },
      ],
      descriptions: [
        {
          icon: "shield-check",
          description:
            "房东需经过 <b>身份认证</b>，房屋经过实体考量，房源绝对真实。如家真实房源，假一罚十",
        },
        {
          icon: "trophy",
          description:
            "连续5年获得 <b>全国房屋租赁冠军</b> 租赁交易成交数一直稳居于全国第一。",
        },
        {
          icon: "heart",
          description:
            "客服 <b>24小时</b> 在线，您可随时提出您的疑问，我们将为您提供贴心的服务",
        },
      ],
    };
  },
  name: "Home",
  methods: {
    fade_in(v, variable) {
      eval("this." + variable + " = " + v);
    },
  },
  components: {
    HelloWorld,
  },
  mounted() {
    this.height = document.documentElement.clientHeight;
    console.log(this.height);
  },
};
</script>

<style scope>
#home-intro {
  height: 2000px;
  background: white;
  text-align: center;
}
#home-nav {
  color: white;
  height: 100%;
}

#home-background-image {
  background: url("../../assets/background.jpeg") no-repeat;
  background-position: 55% 50%;
  /* background-size: 100% 100%; */
  width: 100%;
  position: fixed;
  z-index: -999;
  opacity: 0.9;
  filter: contrast(80%);
  max-height: 755px;
}

#home-nav a.nav-link {
  color: white;
}

.custom-header {
  border-top: 3px solid;
  padding: 15px 0;
  border-bottom: 3px solid;
  border-radius: 4px;
}

.fade-in-anime {
  animation: fade-in 2s 1;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.downward-anime {
  animation: downward 2s 1;
}

@keyframes downward {
  from {
    top: -5%;
    position: relative;
  }
  to {
    top: 0;
    position: relative;
  }
}
</style>