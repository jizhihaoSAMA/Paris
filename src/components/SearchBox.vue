<template>
  <div>
    <b-input-group>
      <b-form-input
        v-model="search_key_word"
        placeholder="请输入区域、商圈或者小区名开始找房"
        @focus="toggle_suggestion(true)"
        @blur="toggle_suggestion(false)"
        @input="get_suggestion_list()"
        ref="input_box"
      ></b-form-input>
      <b-input-group-append>
        <b-button variant="primary">搜索房源</b-button>
        <b-button variant="info"
          ><b-icon icon="map"></b-icon> 地图找房</b-button
        >
      </b-input-group-append>
    </b-input-group>
    <b-list-group
      id="search-result"
      v-show="this.show_suggestion"
      :style="'width:' + this.width + 'px'"
    >
      <b-list-group-item
        v-for="suggestion in suggestion_list"
        :key="suggestion"
        v-text="suggestion"
        style="color: grey; text-align: left"
      ></b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show_suggestion: false,
      search_key_word: '',
      suggestion_list: ['未查询到相关内容'],
      width: null,
    }
  },
  methods: {
    request_key_word() {
      if (this.search_key_word == '') {
        return ['未查询到相关内容']
      }
      return [
        this.search_key_word + '的结果1',
        this.search_key_word + '的结果2',
        this.search_key_word + '的结果2',
        this.search_key_word + '的结果2',
        this.search_key_word + '的结果2',
      ]
    },
    get_suggestion_list() {
      this.suggestion_list = this.request_key_word()
    },
    toggle_suggestion(val) {
      this.show_suggestion = val
    },
  },
  mounted() {
    this.width = this.$refs.input_box.$el.offsetWidth
  },
}
</script>

<style scope>
#search-result {
  background: white;
  border-radius: 0 0 10px 10px;
  position: absolute;
  z-index: 2;
  font-size: 0.8rem;
}

#search-result > .list-group-item {
  padding: 0.5rem 0.5rem;
}
</style>
