<template>
  <div
    class=""
    id=""
  >
    <top-navbar />
    <b-container>
      <b-row align-v="center">
        <b-card
          title="发布房源信息"
          class="text-center m-2"
        >
          <div class="mt-2">&nbsp;</div>
          请填写房屋相关信息
          <b-row
            v-for="(v, k) in input_list"
            :key="k"
            class="m-2"
          >
            <b-col
              cols="2"
              class="text-left"
            >{{ k }}</b-col>
            <b-col :cols="v[2] || 10">
              <b-form-input
                :type="v[1]"
                v-model="$data.form[v[0]]"
                required
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="m-2 text-left">
            <b-col cols="2">什么时候起租</b-col>
            <b-col>
              <b-form-datepicker
                locale="zh"
                :min="new Date()"
                v-model="form.startRentedTime"
                v-bind="{labelNoDateSelected: '选择开始日期', dateDisplay}"
              ></b-form-datepicker>
            </b-col>
          </b-row>
          <b-row class="m-2 text-left">
            <b-col cols="2">房屋地址</b-col>
            <b-col cols="1">北京市</b-col>
            <b-col cols="2">
              <b-form-select
                v-model="form.houseLocArea"
                :options="areaOption"
                @change="getBCData()"
              ></b-form-select>
            </b-col>
            <b-col cols="2">
              <b-form-select
                v-model="form.houseLocBc"
                :options="BCOption"
                v-show="form.houseLocArea"
              ></b-form-select>
            </b-col>
            <b-col>
              <div style="position: relative;">
                <b-form-input
                  type="text"
                  v-model="form.houseNeighborhood"
                  v-show="form.houseLocBc"
                  placeholder="小区信息"
                  @input="searchNeighborhood()"
                  ref="input_box"
                  @blur="setNeighborhoodName()"
                ></b-form-input>
                <b-list-group
                  id="search-result"
                  v-show="form.houseNeighborhood && !selectedNeighborhood.name"
                  :style="'width:' + this.suggestionWidth + 'px'"
                >
                  <b-list-group-item
                    v-for="suggestion in suggestionList"
                    :key="suggestion.name"
                    v-html="suggestion.content"
                    style="color: grey; text-align: left;"
                    @click="() => {
                    selectedNeighborhood = suggestion
                    }"
                    href="#"
                  ></b-list-group-item>
                </b-list-group>
              </div>
            </b-col>
          </b-row>
          <b-row
            class="m-2 text-left"
            v-if="selectedNeighborhood.name"
          >
            <b-col offset="2">
              <b-form-input
                placeholder="详细信息，例如：x栋x单元x楼x号"
                v-model="form.houseDetailAddress"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="m-2 text-left">
            <b-col cols="2">房屋楼层</b-col>
            <b-col cols=2>
              <b-form-input
                placeholder="位于几楼"
                v-model="form.currentFloor"
                type="number"
              ></b-form-input>
            </b-col>
            <div>层/</div>
            <b-col cols="2">
              <b-form-input
                placeholder="总共多少楼"
                type="number"
                v-model="form.totalFloor"
              />
            </b-col>

          </b-row>
          <b-row class="m-2 text-left">
            <b-col cols="2">
              有无电梯
            </b-col>
            <b-col cols="2">
              <b-form-checkbox
                switch
                v-model="form.hasLift"
              >{{form.hasLift ?  '有电梯': '无电梯'}}</b-form-checkbox>
            </b-col>
          </b-row>
          <b-row class="m-2 text-left">
            <b-col cols="2">房屋设备</b-col>
            <b-col>
              <b-form-group v-slot="{ ariaDescribedby }">
                <b-form-checkbox
                  :aria-describedby="ariaDescribedby"
                  v-for="(value, key, index) in furnitureList"
                  :key="key"
                  button
                  button-variant="outline-primary"
                  v-model="form.furnitureSelected[index]"
                >
                  <img :src="require('@/assets/furniture/'+ value +'.png')" />
                  <div>{{key}}</div>
                </b-form-checkbox>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="m-2 text-left">
            <b-col cols=2>房屋简介</b-col>
            <b-col cols=10>
              <b-form-textarea v-model="form.houseDescription"></b-form-textarea>
            </b-col>
          </b-row>
          <b-row class="m-2 text-left">
            <b-col cols=2>房屋构造</b-col>
            <b-col cols=1>
              <b-form-input
                v-model="form.roomAmount"
                type="number"
              ></b-form-input>
            </b-col>
            室
            <b-col cols=1>
              <b-form-input
                v-model="form.hallAmount"
                type="number"
              ></b-form-input>
            </b-col>
            厅
            <b-col cols=1>
              <b-form-input
                v-model="form.toiletAmount"
                type="number"
              ></b-form-input>
            </b-col>
            卫
            <b-col cols=1>
              <b-form-input
                v-model="form.houseSize"
                type="number"
              ></b-form-input>
            </b-col>
            m²
            <b-col
              cols=2
              offset="1"
            >
              <b-form-select
                v-model="form.houseDirection"
                :options="directionOption"
              ></b-form-select>
            </b-col>

          </b-row>
          <b-row class="m-2 text-left">
            <b-col cols="2">能否短租</b-col>
            <b-col cols="2">
              <b-form-checkbox
                v-model="form.supportShortTermRent"
                name="supportShortTermRent"
                switch
              > {{ form.supportShortTermRent ?  "支持短租": "不可短租"}}</b-form-checkbox>
            </b-col>
          </b-row>
          <b-row class="m-2 text-left">
            <b-col cols="2">是否是整租房</b-col>
            <b-col cols="2">
              <b-form-checkbox
                v-model="form.isFullRent"
                name="isFullRent"
                switch
              > {{ form.isFullRent ?  "整租房": "合租房"}}</b-form-checkbox>
            </b-col>
          </b-row>
          <b-row class="m-2 text-left">
            <b-col cols="2">
              房屋图片
            </b-col>
            <b-col cols="10">
              <b-button
                v-for="(img, index) in form.imageList"
                :key="img.url"
                variant="link"
                class=" border-0 image-button"
                @click="() => {
                  form.imageList.splice(index, 1)
                  }"
              >

                <img
                  :src="img.url"
                  style="width: 150px;height:150px;"
                >
                <div style="position: absolute">
                  <div class="show-close ">
                    <b-row
                      align-v="center"
                      align-h="center"
                      class="h-100"
                    >
                      删除图片
                    </b-row>
                  </div>

                </div>
              </b-button>
              <b-button
                style="width: 150px; height: 150px"
                variant="outline-primary"
                @click="()=>{
                  this.$refs['imageCropper'].$children[0].show()              
                }"
              >
                <b-icon
                  icon="plus"
                  font-scale="4"
                ></b-icon>
                <div>添加图片</div>
                <b-form-file
                  v-model="tempUpdateImage"
                  accept="image/*"
                  ref="file-input"
                  class="mb-2"
                  plain
                  style="display:none"
                ></b-form-file>
              </b-button>
            </b-col>
          </b-row>
          <b-button
            variant="outline-primary"
            @click="postHouse()"
          >发布</b-button>
        </b-card>
      </b-row>

      <image-cropper
        ref="imageCropper"
        @ok="getResultImage"
      />

    </b-container>
  </div>
</template>
<script>
import TopNavbar from '../../components/TopNavbar.vue'
import { VueCropper } from 'vue-cropper'
import ImageCropper from '../../components/ImageCropper.vue'
import request from '@/request/request.js'

export default {
  components: { TopNavbar, VueCropper, ImageCropper },
  data () {
    return {
      form: {
        houseName: null,
        houseLocArea: null,
        houseLocBc: null,
        houseDetailAddress: null,
        furnitureSelected: [false, false, false, false, false, false, false, false, false, false],
        housePrice: null,
        supportShortTermRent: false,
        startRentedTime: null,
        imageList: [],
        houseNeighborhood: null,
        isFullRent: false,
        hasLift: false,
        totalFloor: null,
        currentFloor: null,
        roomAmount: null,
        hallAmount: null,
        toiletAmount: null,
        houseSize: null,
        houseDirection: null,
        houseDescription: null,
      },
      furnitureList: { '洗衣机': "xiyiji", '独卫': "toilet", '阳台': "yangtai", 'WIFI': "wifi", '暖气': "nuanqi", '冰箱': "bingxiang", '燃气灶': "ranqizhao", '空调': "airConditioner", "热水器": "reshuiqi", "电视机": "tv" },
      input_list: {
        房屋名称: ['houseName', 'text'],
        "房屋价格（元）": ['housePrice', 'number', "3"],
      },
      suggestionList: null,
      areaOption: [{ value: null, text: "房屋所处地区", disabled: true }],
      BCOption: null,
      directionOption: [{ value: null, text: "房屋朝向", disabled: true }, { value: "南", text: "南" }, { value: "东", text: "东" }, { value: "西", text: "西" }, { value: "北", text: "北" }],
      data: require("@/assets/city_name2code.json"),
      imageHovered: [false, false, false, false, false, false],
      selectedNeighborhood: { name: "" },
      suggestionWidth: null,
      dateDisplay: {
        weekdayHeaderFormat: 'narrow',
        labelPrevDecade: '过去十年',
        labelPrevYear: '上一年',
        labelPrevMonth: '上个月',
        labelCurrentMonth: '当前月份',
        labelNextMonth: '下个月',
        labelNextYear: '明年',
        labelNextDecade: '下一个十年',
        labelToday: '今天',
        labelSelected: '选定日期',
        labelCalendar: '日历',
        labelNav: '日历导航',
        labelHelp: '使用光标键浏览日期'
      }
    }
  },
  methods: {
    floorInfo () {
      return this.form.currentFloor + "/" + this.form.totalFloor
    },
    furnitureCal () {
      return this.form.furnitureSelected.reduce((res, x) => res << 1 | x)
    },
    structureAmountCal () {
      return [this.form.roomAmount, this.form.hallAmount, this.form.toiletAmount].join(",")
    },
    initOptionData () {
      this.areaOption.push(...Object.keys(this.data).map(v => {
        return { value: v, text: v }
      }))
    },
    getBCData () {
      this.BCOption = [{ value: null, text: "房屋所处商圈", disabled: true }]
      this.BCOption.push(...this.data[this.form.houseLocArea].map(v => {
        return { value: v.name, text: v.name }
      }))
    },
    getResultImage (url, data) {
      this.form.imageList.push({ url, data })
      console.log(this.form.imageList)
    },
    searchNeighborhood () {
      this.selectedNeighborhood = { "name": "" }
      request.get("/search", {
        params: {
          "field": "neighborhood",
          "neighborhood": this.form.houseNeighborhood,
          "area": this.form.houseLocArea,
        }
      }).then((res) => {
        this.suggestionList = res.data.data.neighborhood
      }).catch(err => {
        console.log(err.response.data)
      })
    },
    setNeighborhoodName () {
      setTimeout(() => {
        this.form.houseNeighborhood = this.selectedNeighborhood.name
      }, 100)
    },
    postHouse () {
      let config = {
        header: {
          'Content-Type': 'multipart/form-data'
        }
      }
      let formData = new FormData()
      let whiteList = [
        "totalFloor", "currentFloor",
        "furnitureSelected",
        "roomAmount", "hallAmount", "toiletAmount",
        "imageList",

      ]
      let passList = [
        "starred", "appointed", "imageAmount"]
      let boolList = ["supportShortTermRent", "isFullRent", "hasLift", "hasSingleBalcony"]
      for (const k in this.form) {
        if (passList.includes(k)) {
          continue
        }
        let v = this.form[k]
        if (boolList.includes(k)) {
          formData.append(k, v)
          continue
        }
        if (!v) {
          this.toast("发布失败", "请检查输入字段" + k, "danger")
          return
        }


        if (whiteList.includes(k)) {
          continue
        }

        formData.append(k, v)
      }

      formData.append("furnitureInfo", this.furnitureCal())
      formData.append("floorInfo", this.floorInfo())
      formData.append("structureAmount", this.structureAmountCal())

      formData.append("hasSingleToilet", this.form.furnitureSelected[1])
      formData.append("hasSingleBalcony", this.form.furnitureSelected[2])
      for (let index = 0; index < this.form.imageList.length; index++) {
        const element = this.form.imageList[index];
        formData.append("imageList", element.data)
      }

      var req = null
      if (this.$route.query.reviseHouse == 1) {
        formData.append("id", this.$route.query.houseID)
        req = request.put("/house", formData, config)
      } else {
        req = request.post("/house", formData, config)
      }
      req.then(res => {
        this.toast("通知", "操作成功", "success")
        this.$router.go(-1)
      }).catch(err => {
        this.toast("通知", "操作失败: " + err.data.msg, "danger")
        console.log(err)
      })

    },
    initHouseData (houseID) {
      request.get('/house', {
        params: {
          id: houseID
        }
      }).then(res => {
        let whiteList = [
          "totalFloor", "currentFloor",
          "furnitureSelected",
          "roomAmount", "hallAmount", "toiletAmount",
          "imageList"
        ]
        console.log(res.data.data.house)
        for (const [k, v] of Object.entries(res.data.data.house)) {
          let key = this.snakeToCamel(k)
          if (whiteList.includes(key)) {
            continue
          }
          this.form[key] = v
        }

        [this.form.roomAmount, this.form.hallAmount, this.form.toiletAmount] = res.data.data.house.structure_amount.split(",");
        [this.form.currentFloor, this.form.totalFloor] = res.data.data.house.floor_info.split("/");

        for (let index = 0; index < res.data.data.house.image_amount; index++) {
          let url = `${this.backApi}/house/${houseID}/${index}.png`
          fetch(url).then(res => res.blob()).then(data => {
            this.form.imageList.push({ url, data })
          })

        }
        this.form.furnitureSelected = [...Array(10)].map((x, i) => ((res.data.data.house.furniture_info >> i) & 1) == 1)
        this.selectedNeighborhood["name"] = res.data.data.house.house_neighborhood
      }).then(() => {
        this.getBCData()
      })
    },
    snakeToCamel (str) {
      return str.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
    }
  },
  mounted () {
    if (this.$route.query.reviseHouse == 1) {
      this.initHouseData(this.$route.query.houseID)
    }
    this.initOptionData()
  }
}
</script>
<style scoped>
/deep/ .btn-group-toggle > .btn-outline-primary {
  /* border-radius: 0%; */
  border: 0;
  color: black;
}

.image-button:hover .show-close {
  visibility: visible;
  /* left: 42px; */
  color: red;
  background: white;
  height: 150px;
  top: -150px;
  display: block;
  opacity: 0.7;
}

.show-close {
  position: relative;
  /* top: -150px; */
  width: 150px;
  height: 0px;
  transition-property: height;
  -webkit-transition-property: height;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.2s;
  transition-duration: 0.2s;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
  visibility: hidden;
}

#search-result {
  background: white;
  border-radius: 0 0 10px 10px;
  position: absolute;
  z-index: 2;
  width: 100%;
  font-size: 0.8rem;
}

#search-result > .list-group-item {
  padding: 0.5rem 0.5rem;
}

/deep/ .list-group-item-action:hover,
.list-group-item-action:focus {
  color: white !important;
  background: #007bff;
}
</style>