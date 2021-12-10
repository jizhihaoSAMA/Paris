<template>
  <b-container>
    <hr class="split-line" />
    <b-row>
      <b-col cols="1"><p class="filter-header">区域:</p></b-col>
      <b-col cols="11"
        ><b-tabs pills>
          <b-tab
            title="全部"
            @click="
              () => {
                let new_query = JSON.parse(JSON.stringify(this.$route.query))
                delete new_query.street_code
                delete new_query.area_code
                $router.replace({ query: { ...new_query } })
              }
            "
          ></b-tab>
          <b-tab
            v-for="(value, key) in location"
            :key="value.code"
            :title="key"
            @click="
              $router.replace({
                query: {
                  ...$route.query,
                  area_code: value.code,
                },
              })
            "
            :active="$route.query.area_code == value.code"
          >
            <b-form-group style="padding: 0.5rem">
              <b-form-radio
                v-for="(street_code, street_name) in value.streets"
                :key="street_code"
                v-model="selected_street"
                :value="street_code"
                class="custom-control-inline"
                size="md"
                @change="
                  $router.replace({
                    path: $router.path,
                    query: {
                      ...$route.query,
                      area_code: $route.query.area_code,
                      street_code: street_code,
                    },
                  })
                "
                ><span v-text="street_name" style="font-size: 0.9rem"></span
              ></b-form-radio>
            </b-form-group>
          </b-tab> </b-tabs
      ></b-col>
    </b-row>
    <hr class="split-line" />
    <b-row>
      <b-col cols="1"><p class="filter-header">租房类型:</p></b-col>
      <b-col cols="11">
        <b-tabs pills>
          <b-tab
            v-for="{ type, text } in rent_type"
            @click="
              $router.replace({
                query: {
                  ...$route.query,
                  type: type,
                },
              })
            "
            :title="text"
            :key="text"
          >
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
    <hr class="split-line" />
    <b-row>
      <b-col cols="1"><p class="filter-header">租金:</p></b-col>
      <b-col cols="11">
        <b-form-group
          style="padding: 0.3rem"
          @change="
            () => {
              let new_query = JSON.parse(JSON.stringify(this.$route.query))
              delete new_query.price_start
              delete new_query.price_end
              $router.replace({
                query: {
                  ...new_query,
                },
              })
            }
          "
        >
          <b-form-radio
            v-model="price_range"
            class="custom-control-inline"
            :value="null"
            >不限</b-form-radio
          >
          <b-form-radio
            v-for="(item, index) in rent_money"
            :key="item"
            class="custom-control-inline"
            v-model="price_range"
            :value="item + ',' + rent_money[index + 1]"
            @change="
              () => {
                _ = price_range.split(',')
                start = _[0]
                end = _[1]
                $router.replace({
                  query: {
                    ...$route.query,
                    price_start: start,
                    price_end: end,
                  },
                })
              }
            "
            ><span
              v-text="
                item +
                (index != rent_money.length - 1
                  ? ' - ' + rent_money[index + 1]
                  : ' 以上')
              "
              style="font-size: 0.9rem"
            ></span
          ></b-form-radio>
        </b-form-group>
      </b-col>
    </b-row>
    <hr class="split-line" />
    <b-row>
      <b-col cols="1"><p class="filter-header">房屋特色:</p></b-col>
      <b-col cols="11"
        ><b-form-checkbox-group
          :options="special_tag"
          value-field="tag"
          text-field="text"
          v-model="special_tag_selected"
          @change="changed_special_tag"
          style="padding: 0.3rem"
        ></b-form-checkbox-group
      ></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      selected_street: null,
      price_range:
        this.$route.query.price_start + ',' + this.$route.query.price_end,
      location: require('@/assets/city_name2code.json'),

      rent_type: [
        {
          type: 'all',
          text: '不限',
        },
        {
          type: 'full',
          text: '整租',
        },
        {
          type: 'part',
          text: '合租',
        },
      ],
      rent_money: [0, 2000, 4000, 6000, 10000, 12000],
      special_tag: [
        {
          text: '带独立卫生间',
          tag: 'special_toilet',
        },
        {
          text: '带独立阳台',
          tag: 'special_balcony',
        },
        {
          text: '有电梯',
          tag: 'lift',
        },
        {
          text: '新小区',
          tag: 'new_neighborhood',
        },
        {
          text: '近地铁',
          tag: 'nearby_subway',
        },
        {
          text: '绿化率高',
          tag: 'hight_greening_rate',
        },
      ],
      special_tag_selected: [],
    }
  },
  methods: {
    changed_special_tag() {
      // 将选择到的设置为1
      let _ = {}
      this.special_tag_selected.forEach((item, index) => {
        _[item] = 1
      })

      // 删除存在且未被选中的
      let new_query = JSON.parse(JSON.stringify(this.$route.query))
      // todo

      this.$router.replace({
        query: {
          ...new_query,
          ..._,
        },
      })
    },
    get_current_selected_tag() {
      return this.special_tag
        .map(({ tag }) => tag)
        .filter((item) => this.$route.query[item] != undefined)
    },
  },
  mounted() {
    this.special_tag_selected = this.get_current_selected_tag()
  },
}
</script>

<style scoped>
/deep/ .nav-item > a {
  font-size: 0.9rem;
  color: #222;
}

/deep/ .nav-link {
  padding: 0.3rem;
}

.split-line {
  margin-top: 0;
  /* margin-bottom: 0; */
}

.filter-header {
  padding: 0.3rem 0rem;
  font-size: 0.9rem;
  float: right;
  font-weight: 800;
}
</style>
