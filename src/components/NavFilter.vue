<template>
  <b-container>
    <b-row>
      <b-col cols="1"
        ><p
          style="
            padding: 0.5rem 0rem;
            font-size: 0.9rem;
            float: right;
            font-weight: 800;
          "
        >
          区域 :
        </p></b-col
      >
      <b-col cols="11"
        ><b-tabs pills>
          <b-tab
            v-for="(value, key) in location"
            :key="value.code"
            :title="key"
            @click="
              $router.push({
                path: $router.path,
                query: value.code
                  ? {
                      area_code: value.code,
                      street_code: $route.query.street_code,
                    }
                  : {},
              })
            "
            :active="$route.query.area_code == value.code"
          >
            <b-form-group
              style="
                border-left: 1px dotted;
                border-right: 1px dotted;
                padding: 0.5rem;
              "
            >
              <b-form-radio
                v-for="(street_code, street_name) in value.streets"
                :key="street_code"
                v-model="selected_street"
                :value="street_code"
                class="custom-control-inline"
                size="md"
                @change="
                  $router.push({
                    path: $router.path,
                    query: {
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
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      selected_street: this.$route.query.street_code
        ? this.$route.query.street_code
        : '全部',
      location: require('@/assets/city_name2code.json'),
    }
  },
  methods: {},
}
</script>

<style scoped>
/deep/ .nav-item > a {
  font-size: 0.9rem;
}
</style>
