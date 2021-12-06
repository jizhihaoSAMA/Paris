<template>
  <div>
    <TopNavbar />
    <HouseFrame v-if="$route.params.type == 'house'" />
    <OfficeFrame v-else-if="$route.params.type == 'office'" />
  </div>
</template>

<script>
import TopNavbar from '@/components/TopNavbar'
import HouseFrame from '@/components/HouseFrame'
import OfficeFrame from '@/components/OfficeFrame'

export default {
  components: {
    TopNavbar,
    HouseFrame,
    OfficeFrame,
  },
}
</script>

<style scoped></style>
