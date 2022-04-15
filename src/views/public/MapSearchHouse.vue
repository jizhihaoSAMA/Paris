<template>
  <div
    class=""
    id=""
  >
    <b-row no-gutters>
      <b-col cols="4">
        <b-list-group>
          <b-list-group-item>
            <b-row>
              <b-col
                v-for="(info, filter_name) in filter_map"
                :key="filter_name"
                cols="3"
              >
                <b-dropdown
                  :text="filter_name"
                  variant="outline-info"
                >
                  <b-dropdown-item-button
                    v-for="(value, option) in info"
                    :key="option"
                  >
                    {{ option }}
                  </b-dropdown-item-button>
                </b-dropdown>
              </b-col>
            </b-row>

          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col cols="8">
        <baidu-map
          class="map"
          center="北京"
          :scroll-wheel-zoom="true"
        >
        </baidu-map>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      filter_map: {
        整租合租: {
          不限: { type: 'all' },
          整租: { type: 'full' },
          合租: { type: 'part' },
        },
        价格筛选: {
          '不限': {},
          '0-2000': {
            start: '0',
            end: '2000',
          },
          '2000-4000': {
            start: '2000',
            end: '4000',
          },
          '4000-6000': {
            start: '4000',
            end: '6000',
          },
          '8000-10000': {
            start: '8000',
            end: '10000'
          },
          '10000-12000': {
            start: '10000',
            end: '12000'
          },
          '12000以上': {
            start: '12000'
          }
        },
        朝向: {
          南: {
            direction: 'south',
          },
          东: {
            direction: 'east',
          },
          北: {
            direction: 'north',
          },
          西: {
            direction: 'western'
          }
        }
      },
      house_list: [
        {
          id: 1,
          is_full_rent: true,
          neiborghood: '你好小区',
          room_amount: 3,
          room_name: '南卧',
          size: 12,
          located_floor: 3,
          total_floor: 6,
          special_tags: ['深呼吸1.0', '新校区', '可短签'],
          price: 2300,
          neiborghood_geo: '距离地铁站1km',
        },
        {
          id: 2,
          is_full_rent: true,
          neiborghood: '你好小区',
          room_amount: 3,
          room_name: '南卧',
          size: 12,
          located_floor: 3,
          total_floor: 6,
          special_tags: ['深呼吸1.0', '新校区', '可短签'],
          price: 2300,
          neiborghood_geo: '距离地铁站1km',
        },
        {
          id: 3,
          is_full_rent: true,
          neiborghood: '你好小区',
          room_amount: 3,
          room_name: '南卧',
          size: 12,
          located_floor: 3,
          total_floor: 6,
          special_tags: ['深呼吸1.0', '新校区', '可短签'],
          price: 2300,
          neiborghood_geo: '距离地铁站1km',
        },
        {
          id: 4,
          is_full_rent: true,
          neiborghood: '你好小区',
          room_amount: 3,
          room_name: '南卧',
          size: 12,
          located_floor: 3,
          total_floor: 6,
          special_tags: ['深呼吸1.0', '新校区', '可短签'],
          price: 2300,
          neiborghood_geo: '距离地铁站1km',
        },
        {
          id: 5,
          is_full_rent: true,
          neiborghood: '你好小区',
          room_amount: 3,
          room_name: '南卧',
          size: 12,
          located_floor: 3,
          total_floor: 6,
          special_tags: ['深呼吸1.0', '新校区', '可短签'],
          price: 2300,
          neiborghood_geo: '距离地铁站1km',
        },
        {
          id: 6,
          is_full_rent: true,
          neiborghood: '你好小区',
          room_amount: 3,
          room_name: '南卧',
          size: 12,
          located_floor: 3,
          total_floor: 6,
          special_tags: ['深呼吸1.0', '新校区', '可短签'],
          price: 2300,
          neiborghood_geo: '距离地铁站1km',
        }]
    }
  }
}
</script>

<style scoped>
.map {
  width: 100%;
  height: 100vh;
}

div.col-4 {
  padding: 0;
}

div.col-8 {
  padding: 0;
}
</style>
