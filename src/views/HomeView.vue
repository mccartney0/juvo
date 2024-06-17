<script setup>
import Banner from '@/components/Banner.vue'
import ProductOptions from '@/components/ProductOptions.vue'
import ContractPhases from '@/components/ContractPhases.vue'
</script>

<template>
  <main>
    <Banner />
    <ProductOptions />
    <ContractPhases />
  </main>
</template>

<style lang="scss" scoped>
$navbar-height: 81px;
$footer-height: 100px;

main {
  width: 100%;
}
</style>