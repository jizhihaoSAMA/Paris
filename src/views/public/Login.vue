<template>
  <div
    class=""
    id=""
  >
    <top-navbar v-if="!this.$route.meta.admin" />
    <b-container class="w-50 p-3">
      <b-card
        title="登录"
        class="text-center"
      >
        <div class="mt-2">&nbsp;</div>
        <b-row
          v-for="(v, k) in input_list"
          :key="k"
          class="m-2"
        >
          <b-col
            cols="2"
            class="text-left"
          >{{ k }}</b-col>
          <b-col cols="10">
            <b-form-input
              :type="v[1]"
              v-model="$data['user'][v[0]]"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            cols="12"
            class="pl-3 pr-3"
          >
            <b-button
              variant="outline-primary"
              class="w-100"
              @click="login"
            >登录</b-button>
          </b-col>
        </b-row>
        <div>
          <b-button
            variant="link"
            style="float:right;"
          >忘记密码？</b-button>
        </div>
      </b-card>
    </b-container>
  </div>
</template>
<script>
import TopNavbar from "../../components/TopNavbar.vue"
import request from "@/request/request.js"
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      input_list: {
        用户名: ['username', 'text'],
        密码: ['password', 'password']
      },
      user: {
        username: "",
        password: ""
      },
    }
  },
  components: { TopNavbar },
  methods: {
    ...mapActions('userModule', { userLogin: 'login' }),
    ...mapActions('adminModule', { adminLogin: 'login' }),

    login () {
      if (this.$route.meta.admin) {
        this.adminLogin(this.user).then(res => {
          this.toast("通知", "登录成功")
          setTimeout(() => {
            this.$router.push({ path: "/admin" })
          }, 1000)
        }).catch(err => {
          this.toast("登录失败", err.data.msg, 'danger')
        })
        return
      }
      this.userLogin(this.user).then(res => {
        this.toast("通知", "登录成功")
        setTimeout(() => {
          this.$router.push({ name: "profile" })
        }, 1000)
      }).catch(err => {
        this.toast("登录失败", err.data.msg, 'danger')
      })
    }
  }

}
</script>
