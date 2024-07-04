<template>
  <footer class="d-flex align-items-center justify-content-center w-100">
    <img src="@/assets/logo.svg" alt="Logo">
    <p>Parceiro autorizado</p>
    <template v-if="leadID">
      <iframe :src="`https://igoal.go2cloud.org/aff_l?offer_id=6003&adv_sub=${leadID.lead_id}`" scrolling="no" frameborder="0"
        width="1" height="1"></iframe>
    </template>
  </footer>
</template>

<script>
import { mapState } from 'pinia';
import { useJuvo } from '@/stores/juvo';

export default {
  name: 'FooterLayout',
  computed: {
    ...mapState(useJuvo, ['leadID'])
  }
}
</script>

<style lang="scss" scoped>
footer {
  max-width: 1280px;
  height: 100px;

  img {
    width: 100px;
    border-right: 1px solid #1BC2B2;
    padding: 15px 15px;
  }

  p {
    font-weight: 500;
    margin: 0px;
    padding: 15px;
  }
}
</style>