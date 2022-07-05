<template>
  <bm-overlay
    ref="customOverlay"
    class="neighbor"
    pane="labelPane"
    @draw="draw"
  >
    <div @click="handleClick">
      <p>{{text}} {{amount > 99 ? '99+套' : amount + '套'}}</p>
    </div>

  </bm-overlay>
</template>
<script>
export default {
  data () {
    return {
      width: null,
      height: null,
    }
  },
  props: ['text', 'area', 'amount', 'geo'],
  watch: {
    geo: {
      handler () {
        this.$refs.customOverlay.reload()
      },
      deep: true
    }
  },
  methods: {
    handleClick () {
      console.log(1)
      this.$emit("selectionChanged", { lng: this.geo.lng, lat: this.geo.lat, showNeighbor: { name: this.text } })
    },

    draw ({ el, BMap, map }) {
      const { lng, lat } = this.geo
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      if (this.width == null) {
        this.width = el.offsetWidth
        this.height = el.offsetHeight
      }
      el.style.left = pixel.x - (this.width / 2) + 'px'
      el.style.top = pixel.y - 25 + 'px'
    }
  },
}
</script>

<style scoped>
.neighbor {
  min-width: 60px;
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
  position: absolute;
  cursor: pointer;
  text-align: center;
  background: rgba(252, 203, 83, 0.9);
  font-size: 12px;
  white-space: nowrap;
  color: #85580f;
}

.neighbor::before {
  content: '';
  /* border-bottom: 9px solid transparent; 方框上部分背景颜色为透明 */
  border-left: 9px solid transparent; /*方框下部分背景为透明*/
  border-right: 9px solid transparent; /*方框下部分背景为透明*/
  border-top: 9px solid rgba(252, 203, 83, 0.9); /*箭头背景颜色*/
  position: absolute; /*绝对定位1*/
  bottom: -9px; /*距离顶部位置偏移量2*/
  left: 50%; /*距离左边位置偏移量3*/ /*123都是控制显示位置的*/
}

.neighbor:hover {
  background: rgba(185, 67, 67, 0.75);
  color: #fff;
}

.neighbor:hover::before {
  border-top: 9px solid rgba(185, 67, 67, 0.75) !important; /*箭头背景颜色*/
}
</style>
