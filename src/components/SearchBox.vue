<template>
  <div style="position: relative">
    <b-row>
      <b-col
        cols="10"
        class="p-0"
      >
        <b-input-group>
          <b-form-input
            v-model="search_key_word"
            placeholder="请输入房屋名称开始找房"
            @focus="toggle_suggestion(true)"
            @blur="toggle_suggestion(false)"
            @input="get_suggestion_list()"
            ref="input_box"
          ></b-form-input>
        </b-input-group>
        <b-list-group
          id="search-result"
          :style="'width:' + this.width + 'px'"
        >
          <div v-if="suggestion_list">
            <b-list-group-item
              v-for="suggestion in suggestion_list"
              :key="suggestion.name"
              style="color: grey; text-align: left"
              href="#"
              @click="$router.push({path: '/index/house/detail/'+suggestion.id})"
            >
              <p
                v-html="suggestion.content"
                style="padding: 0px; margin: 0px;"
              ></p>
              <small>{{suggestion.house_loc_area}} / {{suggestion.house_loc_bc}} / {{ suggestion.house_neighborhood}}</small>
            </b-list-group-item>
          </div>
          <div v-else>
            <b-list-group-item>
              未查询到相关信息
            </b-list-group-item>
          </div>

        </b-list-group>
      </b-col>
      <b-col>
        <b-input-group-append>
          <!-- <b-button variant="primary">搜索房源</b-button> -->
          <b-button
            variant="info"
            @click="$router.push({name: 'map'})"
          >
            <b-icon icon="map"></b-icon> 地图找房
          </b-button>
        </b-input-group-append>
      </b-col>
    </b-row>
  </div>

</template>

<script>
import request from '@/request/request.js'
export default {
  data () {
    return {
      show_suggestion: false,
      search_key_word: '',
      suggestion_list: {},
      width: null,
    }
  },
  methods: {
    get_suggestion_list () {
      if (this.search_key_word == '') {
        this.suggestion_list = {}
      }
      request.get("/search", {
        params: {
          field: "house",
          name: this.search_key_word,
        }
      }).then(res => {
        this.suggestion_list = res.data.data.suggestions
      })

    },
    toggle_suggestion (val) {
      this.show_suggestion = val
    },
  },
}
</script>

<style scoped>
#search-result {
  background: white;
  border-radius: 0 0 10px 10px;
  position: absolute;
  z-index: 2;
  font-size: 0.8rem;
  width: 100%;
}

#search-result > .list-group-item {
  padding: 0.5rem 0.5rem;
}

div.col {
  padding: 0;
}

/deep/ .list-group-item-action:hover,
.list-group-item-action:focus {
  color: white !important;
  background: #007bff;
}

.list-group-item {
  padding: 0.5rem 1rem;
}
</style>
