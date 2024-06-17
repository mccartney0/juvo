<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
</script>

<template>
  <div class="wrapper-view">
    <Navbar />
    <RouterView />
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.wrapper-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>