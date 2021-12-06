<template>
  <div id="page-footer" class="pt-5 pb-5">
    <b-container>
      <b-row>
        <b-button
          v-for="{ title, href } in links"
          :key="title"
          v-text="title"
          :href="href"
          class="m-2 text-decoration-none"
          style="color: white"
          variant="link"
        >
        </b-button>
      </b-row>
      <hr style="border-bottom: 1px solid whitesmoke" />
      <div>
        志豪科技有限公司 | 网络经营许可证 京ICP备23333333号 | ©
        Copyright©2021-2022 如家版权所有 | 营业执照
      </div>
      <div>
        违法和不良信息举报电话：010-86440676
        违法和不良信息举报邮箱：jubaoyouxiang@xx.com
      </div>
      <div>
        涉未成年人举报电话：010-86440676
        涉未成年人举报邮箱：jubaoyouxiang@xx.com
      </div>
      <div>
        <img src="@/assets/beian.png" alt="" />
        京公网安备 2333333333333 号
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          title: '关于如家',
          href: '/about',
        },
        {
          title: '联系我们',
          href: '',
        },
        {
          title: '加入我们',
          href: '/join',
        },
        {
          title: '隐私声明',
          href: '',
        },
        {
          title: '网站地图',
          href: '',
        },
        {
          title: '友情链接',
          href: '',
        },
      ],
    }
  },
}
</script>

<style scoped>
#page-footer {
  font-size: 12px;
  color: #888c8e;
  background: #222;
  z-index: 1;
}
</style>
