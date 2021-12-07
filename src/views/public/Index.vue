<template>
  <div>
    <TopNavbar />
    <router-view />
  </div>
</template>

<script>
import TopNavbar from '@/components/TopNavbar'

export default {
  components: {
    TopNavbar,
  },
}
</script>

<style scoped></style>
