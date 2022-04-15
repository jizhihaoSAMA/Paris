<template>
  <div
    class=""
    id=""
  >
    <top-navbar />
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
              v-model="$data[v[0]]"
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

export default {
  data () {
    return {
      input_list: {
        用户名: ['username', 'text'],
        密码: ['password', 'password']
      },
      username: "",
      password: "",
    }
  },
  components: { TopNavbar },
  methods: {
    login () {
      console.log(this.$store)
      request.post('/login', {
        username: this.username,
        password: this.password,
      }).then((res) => {

      })
    }
  }

}
</script>
