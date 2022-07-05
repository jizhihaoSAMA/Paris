<template>
  <bm-overlay
    ref="customOverlay"
    class="common"
    pane="labelPane"
    @draw="draw"
  >
    <div @click="handleClick">
      <p
        v-text="text"
        style="margin: 0px"
      ></p>
      <p
        v-text="amount > 99 ? '99+套' : amount + '套'"
        style="margin: 0px"
      >
      </p>
    </div>

  </bm-overlay>
</template>

<script>
export default {
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
      this.$nextTick(() => {
        this.$emit("selectionChanged", { lng: this.geo.lng, lat: this.geo.lat, showNeighbor: false })
      })


    },

    draw ({ el, BMap, map }) {
      const { lng, lat } = this.geo
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))

      el.style.left = pixel.x - 47 + 'px'
      el.style.top = pixel.y - 47 + 'px'

    }
  }
}
</script>

<style scoped>
.common {
  width: 94px;
  height: 94px;
  border-radius: 100%;
  background: rgba(255, 202, 77, 0.9);
  overflow: hidden;
  box-shadow: 0 0 5px #000;
  color: #85580f;
  text-align: center;
  padding: 30px 0;
  position: absolute;
  cursor: pointer;
  font-size: 16px;
}

.common:hover {
  background: rgba(185, 67, 67, 0.75);
  color: #fff;
}
</style>