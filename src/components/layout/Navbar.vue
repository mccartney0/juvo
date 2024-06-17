<template>
  <header class="w-100 d-flex">
    <nav>
      <img src="@/assets/logo.svg" alt="Logo">
    </nav>
  </header>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>

<style>
header {
  justify-content: start;
  max-width: 1280px;
  padding: 20px;
}

@media (max-width: 970px) {
 header {
  justify-content: center;
 }
}
</style>