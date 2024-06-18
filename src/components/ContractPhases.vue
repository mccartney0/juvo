<script setup>
import BannerCTA from '@/components/BannerCTA.vue'
</script>

<template>
  <div class="wrapper-contract-phases d-flex justify-content-center position-relative">
    <BannerCTA class="banner-cta position-absolute start-50 translate-middle" />

    <div class="contract-phases-content d-flex flex-column gap-5 justify-content-end align-items-center">
      <div class="title">
        Veja como funciona
      </div>

      <div class="items">

        <div class="item d-flex gap-4 align-items-center">
          <div class="id">
            1
          </div>
          <div class="title">
            Faça o seu cadastro.
          </div>
        </div>

        <div class="item d-flex gap-4 align-items-center">
          <div class="id">
            2
          </div>
          <div class="title">
            Aguarde o resultado da análise de crédito.
          </div>
        </div>

        <div class="item d-flex gap-4 align-items-center">
          <div class="id">
            3
          </div>
          <div class="title">
            Assine o contrato.
            O dinheiro entra na sua conta em até 24 horas!
          </div>
        </div>
      </div>

      <div class="button-container d-flex justify-content-center">
        <a href="#simule-agora">
          <button type="submit" class="btn text-white border-0">
            Peça já!
          </button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContractPhases',
}
</script>

<style lang="scss" scoped>
.banner-cta {
  top: -70px;
}

.wrapper-contract-phases {
  height: 900px;
  background-color: #D9F4F4;
  margin-top: 300px;

  .contract-phases-content {
    margin-bottom: 140px;
    max-width: 1280px;
    color: #5D5D5D;

    .title {
      font-size: 2.5rem;
      font-weight: 700;
    }

    .items {
      display: flex;

      .item {
        width: 350px;

        .id {
          font-size: 6rem;
          font-weight: 600;
          color: var(--primary-color)
        }

        .title {
          font-size: 1.2rem;
          font-weight: 400;
        }
      }
    }
  }

}

@media (max-width: 970px) {
  .wrapper-contract-phases {}
}

@media (max-width: 500px) {
  .wrapper-contract-phases {
    margin-top: 70px;
    .contract-phases-content {
      .title {
        text-align: center;
      }
      .items {
        flex-direction: column;

        .item {
          &:first-child {
            .title {
              padding-left: 45px;
            }
          }
        }
      }
    }
  }
}
</style>