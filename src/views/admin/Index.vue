<template>
  <b-container>
    欢迎您, {{ $store.state.adminModule.adminInfo.admin.username}}, 您是 {{ convertRole($store.state.adminModule.adminInfo.admin.role) }}
    <b-tabs>
      <b-tab
        v-for="(v, k) in controller"
        :key="v.title"
        :title="v.title"
        @click="getManageInfo(k)"
      >
        <div v-if="k == 'review'">
          <div v-if="controller[k].list.length == 0">需要审核的列表为空噢</div>
          <b-list-group-item
            v-for="item,index in controller[k].list"
            :key="item.id+'reviews'"
            href="#"
          >
            <div class="w-100 d-flex justify-content-between">
              <div>
                {{item.house_name}}<br /><small style="font-size:8px;">{{item.id}}</small>
              </div>
              <div class="operator">
                <b-button
                  variant="info"
                  @click="showPreview(item)"
                >
                  <b-icon icon="info-square"></b-icon>
                  查看详情
                </b-button>
                <b-button
                  variant="success"
                  @click="showReviewModal(item.id, true, index)"
                >
                  <b-icon icon="check-square"></b-icon>
                  通过
                </b-button>
                <b-button
                  variant="danger"
                  @click="showReviewModal(item.id, false, index)"
                >
                  <b-icon icon="x-square"></b-icon>
                  拒绝
                </b-button>
              </div>
            </div>

          </b-list-group-item>
        </div>
        <div v-else-if="k == 'appointment'">
          <b-list-group-item
            v-for="item,index in controller[k].list"
            :key="item+'user'"
          >
            <div class="w-100 d-flex justify-content-between">
              <div class="d-flex">
                <div>
                  <b-button
                    variant="link"
                    @click="() => {activeIndex[k] = (activeIndex[k] == index ? null : index)}"
                  >
                    <b-icon-chevron-down font-scale="0.8"></b-icon-chevron-down><br />
                  </b-button>
                </div>
                <div>{{item.username}} - 电话: {{ item.telephone}}<br /><small style="font-size:8px;">{{item.id}}</small></div>
              </div>
              <div class="operator">
                <b-button
                  variant="danger"
                  :disabled="$store.state.adminModule.adminInfo.role != 4"
                  @click="deleteRequest('user', 'appointment', item.id, index)"
                >
                  删除用户
                </b-button>
              </div>

            </div>
            <transition name="fade">
              <div v-show="activeIndex[k] == index">
                <b-table
                  striped
                  :items="item.appointments"
                  :fields="[{key:'house_id', label: '房屋ID'}, {key:'appointed_time', label: '预约时间', sortable: true}, {key: 'created_time', label: '发布时间', sortable: true}]"
                >
                  <template #cell(house_id)="data"><a
                      :href="'/index/house/detail/'+data.value"
                      target="_blank"
                    >{{data.value}}</a></template>
                  <template #cell(appointed_time)="data">{{new Date(data.value).toLocaleDateString()}}</template>
                  <template #cell(created_time)="data">{{new Date(data.value).toLocaleString()}}</template>

                </b-table>
              </div>
            </transition>
          </b-list-group-item>
        </div>
        <div v-else-if="k == 'house'">
          <b-table
            striped
            :items="controller[k].list"
          ></b-table>
        </div>
      </b-tab>
      <b-tab
        :disabled="$store.state.adminModule.adminInfo.role != 4"
        title="中介/管理员管理"
        @click="getManageInfo('admin')"
      >
        <div>
          <b-button
            variant="success"
            pill
            @click="() => {
              $refs['addHouseModal'].show()
              }"
          >新建管理员/中介用户</b-button>
        </div>
        <b-list-group-item
          v-for="item, index in controller.admin.list"
          :key="item.id"
        >
          <div class="w-100 d-flex justify-content-between">
            <div>
              {{ item.username}} - {{item.id}} <br> {{ convertRole(item.role)}}
            </div>
            <div>
              <b-button
                variant="danger"
                @click="deleteRequest('admin', 'admin', item.id, index)"
              >删除角色</b-button>
            </div>
          </div>
        </b-list-group-item>
      </b-tab>
    </b-tabs>
    <b-modal
      id="detail"
      ref="modal"
      ok-only
    >
      <div
        v-for="v, k in info"
        :key="k"
      >
        {{translate[k]}}: <span v-html="format(k, v)"></span>
      </div>
    </b-modal>
    <b-modal
      id="reviewMsgModal"
      ref="reviewMsgModal"
      @ok="review()"
      title="填写 通过/拒绝 的原因"
      @cancel="() => {
        reviewMsg = ''
        }"
    >
      <b-form-input
        placeholder="原因"
        v-model="reviewMsg"
      />
    </b-modal>
    <b-modal
      ref="addHouseModal"
      @ok="addAdmin()"
      @cancel="() => {this.addAdminForm = {
        role: 3,
        username: '',
        password: '',
      }}"
    >
      <b-form-input
        v-model="addAdminForm.username"
        type="text"
        placeholder="用户名"
      ></b-form-input>
      <b-form-input
        v-model="addAdminForm.password"
        type="password"
        placeholder="密码"
      > </b-form-input>
      <b-form-select
        v-model="addAdminForm.role"
        :options="[{value: 3, text: '中介'}, {value: 4, text: '超级管理员'}]"
      ></b-form-select>
    </b-modal>
  </b-container>
</template>
<script>
import request from '@/request/adminRequest.js'

export default {
  data () {
    return {
      reviewMsg: "",
      operatorIndex: null,
      operatorID: null,
      pass: null,

      addAdminForm: {
        role: 3,
        username: "",
        password: "",
      },
      activeIndex: {
        "review": null,
        "appointment": null,
        "house": null,
        "admin": null,
      },
      info: null,
      controller: {
        "review": { title: "审核管理", list: [] },
        "appointment": { title: "预约/用户 管理", list: [] },
        "house": { title: "房屋管理", list: [] },
        "admin": { list: [] },
      },
      translate: {
        "created_time": "发布时间",
        "floor_info": "楼层信息",
        "furniture_info": "家具信息",
        "has_lift": "是否有电梯",
        "has_single_balcony": "是否有独立阳台",
        "has_single_toilet": "是否有独卫",
        "house_description": "房屋描述",
        "house_detail_address": "详细地址",
        "house_direction": "朝向",
        "house_loc_area": "房屋所属地区",
        "house_loc_bc": "所属商圈",
        "house_name": "房屋名",
        "house_neighborhood": "小区",
        "house_price": "价格",
        "house_size": "大小",
        "id": "房屋ID",
        "image_amount": "图片数量",
        "owner_id": "用户ID",
        "start_rented_time": "起租时间",
        "status": "当前状态",
        "structure_amount": "结构信息",
        "support_short_term_rent": "是否支持短租",
        "is_full_rent": "是不是整租房",
      },
    }
  },
  methods: {
    addAdmin () {
      request.post('/admin', {
        ...this.addAdminForm,
      }).then(res => {
        this.toast("提示", "增加成功")
        getManageInfo('admin')
      }).catch(err => {
        this.toast("提示", "添加失败" + err.data.msg)
      })
    },
    convertRole (r) {
      return {
        3: '中介管理人员',
        4: '超级管理员',
      }[r]
    },
    getManageInfo (k, page = 1) {
      request.get('/manage', {
        params: {
          field: k,
          page: page
        }
      }).then(res => {
        this.controller[k].list = res.data.data[k + 's']
      })
    },
    showPreview (info) {
      this.info = info
      this.$refs['modal'].show()
    },
    format (k, v) {
      if (k == 'created_time') {
        return new Date(v).toLocaleString()
      }

      if (typeof (v) == 'boolean') {
        return v ? '是' : '否'
      }

      if (k == "image_amount") {
        var html = '<div class="w-100" style="display: flex;">'
        for (let index = 0; index < v; index++) {
          let src = `${this.backApi}/house/${this.info.id}/${index}.png`
          html = html + `<div style="width: 100px;height: 100px;margin:2px;"><img src="${src}" class="w-100 h-100"/></div>`
        }
        console.log(html)
        return html + "</div>"
      }

      return v
    },
    showReviewModal (id, pass, index) {
      this.operatorID = id
      this.pass = pass
      this.operatorIndex = index
      this.$refs["reviewMsgModal"].show()
    },
    review () {
      request.post('/review', {
        houseID: this.operatorID,
        msg: this.reviewMsg,
        pass: this.pass,
      }).then(res => {
        this.toast("通知", "操作成功", "success")
        this.controller.review.list.splice(this.operatorIndex, 1)
      })
    },
    deleteRequest (field, path, id, index) {
      var d = {}
      d[field + 'Id'] = id
      request.delete('/' + path, {
        data: {
          ...d,
        }
      }).then(res => {
        this.toast("通知", "删除用户成功", "success")
        this.controller[field].list.splice(index, 1)
        console.log(res)
      }).catch(err => {
        this.toast("错误", "操作失败, err: " + err, "danger")
        console.log(err)
      })
    }
  },
  mounted () {
    this.getManageInfo('review')
  }
}
</script>

<style scoped>
.operator button {
  margin: 5px;
}

.fade-enter,
.fade-leave-to {
  max-height: 0;
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
  max-height: 100%;
}
</style>
