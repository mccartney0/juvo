<template>
  <div class="wrapper-product-options d-flex justify-content-center w-100">
    <div class="product-options-container">
      <div class="titles-container">
        <div class="title mb-4">
          <h1>
            Aqui você tem até R$ 4.500,00 para:
          </h1>
        </div>
      </div>

      <div class="options-container mt-5 py-5">
        <div class="option d-flex flex-column gap-2 justify-content-center align-items-center">
          <img src="@/assets/icon-1.svg" alt="Imagem" class="option-icon mt-3">
          <div class="option-title">
            Cobrir as contas do fim do mês.
          </div>

          <div class="option-subtitle">
            Sem burocracia, direto do celular.
          </div>
        </div>

        <div class="option d-flex flex-column gap-2 justify-content-center align-items-center">
          <img src="@/assets/icon-2.svg" alt="Imagem" class="option-icon">
          <div class="option-title">
            Resolver aqueles imprevistos.
          </div>

          <div class="option-subtitle">
            Fácil e rápido!
          </div>
        </div>

        <div class="option d-flex flex-column gap-2 justify-content-center align-items-center">
          <img src="@/assets/icon-3.svg" alt="Imagem" class="option-icon mt-3">

          <div class="option-title">
            Quitar o cartão de crédito e o cheque especial.
          </div>

          <div class="option-subtitle">
            Juros bem mais baixos.
          </div>
        </div>
      </div>

      <div class="button-container my-5 d-flex justify-content-center">
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
  name: 'ProductOptions',
  mounted() {
    $('.options-container').slick({
      dots: false,
      arrows: true,
      infinite: false,
      centerMode: true,
      centerPadding: '10px',
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
            arrows: false,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
          }
        }
      ]
    });
  },
}
</script>

<style lang="scss">
.wrapper-product-options {
  .product-options-container {
    width: 1280px;
    padding: 20px;
    text-align: center;
    padding-top: 230px;

    .titles-container {
      .title {
        h1 {
          color: #5D5D5D;
          font-weight: 700;
          font-size: 2.5rem;
        }
      }
    }

    .options-container {
      /* the slides */
      .slick-slide {
        margin: 0 120px;
      }

      /* the parent */
      .slick-list {
        margin: 0 -120px;
      }

      .option {
        height: 360px;
        padding: 12px;
        border: 2px solid var(--primary-color);
        border-radius: 95px;
        color: #5D5D5D;

        .option-icon {
          width: 70px;
          height: 70px;
        }

        .option-title {
          font-weight: 600;
          font-size: 1.2rem;
          line-height: 20px;
        }

        .option-subtitle {
          font-size: 1rem;
        }
      }
    }
  }
}

.slick-dots {
  padding: 0;
  margin-top: 45px;
  display: flex;
  justify-content: center;
  gap: 10px;

  .slick-active {
    button {
      background: #1F1F1F;
      color: #1F1F1F;
    }
  }

  li {
    display: inline;

    button {
      width: 20px;
      height: 20px;
      border-radius: 50px;
      background: #D9D9D9;
      color: #D9D9D9;
      border: 0;
      outline: 0;
    }
  }
}

@media (max-width: 970px) {
  .product-options-container {
    width: 100% !important;
    padding-top: 465px !important;

    .titles-container {
      .title {
        padding: 20px;

        h1 {
          font-size: 32px
        }
      }

      .subtitle {
        display: none;
      }
    }

    .options-container {
      .slick-slide {
        &:first-child {
          margin: 15px !important;
        }
      }

      .option {
        // height: auto !important;
      }
    }
  }
}

@media (max-width: 600px) {
  .product-options-container {
    padding-top: 710px !important;
  }
  .slick-slide {
    margin: 15px !important;
  }
}
</style>