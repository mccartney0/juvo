<template>
  <footer class="d-flex align-items-center justify-content-center w-100">
    <img src="@/assets/crefaz.png" alt="Logo">
    <p>Parceiro autorizado</p>
  </footer>
</template>

<script>
export default {
  name: 'FooterLayout'
}
</script>

<style lang="scss" scoped>
footer {
  max-width: 1280px;
  height: 100px;

  img {
    border-right: 1px solid #1BC2B2;
    padding: 15px 45px;
  }

  p {
    font-weight: 500;
    margin: 0px;
    padding: 15px 45px;
  }
}
</style>