<template>
  <div
    class=""
    id=""
  >
    <top-navbar />
    <b-container class="w-50 p-3">
      <b-card
        title="注册"
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
            <div v-if="k == '电话'">
              <b-input-group>
                <b-form-input
                  v-model="$data[v[0]]"
                  :type="v[1]"
                ></b-form-input>
                <b-input-group-append>
                  <b-button
                    variant="outline-primary"
                    @click="getCaptcha()"
                  >获取验证码</b-button>
                </b-input-group-append>
              </b-input-group>
            </div>
            <div v-else>
              <b-form-input
                :type="v[1]"
                v-model="$data[v[0]]"
              ></b-form-input>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            cols="12"
            class="p-4"
          >
            <b-button
              variant="outline-primary"
              class="w-100"
              @click="register"
            >注册</b-button>
          </b-col>
        </b-row>
      </b-card>
    </b-container>
  </div>
</template>
<script>
import TopNavbar from '../../components/TopNavbar.vue'
import request from '@/request/request.js'

export default {
  components: { TopNavbar },
  data () {
    return {
      input_list: {
        用户名: ['username', 'text'],
        电话: ['telephone', 'number'],
        验证码: ['captcha', 'number'],
        密码: ['password', 'password'],
        重复密码: ['repeat_password', 'password'],
      },
      username: "",
      telephone: "",
      password: "",
      repeat_password: "",
      captcha: ""
    }
  },
  methods: {
    register () {
      request.post('/register', {
        telephone: this.telephone,
        username: this.username,
        repeat_password: this.repeat_password,
        captcha: this.captcha,
        password: this.password,
      }).then((res) => {
        this.toast(`注册成功`, "恭喜，注册成功", 'success')
        console.log(res)
        setTimeout(() => {
          this.$router.push({ name: "login" })
        }, 1000)
      }).catch((err) => {
        this.toast('注册失败', err.data.msg, 'danger')
      })

    },
    getCaptcha () {
      if (this.telephone == "") {
        this.toast(`注册失败`, "电话号码不能为空，请检查输入信息", 'danger')
        return
      }

      request.post('/registerCaptcha', {
        telephone: this.telephone
      }).then((res) => {
        this.toast("通知", "消息发送成功", 'success')
      }).catch((err) => {
        this.toast("通知", err.data.msg, 'danger')
      })
    }
  }
}
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>