<template>
  <div>
    <top-navbar />
    <b-container>
      您好， 亲爱的{{ $store.state.userModule.userInfo.username}}
      <b-tabs style="min-height: 100vh;">
        <b-tab
          v-for="(v, k) in tabList"
          :key="k"
          @click="() => {
            $router.replace({ query: { field: k } })
            getProfile(k)
            }"
          :title="v.tabName"
          :active="$route.query.field == k"
        >
          <div v-if="tabList[k].list.length == 0">
            {{v.tabName}}为空噢
          </div>
          <div v-if="!$route.query.field || $route.query.field == 'notice'">
            <b-list-group-item
              v-for="item, index in tabList[k].list"
              :key="item.id"
            >

              <span v-if="index < unreadAmount">[未读] </span>
              <div style="position: relative; display:inline-block">
                <span v-html="item.content"></span>
                <div
                  style="position: absolute; top: 2px; right: 0px;width: 7px; height: 7px; background-color: #dc3545; border-radius: 100%;"
                  v-if="index < unreadAmount"
                > </div>
              </div>
              <div class="text-muted">{{ new Date(item.created_time).toLocaleString() }}</div>
            </b-list-group-item>
          </div>
          <div v-else-if="$route.query.field == 'house'">
            <b-list-group-item
              v-for="item in tabList[k].list"
              :key="item.id"
              class="list-item"
            >
              <div class="d-flex w-100 justify-content-between">
                <a
                  class="mb-1 h5 text-decoration-none "
                  :href="'index/house/detail/' + item.id"
                >{{item.house_name}} </a>
                <small class="text-muted">
                  发布于 {{ convertDate(item.created_time) }}
                </small>
              </div>
              <div><small>{{ item.house_loc_area }} / {{ item.house_loc_bc }} / {{ item.house_neighborhood}} </small></div>
              <div class="d-flex w-100 justify-content-between">
                <div>
                  <small>
                    <br>
                    当前状态: {{ convertReviewStatus(item.status) }}
                  </small>
                </div>
                <b-row style="white-space: nowrap;">
                  <b-button
                    variant="outline-primary"
                    @click="reviseRequest(item.id)"
                  >修改房屋信息<br /><b style="font-size:5px;">*修改房屋信息后需要重新审核</b></b-button>
                  <b-button
                    variant="info"
                    @click="showReviewHistories(item.id)"
                    style="margin:0 5px;"
                  >审核历史</b-button>
                  <div class="cancel">
                    <b-button
                      variant="danger"
                      @click="deleteRequest(k, item.id, index)"
                      class="w-100 h-100"
                    > 删除房屋 </b-button>
                  </div>

                </b-row>
              </div>
            </b-list-group-item>
            <b-pagination-nav
              :link-gen="linkGen"
              :number-of-pages="totalPage"
              use-router
              pills
              v-model="currentPage"
              align="center"
              @change="(page) => getProfile('house', page)"
            ></b-pagination-nav>
            <p></p>
          </div>

          <div v-else-if="$route.query.field == 'star'">
            <b-list-group-item
              v-for="item in tabList[k].list"
              :key="item.house_id"
              class="list-item"
            >
              <div class="d-flex w-100 justify-content-between">
                <a
                  class="mb-1 h5 text-decoration-none "
                  :href="'index/house/detail/' + item.house_id"
                >{{item.house_name}} </a>
                <small class="text-muted">
                  收藏于 {{ convertDate(item.created_time) }}
                </small>
              </div>
              <div class="d-flex w-100 justify-content-between">
                <small>{{ item.house_loc_area }} / {{ item.house_loc_bc }} / {{ item.house_neighborhood}}</small>
                <div class="cancel">
                  <b-button
                    variant="danger"
                    @click="deleteRequest(k, item.house_id, index)"
                  > 取消收藏 </b-button>
                </div>
              </div>
            </b-list-group-item>
          </div>

          <div v-else-if="$route.query.field == 'appointment'">
            <b-list-group-item
              v-for="(item, index) in tabList[k].list"
              :key="item.house_id"
              class="list-item"
            >
              <div class="d-flex w-100 justify-content-between ">
                <a
                  class="mb-1 h5 text-decoration-none "
                  :href="'index/house/detail/' + item.house_id"
                >{{item.house_name}} </a>
                <small class="text-muted">
                  预约于 {{ convertDate(item.created_time) }}
                </small>
              </div>
              <div class="d-flex w-100 justify-content-between">
                <small>预约时间为{{ convertDate(item.appointed_time) }} <br>
                  {{ item.house_loc_area }} / {{ item.house_loc_bc }} / {{ item.house_neighborhood}}</small>
                <div class=" cancel">
                  <b-button
                    variant="danger"
                    @click="deleteRequest(k, item.house_id, index)"
                  > 取消预约 </b-button>
                </div>
              </div>
            </b-list-group-item>
          </div>
        </b-tab>
      </b-tabs>
      <b-modal
        ref="reviewsHistoryModal"
        size="xl"
        ok-only
      >
        <b-table
          :items="reviewHistories"
          striped
        ></b-table>
      </b-modal>
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
      totalPage: 0,
      currentPage: this.$route.query.page || 1,
      unreadAmount: 0,
      tabList: {
        "notice": { list: [], tabName: "我的通知" },
        "house": { list: [], tabName: "我的发布" },
        "star": { list: [], tabName: "我的收藏" },
        "appointment": { list: [], tabName: "我的预约" },
      },
      reviewHistories: [],
      translate: {
        id: '审核ID',
        is_approved: '是否通过',
        review_time: '审核时间',
        review_msg: '审核信息',
      }
    }
  },
  methods: {
    linkGen (pageNum) {
      return {
        query: {
          ...this.$route.query,
          page: pageNum,
        }
      }
    },
    getProfile (field, page = 1) {
      if (field == 'notice') {
        request.put("/noticeAllRead").then(res => {
          console.log(res)
        })
      }
      request.get("/profile", {
        params: {
          field: field,
          page: this.$route.query.page || page,
        }
      }).then(res => {
        if (res.data.data[field + 's'].length == 0 || res.data.data[field + 's'][0] == null) {
          return
        }
        this.tabList[field].list = res.data.data[field + 's']
        if (field == 'house') {
          this.totalPage = res.data.data.total_page
        }
      }).catch(err => {
        console.log(err)
        this.toast("获取信息错误", err.data, "danger")
      })
    },
    reviseRequest (id) {
      this.$router.push({
        path: "/postHouse", query: {
          reviseHouse: 1,
          houseID: id,
        }
      })

    },
    deleteRequest (field, id, index) {
      request.delete("/" + field, {
        data: {
          houseID: id,
        }
      }).then(res => {
        this.tabList[field].list.splice(index, 1)
        this.toast("通知", "操作成功", "success")
      }).catch(err => {
        this.toast("通知", "操作失败", "danger")
      })
    },
    convertDate (s) {
      return new Date(s).toLocaleString()
    },
    convertReviewStatus (s) {
      return ["", "在线", "已下架", "等待审核", "审核未通过"][s]
    },
    showReviewHistories (id) {
      request.get("/reviewHistories", {
        params: {
          houseID: id,
        }
      }).then(res => {
        this.reviewHistories = []
        for (const i in res.data.data.review_histories) {
          const ele = res.data.data.review_histories[i]
          var obj = {}
          for (const [key, value] of Object.entries(ele)) {
            var k = this.translate[key]
            if (typeof (value) == 'boolean') {
              obj[k] = value ? '是' : '否'
            } else if (key == "review_time") {
              obj[k] = new Date(value).toLocaleString()
            } else {
              obj[k] = value
            }
          }
          this.reviewHistories.push(obj)
        }
        this.$refs["reviewsHistoryModal"].show()
        console.log(res)
      }).catch(err => {
        console.log(err)
        this.toast("通知", "获取审核历史失败：" + err.msg, "danger")
      })
    }
  },
  mounted () {
    this.getProfile(this.$route.query.field || "notice")
  },
  created () {
    this.unreadAmount = this.$store.state.userModule.unreadAmount
  }
}
</script>

<style scoped>
.cancel {
  z-index: 99;
  visibility: hidden;
}
.list-item:hover .cancel {
  visibility: visible !important;
}
</style>
