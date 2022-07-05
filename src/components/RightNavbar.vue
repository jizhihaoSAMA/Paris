<template>
  <div>
    <Transition>
      <div
        id="right-navbar"
        v-show="this.$store.state.showRightNavbar == 'true'"
      >
        <div id="right-navbar-items">
          <b-button-group vertical>
            <b-button
              v-for="{ icons, text, href, is_split } in button_infos"
              @click="$router.push({path: href})"
              :key="text"
              variant="link"
              :style="
            (is_split ? 'margin: -0.5rem 0' : 'margin: 1rem 0') + ';padding:0;'
          "
              class="text-decoration-none"
              :disabled="is_split"
              v-b-popover.hover.left="text"
            >
              <hr
                v-if="is_split"
                style="border: 1px dotted #999 !important"
              />
              <div v-else-if="icons.length == 1">

                <b-icon
                  stacked
                  font-scale="2.5"
                  :icon="icons[0]"
                ></b-icon>
                <b-badge
                  v-if="text=='我的信息' && $store.state.userModule.unreadAmount != 0"
                  variant="primary"
                >{{$store.state.userModule.unreadAmount}}</b-badge>
              </div>

              <b-iconstack
                font-scale="1"
                v-else-if="icons.length == 2"
              >
                <b-icon
                  stacked
                  :icon="icons[0]"
                  shift-v="2"
                  shift-h="-2"
                ></b-icon>
                <b-icon
                  stacked
                  :icon="icons[1]"
                  shift-v="-2"
                  shift-h="2"
                ></b-icon>
              </b-iconstack>
            </b-button>
            <b-button
              variant="link"
              style="padding: 0;margin: 1rem 0;"
              v-b-popover.hover.left="'回到顶部'"
              @click="scrollTop"
            >
              <b-icon
                icon='arrow-up'
                font-scale="2"
              ></b-icon>
            </b-button>
            <b-button
              variant="link"
              style="padding: 0;"
              v-b-popover.hover.left="'隐藏侧边栏'"
              @click="() => {
                $store.commit('setRightNavbar', false)
                $forceUpdate()
                }"
            >
              <b-icon
                icon="dash"
                font-scale="2"
              ></b-icon>
            </b-button>

          </b-button-group>
        </div>
      </div>
    </Transition>
    <Transition>
      <div
        id="show-right-navbar"
        v-show="$store.state.showRightNavbar == 'false'"
      >
        <b-button
          variant="primary"
          style="padding: 0; border-radius: 100%"
          v-b-popover.hover.left="'显示侧边栏'"
          @click="() => {
            $store.commit('setRightNavbar', true)
            $forceUpdate()
          }"
        >
          <b-icon
            icon="plus"
            font-scale="2.5"
          ></b-icon>
        </b-button>
      </div>
    </Transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      timer: null,
      button_infos: [
        {
          icons: ['person'],
          text: '我的信息',
          href: '/profile',
        },
        {
          icons: ['bookmark-heart'],
          text: '我喜爱的房源',
          href: '/profile?field=star',
        },
        {
          icons: ['clock-history'],
          text: '预约历史',
          href: '/profile?field=appointment'
        },
        {
          is_split: true,
        },
        {
          icons: ['list-stars'],
          text: '房屋趋势',
          href: '/index/hot',
        },
        {
          icons: ['map'],
          text: '地图找房',
          href: '/index/map',
        },
        {
          icons: ['headphones'],
          text: '联系客服',
          href: '/index/contact',
        },
        {
          is_split: true,
        }
      ],
    }
  },
  methods: {
    ...mapActions('userModule', ["getUnreadAmount"]),
    // ...mapActions('userModule', { userLogin: 'login' }),

    scrollTop () {
      window.scrollTo(0, 0)
    }
  },
  mounted () {
    if (this.$store.state.userModule.userInfo) {
      this.getUnreadAmount().then(res => {
        this.timer = setInterval(() => {
          this.getUnreadAmount()
        }, 12000)
      })
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
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

.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

#right-navbar-items {
  margin: 0 auto;
}

#close-right-navbar-item {
  position: absolute;
  right: 0%;
  bottom: -15vh;
  margin: auto;
}

#show-right-navbar {
  position: fixed;
  right: 0%;
  bottom: 3%;
  z-index: 98;
}
</style>
