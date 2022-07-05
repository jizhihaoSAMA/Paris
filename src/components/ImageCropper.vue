<template>
  <b-modal
    title="上传图片"
    ok-title="确定"
    cancel-title="取消上传"
    modal-class="upload-modal"
    @ok="getResultImage"
  >
    <b-row>
      <b-col>
        <div class="cut">
          裁剪图片
          <VueCropper
            ref="cropper"
            :img="option.img"
            :output-size="option.size"
            :output-type="option.outputType"
            :info="true"
            :full="option.full"
            :fixed="fixed"
            :fixed-number="fixedNumber"
            :can-move="option.canMove"
            :can-move-box="option.canMoveBox"
            :fixed-box="option.fixedBox"
            :original="option.original"
            :auto-crop="option.autoCrop"
            :auto-crop-width="option.autoCropWidth"
            :auto-crop-height="option.autoCropHeight"
            :center-box="option.centerBox"
            :high="option.high"
            mode="cover"
            :max-img-size="option.max"
            @crop-moving="cropMoving"
            @img-load="imgLoad"
            @real-time="realTime"
          />
        </div>
      </b-col>
      <b-col>
        <div><em>*注意：图片类型必须是.gif,jpeg,jpg,png,bmp中的一种，且上传比例为1:1，最大为600 x 600</em></div>
        <label
          class="btn"
          for="uploads"
        >上传图片</label>
        <input
          type="file"
          id="uploads"
          style="position:absolute; clip:rect(0 0 0 0);"
          accept="image/png, image/jpeg, image/gif, image/jpg"
          @change="uploadImg($event, 1)"
        >

        <div
          class="show-preview"
          :style="previewStyle"
        >
          <p>图片结果预览</p>
          <div :style="previews.div">
            <img
              :src="previews.url"
              :style="previews.img"
            >
          </div>
        </div>

      </b-col>
    </b-row>
  </b-modal>
</template>
<script>
import { VueCropper } from 'vue-cropper'

export default {
  components: { VueCropper },
  data () {
    return {
      previews: {},
      option: {
        img: null,
        size: 1,
        full: true,
        outputType: 'png',
        canMove: true,
        fixedBox: false,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        centerBox: true,
        high: true,
        max: 99999
      },
      fixed: true,
      fixedNumber: [1, 1]
    }
  },
  methods: {
    getResultImage () {
      this.$refs.cropper.getCropBlob((data) => {
        this.$emit("ok", window.URL.createObjectURL(data), data)
        this.option.img = null
      })
    },
    imgLoad (msg) {
      // console.log(msg)
    },
    cropMoving (data) {
      // console.log(data, '截图框当前坐标')
    },
    realTime (data) {
      this.previews = data
    },
    uploadImg (e, num) {
      //上传图片
      // this.option.img
      var file = e.target.files[0]
      if (!/\.(jpg|jpeg|png|bmp|JPG|PNG)$/.test(e.target.value)) {
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false
      }
      var reader = new FileReader()
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        if (num === 1) {
          this.option.img = data
        } else if (num === 2) {
          this.example2.img = data
        }
      }
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file)
    },
  },
  computed: {
    previewStyle () {
      var previews = this.previews
      var cropperHeight = this.cropperHeight
      return {
        width: previews.w + 'px', height: previews.h + 'px', overflow: 'hidden', margin: 'auto', zoom: this.isLandscape ? this.previewWidth / previews.w : cropperHeight / previews.h
      }
    }
  }
}
</script>

<style scoped>
.cut {
  width: 100%;
  height: 600px;
}
.btn {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #c0ccda;
  color: #1f2d3d;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 20px 10px 0px 0px;
  padding: 9px 15px;
  font-size: 14px;
  border-radius: 4px;
  color: #fff;
  background-color: #50bfff;
  border-color: #50bfff;
  transition: all 0.2s ease;
  text-decoration: none;
  user-select: none;
}

/deep/ .upload-modal .modal-dialog {
  max-width: 100%;
  margin: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  display: flex;
  position: fixed;
  z-index: 100000;
}
</style>