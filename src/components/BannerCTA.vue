<template>
  <div class="wrapper-banner-cta mt-5">
    <a href="#simule-agora">
      <div class="content-container position-relative d-flex justify-content-end">
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'BannerCTA',
}
</script>

<style lang="scss" scoped>
.wrapper-banner-cta {
  display: flex;
  justify-content: center;

  .content-container {
    width: 1280px;
    height: 570px;
    background-image: url('@/assets/bg-old-people.png');
    background-repeat: no-repeat;
    background-size: cover;

    border-radius: 60px;
  }
}

@media (max-width: 970px) {
  .wrapper-banner-cta {
    .content-container {
      width: 100%;
      height: 600px;
      background-image: none;
      background-color: #474848;
      overflow: hidden;
    }
  }
}
</style>