<template>
  <b-container>
    <hr class="split-line" />
    <b-row>
      <b-col cols="1">
        <p class="filter-header">区域:</p>
      </b-col>
      <b-col cols="11">
        <b-tabs pills>
          <b-tab
            title="全部"
            @click="
              () => {
                let new_query = JSON.parse(JSON.stringify(this.$route.query))
                delete new_query.bc
                delete new_query.area
                $router.replace({ query: { ...new_query } })
              }
            "
          ></b-tab>
          <b-tab
            v-for="(values, key) in location"
            :key="key"
            :title="key"
            @click="
             () => {
               $data.bc = '不限'
                $router.replace({
                query: {
                  ...$route.query,
                  area: key,
                  bc:'不限'
                },
              })
             }
            "
            :active="$route.query.area == key"
          >
            <b-form-group style="padding: 0.5rem">
              <b-form-radio
                value="不限"
                v-model="bc"
                class="custom-control-inline"
                size="md"
                @change="
                  $router.replace({
                    path: $router.path,
                    query: {
                      ...$route.query,
                      area: $route.query.area,
                      bc: '不限',
                    },
                  })
                "
              >
                <span style="font-size: 0.9rem">不限</span>
              </b-form-radio>
              <b-form-radio
                v-for="value in values"
                :key="value.name"
                v-model="bc"
                :value="value.name"
                class="custom-control-inline"
                size="md"
                @change="
                  $router.replace({
                    path: $router.path,
                    query: {
                      ...$route.query,
                      area: $route.query.area,
                      bc: value.name,
                    },
                  })
                "
              ><span
                  v-text="value.name"
                  style="font-size: 0.9rem"
                ></span></b-form-radio>
            </b-form-group>
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
    <hr class="split-line" />
    <b-row>
      <b-col cols="1">
        <p class="filter-header">租房类型:</p>
      </b-col>
      <b-col cols="11">
        <b-tabs pills>
          <b-tab
            v-for="{ type, text } in rentTypeOptions"
            @click="
              $router.replace({
                query: {
                  ...$route.query,
                  rentType: type,
                },
              })
            "
            :title="text"
            :key="text"
            :active="$route.query.rentType == type"
          >
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
    <hr class="split-line" />
    <b-row>
      <b-col cols="1">
        <p class="filter-header">租金:</p>
      </b-col>
      <b-col cols="11">
        <b-form-group
          style="padding: 0.3rem"
          @change="
            () => {
              let new_query = JSON.parse(JSON.stringify(this.$route.query))
              delete new_query.priceStart
              delete new_query.priceEnd
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
            @change="
              () => {
                let new_query = JSON.parse(JSON.stringify(this.$route.query))
                delete new_query.priceEnd
                delete new_query.priceStart
                $router.replace({
                  query: {
                    ...new_query,
                  },
                })
              }
            "
          >不限</b-form-radio>
          <b-form-radio
            v-for="(item, index) in rent_money"
            :key="item"
            class="custom-control-inline"
            v-model="price_range"
            :value="item + ',' + rent_money[index + 1]"
            @change="
              () => {
                var [start, end] = price_range.split(',')
                $router.replace({
                  query: Object.assign({}, 
                    {...$route.query},
                    { priceStart: start },
                    end && {priceEnd: end}),
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
            ></span></b-form-radio>
        </b-form-group>
      </b-col>
    </b-row>
    <hr class="split-line" />
    <b-row>
      <b-col cols="1">
        <p class="filter-header">房屋特色:</p>
      </b-col>
      <b-col cols="11">
        <b-button
          style="float: right"
          pill
          @click="
            () => {
              special_tag_selected = []
              changed_special_tag()
            }
          "
        >清空筛选</b-button>
        <b-form-checkbox-group
          :options="special_tag"
          value-field="tag"
          text-field="text"
          v-model="special_tag_selected"
          @change="changed_special_tag"
          style="padding: 0.3rem"
        ></b-form-checkbox-group>
      </b-col>
    </b-row>
    <hr class="split-line" />
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      bc: this.$route.query.bc,
      price_range:
        this.$route.query.priceStart || this.$route.query.priceEnd
          ? this.$route.query.priceStart + ',' + this.$route.query.priceEnd
          : null,
      location: require('@/assets/city_name2code.json'),
      rentTypeOptions: [
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
          tag: 'hasSingleToilet',
        },
        {
          text: '带独立阳台',
          tag: 'hasSingleBalcony',
        },
        {
          text: '有电梯',
          tag: 'hasLift',
        },
        {
          text: '可短租',
          tag: 'supportShortTermRent',
        },
      ],
      special_tag_selected: [],
    }
  },
  methods: {
    changed_special_tag () {
      let new_query = JSON.parse(JSON.stringify(this.$route.query))
      this.special_tag.forEach((item, index) => {
        if (this.special_tag_selected.indexOf(item.tag) != -1) {
          new_query[item.tag] = 1
        } else {
          delete new_query[item.tag]
        }
      })
      this.$router.replace({
        query: {
          ...new_query,
        },
      })
    },
    get_current_selected_tag () {
      return this.special_tag
        .map(({ tag }) => tag)
        .filter((item) => this.$route.query[item] != undefined)
    },
  },
  mounted () {
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
  font-size: 0.9vh;
  float: right;
  font-weight: 800;
}
</style>
