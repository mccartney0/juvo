<template>
  <div class="wrapper-banner d-flex justify-content-center">
    <div class="banner-content d-flex justify-content-between align-items-center">
      <div class="labels">
        <div class="title">
          Sua solução <br />
          de empréstimo
        </div>

        <div class="subtitle py-1 fs-2">
          Use seu celular como garantia!
        </div>
      </div>

      <div class="form" id="simule-agora" :class="step === 3 ? 'd-none' : ''">
        <div class="title mb-4 text-center">Solicitação de Crédito</div>

        <!-- Steps Indicator -->
        <div class="steps-indicator d-flex justify-content-center mb-4">
          <div :class="['step', { active: step >= 1 }]">1</div>
          <div class="progress-line">
            <div :style="{ width: `${progressWidth}%` }" class="progress"></div>
          </div>
          <div :class="['step', { active: step >= 2 }]">2</div>
          <div class="progress-line">
            <div :style="{ width: `${step === 3 ? 100 : 0}%` }" class="progress"></div>
          </div>
          <div :class="['step', { active: step >= 3 }]"><img src="@/assets/check.svg" alt="Check"></div>
        </div>

        <form @submit.prevent="submitData({ formData })">
          <!-- Step 1 -->
          <div v-if="step === 1">
            <div class="mb-3">
              <input class="form-control p-2" id="nome" v-model="formData.nome" type="text" placeholder="Nome"
                required />
              <div v-if="!isNameValid && formData.nome !== ''" class="text-danger">Nome deve ter ao menos duas palavras.
              </div>
            </div>

            <div class="mb-3">
              <input class="form-control p-2" id="email" v-model="formData.email" type="email" placeholder="E-mail"
                required />
              <div v-if="!isEmailValid && formData.email !== ''" class="text-danger">E-mail inválido.</div>
            </div>

            <div class="input-group mb-3">
              <input class="form-control p-2" id="celular" v-model="formData.celular" @input="mascaraCelular" type="tel"
                placeholder="Celular" required />
              <input class="form-control p-2" v-model="formData.cpf" @input="mascaraCPF" id="cpf" type="text"
                placeholder="CPF" maxlength="14" required />
            </div>
            <div v-if="!isCelularValid && formData.celular !== ''" class="text-danger">Celular inválido.</div>
            <div v-if="!isCpfValid && formData.cpf !== ''" class="text-danger">CPF inválido.</div>

            <div class="input-group mb-3">
              <input class="form-control p-2" v-model="formData.birthdate" id="birthdate" type="date"
                placeholder="Data de nascimento" required />

              <input class="form-control p-2" id="address_postal_code" v-model="formData.address_postal_code" type="tel"
                placeholder="CEP" maxlength="8" required />
            </div>

            <div class="input-group mb-3">
              <input class="form-control p-2" v-model="formData.renda" id="renda" type="text" placeholder="Renda"
                @input="mascaraRenda" required />
            </div>

            <div class="button-container d-flex justify-content-center">
              <button type="button" class="btn submit-btn text-white border-0" @click="nextStep"
                :disabled="!firstStepFormValidation">
                Próximo
              </button>
            </div>
          </div>

          <!-- Step 2 -->
          <div v-if="step === 2 && juvoLoading === false">
            <div class="input-group select-combo mb-3 d-flex justify-content-between">
              <div class="marital-status d-flex flex-column gap-2 justify-content-between">
                <label for="marital_status_id" class="pt-3">Estado Civil</label>
                <select class="form-select" id="marital_status_id" v-model="formData.marital_status_id" required>
                  <option value="" disabled>Selecionar</option>
                  <option v-for="(juvoMaritalStatus, index) in juvoMaritalStatusList" :key="index"
                    :value="juvoMaritalStatus.id">
                    {{ juvoMaritalStatus.value }}
                  </option>
                </select>
              </div>

              <div class="exposed-person d-flex flex-column gap-2 justify-content-between">
                <label for="politically_exposed_person">Você é uma pessoa politicamente exposta?</label>
                <select class="form-select" id="politically_exposed_person"
                  v-model="formData.politically_exposed_person" required>
                  <option :value="true">Sim</option>
                  <option :value="false">Não</option>
                </select>
              </div>
            </div>

            <div class="d-flex flex-column gap-2 mb-3">
              <label for="professional_class_id">Área de Atuação</label>
              <select class="form-select" id="professional_class_id" v-model="formData.professional_class_id" required>
                <option value="" disabled>Selecionar</option>
                <option v-for="(juvoProfession, index) in juvoProfessionList" :key="index" :value="juvoProfession.id">
                  {{ juvoProfession.value }}
                </option>
              </select>
            </div>

            <div>
              <div class="mb-2">
                Selecione seu dispositivo móvel
              </div>

              <div class="input-group mb-3 d-flex gap-3 justify-content-between">
                <div class="device-brand d-flex flex-column gap-2 justify-content-between">
                  <label for="device_brand">Marca</label>
                  <select class="form-select" id="device_brand" v-model="formData.device.brand"
                    @change="setBrand(formData.device.brand)" required>
                    <option value="" disabled>Selecionar</option>
                    <option v-for="(juvoDeviceBrand, index) in juvoDeviceBrands" :key="index"
                      :value="juvoDeviceBrand.id">
                      {{ juvoDeviceBrand.value }}
                    </option>
                  </select>
                </div>

                <div class="device-model d-flex flex-column gap-2 justify-content-between">
                  <label for="device_model">Modelo</label>
                  <select :disabled="disableModels" :loading="loadingModels" class="form-select" id="device_model"
                    v-model="formData.device.model" required>
                    <option value="" disabled>Selecionar</option>
                    <option v-for="(model, index) in juvoDeviceModels" :key="index" :value="model.commercialCode">
                      {{ model.commercialName }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="checkboxes-container mb-3 d-flex flex-column gap-2 align-items-center">
              <div class="form-check d-flex gap-2 justify-content-start align-items-center">
                <input class="form-check-input" id="terms" v-model="formData.terms" type="checkbox" value=""
                  name="terms" required />
                <label class="form-check-label">
                  Ao acessar/utilizar este site, você aceita as condições dos Termos de uso e Política de Privacidade
                </label>
              </div>
            </div>

            <div class="button-container d-flex justify-content-between">
              <button type="button" class="btn back-btn text-white border-0" @click="prevStep">
                Voltar
              </button>
              <button class="btn submit-btn text-white border-0" :disabled="loading">
                <span v-if="!juvoLoading">Simule agora</span>

                <div v-if="juvoLoading" class="spinner-border spinner-border-sm" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </button>
            </div>
          </div>

          <div v-if="step === 2 && juvoLoading === true"
            class="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
            <div class="spinner-border spinner-border-xl" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>

            <span>Enviando informaçoes...</span>
          </div>

          <!-- Step 3 -->
          <div v-if="step === 3">
            <div class="button-container d-flex justify-content-center">
              <button class="btn submit-btn text-white border-0" :disabled="loading">
                <span v-if="!juvoLoading">Simule agora</span>

                <div v-if="juvoLoading" class="spinner-border spinner-border-sm" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- Step 3 -->
      <div class="form success-form" :class="step === 3 ? 'd-flex' : 'd-none'">
        <div class="upper-title">
          Enviado com sucesso.
        </div>

        <div class="thanks-message">
          OBRIGADO!
        </div>

        <div class="down-title">
          Logo entraremos em contato.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useJuvo } from '@/stores/juvo';

export default {
  name: "BannerIntro",
  data() {
    return {
      step: 1,
      formData: {
        nome: '',
        email: '',
        celular: '',
        cpf: '',
        renda: '',
        birthdate: '',
        professional_class_id: null,
        marital_status_id: null,
        address_postal_code: '',
        politically_exposed_person: null,
        terms: false,
        device: {
          model: '',
          brand_option: '',
          brand: '',
          os_version: ''
        },
      },
      loading: false,
      token: null,
    };
  },
  computed: {
    ...mapState(useJuvo, ['juvoData', 'juvoLoading', 'juvoError', 'juvoProfessionList', 'juvoMaritalStatusList', 'juvoDeviceInfo', 'juvoDeviceModels', 'juvoDeviceBrands', 'brand', 'loadingModels', 'disableModels']),
    brand: {
      get() {
        return this.brand;
      },
      set(value) {
        this.setBrand(value);
      },
    },
    progressWidth() {
      return this.step >= 2 ? 100 : this.step === 1 ? 50 : 0;
    },
    isNameValid() {
      return this.formData.nome.trim().split(' ').length >= 2;
    },
    isEmailValid() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(this.formData.email);
    },
    isCelularValid() {
      const celularPattern = /^\(\d{2}\) \d{5}-\d{4}$/;
      return celularPattern.test(this.formData.celular);
    },
    isCpfValid() {
      const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
      return cpfPattern.test(this.formData.cpf);
    },
    firstStepFormValidation() {
      if (this.formData.nome !== '' && this.formData.email !== '' && this.formData.celular !== '' && this.formData.cpf !== '' && this.formData.birthdate !== '' && this.formData.cep !== '' && this.formData.renda !== '') {
        return true
      }
      return false
    },
  },
  methods: {
    ...mapActions(useJuvo, ['getToken', 'getProfessionalList', 'getMaritalStatus', 'getDeviceInfo', 'getDeviceModels', 'getDeviceBrands', 'setBrand', 'sendForm']),
    nextStep() {
      this.step++;
    },
    prevStep() {
      this.step--;
    },
    mascaraCelular() {
      let formattedCelular = this.formData.celular;

      formattedCelular = formattedCelular.replace(/\D/g, "");

      formattedCelular = formattedCelular.substring(0, 11);

      if (formattedCelular.length > 6) {
        formattedCelular = formattedCelular.replace(
          /^(\d{2})(\d{5})(\d{4})$/,
          "($1) $2-$3"
        );
      } else if (formattedCelular.length > 2) {
        formattedCelular = formattedCelular.replace(
          /^(\d{2})(\d{0,5})$/,
          "($1) $2"
        );
      } else if (formattedCelular.length > 0) {
        formattedCelular = formattedCelular.replace(/^(\d{2})$/, "($1)");
      }

      this.formData.celular = formattedCelular;
    },
    mascaraRenda() {
      let formattedRenda = this.formData.renda;

      formattedRenda = formattedRenda.replace(/\D/g, "");

      this.formData.renda = formattedRenda;
    },
    mascaraCPF() {
      let formattedCPF = this.formData.cpf;

      formattedCPF = formattedCPF.replace(/\D/g, "");

      if (formattedCPF.length > 3) {
        formattedCPF = formattedCPF.slice(0, 3) + "." + formattedCPF.slice(3);
      }
      if (formattedCPF.length > 7) {
        formattedCPF =
          formattedCPF.slice(0, 7) + "." + formattedCPF.slice(7);
      }
      if (formattedCPF.length > 11) {
        formattedCPF =
          formattedCPF.slice(0, 11) + "-" + formattedCPF.slice(11);
      }

      this.formData.cpf = formattedCPF;
    },
    validateAll() {
      const validations = {
        name: this.isNameValid,
        email: this.isEmailValid,
        celular: this.isCelularValid,
        cpf: this.isCpfValid,
        // Adicione outras validações aqui...
      };

      const isValid = Object.values(validations).every(value => value);
      if (!isValid) {
        console.error('Por favor, verifique suas informações:', validations);
      }
      return isValid;
    },
    async submitData(formData) {
      // TODO ajustar calendário para mostrar sempre 18 anos atrás a partir da data de hoje e validar CEP antes de liberar botao para PRÓXIMO
      // TODO criar form 4 para mostrar as ofertas disponíveis e ir para o form 5 para preencher com dados adicionais
      if (this.validateAll()) {
        await this.sendForm(formData);

        const isSuccess = this.juvoData.isSuccess;
        const hasOffers = this.juvoData.data.status;

        if (hasOffers) {
          this.step = 4; //Tela de Ofertas
        } else if (isSuccess) {
          this.step = 3; //Tela de Sucesso
        }
      } else {
        alert('Por favor, preencha suas informações corretamente');
      }
    }
  },
  async mounted() {
    await this.getToken();

    this.getProfessionalList();
    this.getMaritalStatus();
    this.getDeviceInfo();
    this.getDeviceBrands();
  },
};
</script>

<style lang="scss" scoped>
::placeholder {
  color: #aaaaaa;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="tel"]:focus,
input[type="date"]:focus,
select:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.25rem rgba(221, 62, 131, 0.89);
}

select option {
  background: rgba(221, 62, 131, 0.103);
}

select {
  width: 100%;
}


.form-check-input:checked {
  background-color: var(--primary-color) !important;
  border: 0;
}

.form-check-input:focus,
.label::after,
label.form-check-label:focus,
.form-check-input::after,
.form-check-input:not(:checked):not(:disabled):active:focus,
.form-check-input:focus,
.label:focus {
  border: 0;
  box-shadow: none;
}

.wrapper-banner {
  background-color: var(--primary-color);
  color: #fff;
  height: 500px;

  .banner-content {
    width: 100%;
    max-width: 1280px;
    padding: 20px;

    .labels {
      z-index: 9;
      max-width: 516px;

      .title {
        font-size: 4rem;
        font-weight: 700;
        line-height: normal;
      }

      .subtilte {
        max-width: 325px;
      }
    }

    .form {
      z-index: 9;
      border-radius: 2rem;
      background: var(--highlight-color);
      width: 500px;
      height: 600px;
      min-height: 600px;
      margin-top: 180px;
      padding: 40px;
      position: relative;

      .title {
        font-size: 1.5625rem;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }

      .form-control {
        background-color: #fff;
      }

      .form-check {
        width: 350px;

        .form-check-label {
          font-size: 0.75rem;
        }
      }

      .select-combo {
        height: 90px;

        .exposed-person {
          width: 51%;
        }

        .marital-status {
          width: 45%;
        }
      }

      .device-brand {
        width: 45%;
      }

      .device-model {
        width: 51%;
      }

      .button-container {
        .btn {
          &:disabled {
            opacity: .3;
          }
        }

        .back-btn {
          &:hover {
            background: #FFF;
            color: #000 !important;
          }

          background: transparent;
        }

        .submit-btn {
          background-color: var(--primary-color);

          &:hover {
            background: #c43f78;
          }
        }
      }
    }

    .success-form {
      background: #F9CF32;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .thanks-message {
        color: #DD3E84;
        font-size: 3rem;
        font-weight: 700
      }

      .upper-title,
      .down-title {
        text-align: center;
        color: #5D5D5D;
        font-size: 1.5rem;
        font-weight: 600
      }
    }
  }
}

.steps-indicator {
  display: flex;
  align-items: center;
  justify-content: center;

  .step {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background-color: transparent;
    border: 1px solid #FFF;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: bold;

    &.active {
      background-color: var(--primary-color);
      border: 1px solid var(--primary-color);
    }
  }

  .progress-line {
    width: 50px;
    height: 2px;
    background-color: #fff;
    position: relative;

    .progress {
      height: 100%;
      background-color: var(--primary-color);
      position: absolute;
      top: 0;
      left: 0;
      transition: width 0.3s ease;
    }
  }
}

@media (max-width: 970px) {
  .wrapper-banner {
    .banner-content {
      flex-direction: column;

      .labels {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        gap: 15px;

        margin-top: 80px;

        .title {
          text-align: center;
          font-size: 41px;
        }
      }

      .form {
        width: 100%;
        margin-top: 100px;
        height: 560px;

        &::before {
          content: "";
          z-index: -1;
          border-radius: 2rem;
          display: block;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          backdrop-filter: blur(10px);
        }

        .form-check {
          width: 100%;
        }
      }
    }
  }
}

@media (max-width: 500px) {
  .labels {
    .subtitle {
      text-align: center;
    }
  }

  .form {
    height: 720px !important;
    min-height: 720px !important;
    margin-top: 55px;

    .select-combo {
      height: auto !important;

      .exposed-person {
        width: 100% !important;
      }

      .marital-status {
        width: 100% !important;
      }
    }

    .device-model {
      width: 45% !important;
    }
  }

  .wrapper-banner {
    background-image: url("@/assets/fundo-mulher.png");
  }
}
</style>
