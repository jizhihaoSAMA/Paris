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
              v-for="{ title, href } in tabs"
              :key="title"
              :title="title"
              no-body
              @click="$router.push((path = href))"
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
            <span>{{ house_count }}</span> 个
          </p>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col cols="8" class="text-center">
          <search-box />
        </b-col>
      </b-row>
    </b-container>
    <b-container
      id="home-intro"
      fluid
      class="pt-5 pb-5 text-center"
      style="min-height: 800px; max-height: 900px"
      :style="'height:' + this.height + 'px'"
    >
      <div
        class="m-5"
        style="height: 150px"
        v-b-visible.once="
          (v) => {
            fade_in(v, 'show_title')
          }
        "
        :class="show_title ? 'fade-in-anime downward-anime' : ''"
      >
        <span class="custom-header">为什么选择我们? </span>
      </div>
      <div :class="show_intro ? 'fade-in-anime downward-anime' : ''">
        <b-container fluid>
          <b-row align-h="center" align-content="">
            <b-col
              cols="3"
              v-for="{ icon, title, description, link } in descriptions"
              :key="description"
              class="p-5 m-1"
              style="border: 1px solid; border-radius: 2%"
              v-b-visible.once="
                (v) => {
                  fade_in(v, 'show_intro')
                }
              "
            >
              <b-row align-h="center">
                <b-col cols="4">
                  <b-icon :icon="icon" font-scale="2.5"></b-icon>
                </b-col>
              </b-row>
              <h3 v-text="title" class="mt-4"></h3>
              <b-row class="mt-5">
                <b-col cols="12" v-html="description"></b-col>
              </b-row>
              <div class="mt-5">
                <b-link
                  v-text="link.title"
                  v-if="link"
                  :href="link.href"
                ></b-link>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </div>
      <b-container> </b-container>
    </b-container>
    <!-- <img alt="Vue logo" src="@/assets/background.jpeg"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import searchBox from '@/components/SearchBox'

export default {
  data() {
    return {
      house_count: '我也不知道多少',
      show_title: false,
      show_intro: false,
      height: null,
      tabs: this.$store.state.tabs,
      descriptions: [
        {
          icon: 'shield-check',
          title: '房源真实',
          description:
            '房东需经过 <b>身份认证</b>，房屋经过实体考量，房源绝对真实。如家真实房源，假一罚十',
          link: {
            href: '/feedback',
            title: '有虚假房源, 我要反馈 >>',
          },
        },
        {
          icon: 'trophy',
          title: '销量领先',
          description:
            '连续5年获得 <b>全国房屋租赁交易冠军</b> 租赁交易成交数一直稳居于全国第一',
        },
        {
          icon: 'heart',
          title: '服务贴心',
          description:
            '客服 <b>24小时</b> 在线，您可随时提出您的疑问，我们将为您提供贴心的服务',
          link: {
            href: '/contact',
            title: '联系客服 >>',
          },
        },
      ],
    }
  },
  name: 'Home',
  methods: {
    fade_in(v, variable) {
      // console.log(v, variable)
      eval('this.' + variable + ' = ' + v)
    },
  },
  components: {
    searchBox,
  },
  mounted() {
    this.height = document.documentElement.clientHeight
    // console.log(this.height)
  },
}
</script>

<style scope>
#home-intro {
  /* height: 2000px; */
  background: white;
  text-align: center;
}

#home-nav {
  color: white;
  height: 100%;
  max-height: 855px;
}

#home-background-image {
  background: url('../../assets/background.jpeg') no-repeat;
  background-position: 50% 50%;
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
  animation: fade-in 3s 1;
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
    top: -10%;
    position: relative;
  }
  to {
    top: 0;
    position: relative;
  }
}
</style>
