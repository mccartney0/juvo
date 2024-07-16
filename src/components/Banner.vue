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
      <!-- Modal -->
      <div class="modal fade" id="termos-de-uso" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5 text-black" id="exampleModalLabel">Termos de Uso – <a href="juvocred.com"
                  target="_blank" rel="noopener noreferrer">JuvoCred.com</a></h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-black">
              <p>
                <b>
                  1. Introdução
                </b>
              </p>

              <p>
                Bem-vindo ao <a href="juvocred.com" target="_blank" rel="noopener noreferrer">JuvoCred.com</a>, uma
                página de crédito desenvolvida pela iGoal em parceria com a Juvo. Estes
                Termos de Uso explicam como coletamos, utilizamos e protegemos os dados pessoais que você nos fornece.
                Ao
                utilizar nossa página, você concorda com os termos aqui descritos.
              </p>

              <p>
                <b>
                  2. Coleta de Dados
                </b>
              </p>
              <p>
                Para oferecer nossos serviços de crédito, coletamos as seguintes informações:
              </p>

              <ul>
                <li>
                  Nome
                </li>
                <li>
                  Email
                </li>
                <li>
                  Celular
                </li>
                <li>
                  CPF
                </li>
                <li>
                  Data de Nascimento
                </li>
                <li>
                  CEP
                </li>
                <li>
                  Renda
                </li>
              </ul>

              <p>
                <b>
                  3. Tratamento dos Dados
                </b>
              </p>
              <p>
                Utilizamos esses dados para:
              </p>

              <ul>
                <li>
                  Avaliar sua elegibilidade para produtos de crédito.
                </li>
                <li>
                  Entrar em contato com você sobre sua solicitação.
                </li>
                <li>
                  Cumprir com obrigações legais e regulatórias.
                </li>
              </ul>

              <p>
                <b>
                  4. Compartilhamento dos Dados
                </b>
              </p>
              <p>
                Seus dados poderão ser compartilhados com:
              </p>
              <ul>
                <li>
                  Instituições financeiras parceiras.
                </li>
                <li>
                  Empresas de análise de crédito.
                </li>
                <li>
                  Órgãos governamentais, quando necessário.
                </li>
              </ul>

              <p>
                <b>
                  5. Direitos dos Usuários
                </b>
              </p>

              <p>
                Você tem o direito de:
              </p>

              <ul>
                <li>
                  Confirmar a existência do tratamento de seus dados.
                </li>
                <li>
                  Acessar os dados que tratamos sobre você.
                </li>
                <li>
                  Solicitar correção ou atualização de seus dados.
                </li>
                <li>
                  Solicitar a portabilidade de seus dados a outro fornecedor.
                </li>
                <li>
                  Revogar seu consentimento.
                </li>
                <li>
                  Solicitar o bloqueio, eliminação ou anonimização dos seus dados, nas hipóteses permitidas em lei.
                </li>
              </ul>

              <p>
                <b>
                  6. Segurança dos Dados
                </b>
              </p>
              <p>
                Implementamos medidas de segurança para proteger seus dados contra acesso não autorizado, uso indevido e
                divulgação. Seus dados são armazenados em ambientes seguros, com criptografia e monitoramento de acesso.
              </p>

              <p>
                <b>
                  7. Retenção e Descarte dos Dados
                </b>
              </p>

              <p>
                Mantemos seus dados apenas pelo tempo necessário para cumprir os propósitos para os quais foram
                coletados,
                exceto quando exigido por lei. Assim que nossa relação com o titular se encerra, descartamos os dados
                pessoais de maneira segura.
              </p>

              <p>
                <b>
                  8. Alterações nos Termos
                </b>
              </p>

              <p>
                Podemos atualizar estes Termos de Uso periodicamente. Qualquer alteração será comunicada através do
                nosso
                site. Recomendamos que você revise os Termos de Uso regularmente para se manter informado sobre nossas
                práticas.
              </p>

              <p>
                <b>
                  9. Contato
                </b>
              </p>

              <p>
                Para dúvidas ou solicitações relacionadas a estes Termos de Uso, entre em contato conosco pelo email:
                <a href="mailto:privacidade@igoal.com.br">privacidade@igoal.com.br</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="form" id="simule-agora" :class="step === 3 || step === 4 ? 'd-none' : ''">
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
              <div v-if="!isNameValid && formData.nome !== ''" class="text-danger">Nome inválido.
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
              <input class="form-control p-2" v-model="formData.birthdate" id="birthdate" type="text"
                placeholder="Data de nascimento" @input="mascaraData" maxlength="10" required />

              <input class="form-control p-2" id="address_postal_code" v-model="formData.address_postal_code" type="tel"
                placeholder="CEP" maxlength="9" @input="mascaraCEP" required />
            </div>

            <div class="input-group mb-3">
              <input class="form-control p-2" v-model="formData.renda" id="renda" type="text" placeholder="Renda"
                maxlength="13" @input="mascaraRenda" required />
            </div>

            <div class="checkboxes-container mb-3 d-flex flex-column gap-2 align-items-center">
              <div class="form-check d-flex gap-2 justify-content-start align-items-center">
                <input class="form-check-input" id="terms" v-model="formData.terms" type="checkbox" value=""
                  name="terms" required />
                <label class="form-check-label">
                  Ao acessar/utilizar este site, você aceita as condições dos

                  <button type="button" class="btn-link bg-transparent border-0 text-blue
                  " data-bs-toggle="modal" data-bs-target="#termos-de-uso">
                    Termos de uso
                  </button>
                </label>
              </div>
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
                  <option value="" disabled>Selecionar</option>
                  <option :value="true">Sim</option>
                  <option :value="false">Não</option>
                </select>
              </div>
            </div>

            <div class="d-flex flex-column gap-2 mb-3">
              <select class="form-select" id="professional_class_id" v-model="formData.professional_class_id" required>
                <option value="" disabled>Área de Atuação</option>
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
                  <select class="form-select" id="device_brand" v-model="formData.device.brand"
                    @change="setBrand(formData.device.brand)" required>
                    <option value="" disabled>Marca</option>
                    <option v-for="(juvoDeviceBrand, index) in juvoDeviceBrands" :key="index"
                      :value="juvoDeviceBrand.id">
                      {{ juvoDeviceBrand.value }}
                    </option>
                  </select>
                </div>

                <div class="device-model d-flex flex-column gap-2 justify-content-between">
                  <select :disabled="disableModels" :loading="loadingModels" class="form-select" id="device_model"
                    v-model="formData.device.model" required>
                    <option value="" disabled>Modelo</option>
                    <option v-for="(model, index) in juvoDeviceModels" :key="index" :value="model.commercialCode">
                      {{ model.commercialName }}
                    </option>
                  </select>
                </div>
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
        </form>
      </div>

      <!-- Step 3 Additional data -->
      <div v-if="step === 3" class="form additional-form-data" :class="step === 3 ? 'd-flex' : 'd-none'">
        <div v-if="!juvoData?.data?.propositions?.offers && !juvoData?.data?.propositions?.offers.length > 0"
          class="offers d-flex flex-column gap-2 align-items-center">
          <span class="fs-2 text-center">
            Melhor oferta disponível
          </span>

          <div class="offer-details d-flex gap-5">
            <div class="first-value">
              <div class="fs-6 text-center">Quantidade de Parcelas: <b style="color:#dd3e84">{{
                juvoData?.data?.propositions?.offers[0]?.installmentQuantity }}</b>
              </div>
              <div class="fs-6 text-center">Taxa de Juros (%): <b style="color:#dd3e84">{{
                juvoData?.data?.propositions?.offers[0]?.rateInPercentage }}%</b></div>
            </div>
            <div class="second-value">
              <div class="fs-6 text-center">Valor Mínimo do Empréstimo: R$ <b style="color:#dd3e84">{{
                juvoData?.data?.propositions?.offers[0]?.minLoanAmount.toFixed(2) }}</b></div>
              <div class="fs-6 text-center">Valor Máximo do Empréstimo: R$ <b style="color:#dd3e84">{{
                juvoData?.data?.propositions?.offers[0]?.maxLoanAmount.toFixed(2) }}</b></div>
            </div>
          </div>
        </div>

        <form @submit.prevent="submitAdditionalData({ additionalFormData })">
          <div class="form-data">
            <div class="input-group mb-3">
              <input class="form-control p-2" id="documentNumber" v-model="additionalFormData.documentNumber"
                type="text" placeholder="CPF" @input="mascaraAdditionalCPF" maxlength="14" required />

              <input class="form-control p-2" id="payday" v-model="additionalFormData.payday" type="number" min="1"
                max="30" placeholder="Dia do pagamento" required />
            </div>


            <div class="input-group mb-3">
              <select class="form-select p-2" id="type" v-model="additionalFormData.bankDetails.bankCode" required>
                <option value="" disabled>Banco</option>
                <option v-for="(banco, index) in juvoBankList" :key="index" :value="banco.code">
                  {{ banco.value }}
                </option>
              </select>

              <select class="form-select p-2" id="type" v-model="additionalFormData.bankDetails.type" required>
                <option value="" disabled>Tipo de conta</option>
                <option value="CHECKING">Conta Corrente</option>
                <option value="SAVINGS">Conta Poupança</option>
              </select>
            </div>

            <div class="input-group mb-3">
              <input class="form-control p-2" id="accountNumber" v-model="additionalFormData.bankDetails.accountNumber"
                type="text" placeholder="Número da conta" maxlength="13" @input="maskAccountNumber" required />
              <input class="form-control p-2" id="agencyNumber" v-model="additionalFormData.bankDetails.agencyNumber"
                type="text" placeholder="Agência" maxlength="10" @input="validateNumber('agencyNumber')" required />
            </div>

            <div class="mb-3">
              <input class="form-control p-2" id="owner" v-model="additionalFormData.bankDetails.owner" type="text"
                placeholder="Nome do Titular da Conta" required />
              <div v-if="!isAdditionalNameValid && additionalFormData.bankDetails.owner !== ''" class="text-danger">Nome
                inválido.
              </div>
            </div>

            <div class="input-group mb-3">
              <select class="form-select p-2" id="type" v-model="additionalFormData.address.state" required>
                <option value="" disabled>Estado</option>
                <option v-for="(estado, index) in juvoStateList" :key="index" :value="estado.uf">
                  {{ estado.value }}
                </option>
              </select>
              <input class="form-control p-2" id="city" v-model="additionalFormData.address.city" type="text"
                placeholder="Cidade" required />
            </div>

            <div class="mb-3">
              <input class="form-control p-2" id="address" v-model="additionalFormData.address.address" type="text"
                placeholder="Endereço" required />
            </div>

            <div class="input-group mb-3">
              <input class="form-control p-2" id="postalCode" v-model="additionalFormData.address.postalCode" type="tel"
                placeholder="CEP" maxlength="9" @input="mascaraCEP" required />
              <input class="form-control p-2" id="neighborhood" v-model="additionalFormData.address.neighborhood"
                type="text" placeholder="Bairro" required />
              <input class="form-control p-2" id="number" v-model="additionalFormData.address.number" type="text"
                placeholder="Número" @input="validateNumber('number')" required />
            </div>

            <div class="mb-3">
              <select class="form-select p-2" id="educationLevel"
                v-model="additionalFormData.personalInfo.educationLevel" required>
                <option value="" disabled>Nível de Educação</option>
                <option value="1">Ensino Fundamental</option>
                <option value="2">Ensino Médio</option>
                <option value="3">Ensino superior</option>
                <option value="4">Mestrado</option>
                <option value="5">Doutorado</option>
                <option value="6">Pós-Graduação</option>
              </select>
            </div>

            <div class="input-group mb-3">
              <select class="form-select p-2" id="maritalStatus" v-model="additionalFormData.personalInfo.maritalStatus"
                required>
                <option value="" disabled>Estado Civil</option>
                <option v-for="(juvoMaritalStatus, index) in juvoMaritalStatusList" :key="index"
                  :value="juvoMaritalStatus.id">
                  {{ juvoMaritalStatus.value }}
                </option>
              </select>

              <select class="form-select p-2" id="gender" v-model="additionalFormData.personalInfo.gender" required>
                <option value="" disabled>Gênero</option>
                <option value="MALE">Masculino</option>
                <option value="FEMALE">Feminino</option>
                <option value="OUTRO">Outro</option>
              </select>
            </div>

            <div class="button-container d-flex justify-content-center">
              <button class="btn submit-btn text-white border-0" :disabled="juvoLoading">
                <span v-if="!juvoLoading">Contratar</span>

                <div v-if="juvoLoading" class="spinner-border spinner-border-sm" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- Step 4 Sucesso -->
      <div class="form success-form" :class="step === 4 ? 'd-flex' : 'd-none'">
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
        professional_class_id: '',
        marital_status_id: '',
        address_postal_code: '',
        politically_exposed_person: '',
        terms: false,
        device: {
          model: '',
          brand_option: '',
          brand: '',
          os_version: ''
        },
      },
      additionalFormData: {
        documentNumber: '',
        payday: null,
        bankDetails: {
          accountNumber: '',
          agencyNumber: '',
          bankCode: '',
          owner: '',
          type: ''
        },
        address: {
          address: '',
          city: '',
          neighborhood: '',
          number: '',
          postalCode: '',
          state: '',
        },
        personalInfo: {
          educationLevel: '',
          maritalStatus: '',
          gender: ''
        }
      },
      loading: false,
      token: null,
    };
  },
  computed: {
    ...mapState(useJuvo, ['juvoData', 'juvoLoading', 'juvoError', 'juvoProfessionList', 'juvoMaritalStatusList', 'juvoDeviceInfo', 'juvoDeviceModels', 'juvoDeviceBrands', 'brand', 'loadingModels', 'disableModels', 'juvoBankList', 'juvoStateList', 'juvoAdditionalFormData']),
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
      return /^[a-zA-ZÀ-ÿ ]+$/.test(this.formData.nome) && this.formData.nome.trim().split(' ').length >= 2;
    },
    isAdditionalNameValid() {
      return /^[a-zA-ZÀ-ÿ ]+$/.test(this.additionalFormData.bankDetails.owner) && this.additionalFormData.bankDetails.owner.trim().split(' ').length >= 2;
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
      if (this.formData.terms === true && this.formData.nome !== '' && this.formData.email !== '' && this.formData.celular !== '' && this.formData.cpf !== '' && this.formData.birthdate !== '' && this.formData.cep !== '' && this.formData.renda !== '') {
        return true
      }
      return false
    },
  },
  methods: {
    ...mapActions(useJuvo, ['getToken', 'getProfessionalList', 'getMaritalStatus', 'getDeviceInfo', 'getDeviceModels', 'getDeviceBrands', 'setBrand', 'sendForm', 'getBanksList', 'getStateList', 'sendAdditionalFormData', 'saveIgoalData']),
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
      let value = this.formData.renda.replace(/\D/g, ''); // Remove todos os não dígitos

      value = Number(value / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });

      this.formData.renda = value;
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
    mascaraAdditionalCPF() {
      let formattedCPF = this.additionalFormData.documentNumber;

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

      this.additionalFormData.documentNumber = formattedCPF;
    },
    mascaraCEP(event) {
      let value = event.target.value.replace(/\D/g, '');
      value = value.replace(/(\d{5})(\d)/, '$1-$2');
      this.formData.address_postal_code = value;
      this.additionalFormData.address.cep = value;
    },
    mascaraData(event) {
      let value = event.target.value.replace(/\D/g, '');

      value = value.replace(/(\d{2})(\d)/, '$1/$2');
      value = value.replace(/(\d{2})(\d)/, '$1/$2');

      if (value.length > 10) {
        value = value.slice(0, 10);
      }

      this.formData.birthdate = value;

      this.validarData();
    },
    validarData() {
      let parts = this.formData.birthdate.split('/');
      if (parts.length === 3) {
        let day = parseInt(parts[0], 10);
        let month = parseInt(parts[1], 10);
        let year = parts[2];

        // Verifica se o ano possui exatamente 4 dígitos
        if (year.length === 4) {
          year = parseInt(year, 10);

          const maxDay = 31;
          const maxMonth = 12;
          let today = new Date();

          // Validar o dia e mês
          if (day < 1 || day > maxDay || month < 1 || month > maxMonth) {
            day = Math.min(Math.max(day, 1), maxDay);
            month = Math.min(Math.max(month, 1), maxMonth);

            this.formData.birthdate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
          }

          let minYear = today.getFullYear() - 100;

          // Verificar se o ano está dentro dos limites permitidos
          if (year < minYear || year > today.getFullYear()) {
            alert('Por favor, insira um ano válido')
            this.formData.birthdate = '';
          }

          let minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
          let selectedDate = new Date(year, month - 1, day);

          // Verifica se a data é válida (idade mínima de 18 anos)
          if (selectedDate >= today || selectedDate <= new Date(today.getFullYear() - 100, today.getMonth(), today.getDate())) {
            this.formData.birthdate = '';

            if (selectedDate >= today) {
              alert('A data de nascimento não pode ser posterior à data atual.');
            }
          } else if (selectedDate >= minDate) {
            this.formData.birthdate = '';

            alert('Empréstimos disponíveis apenas para maiores de 18 anos');
          }
        }
      }
    },
    validateAll() {
      const validations = {
        name: this.isNameValid,
        email: this.isEmailValid,
        celular: this.isCelularValid,
        cpf: this.isCpfValid,
      };

      const isValid = Object.values(validations).every(value => value);
      if (!isValid) {
        console.error('Por favor, verifique suas informações:', validations);
      }
      return isValid;
    },
    validateName() {
      const validations = {
        name: this.isAdditionalNameValid,
      };

      const isValid = Object.values(validations).every(value => value);
      if (!isValid) {
        console.error('Por favor, verifique suas informações:', validations);
      }
      return isValid;
    },
    formatarDataParaEnvio(data) {
      const partes = data.split('/');
      if (partes.length === 3) {
        const dia = partes[0];
        const mes = partes[1];
        const ano = partes[2];
        return `${ano}-${mes}-${dia}`;
      }
      return data;
    },
    async submitData(formData) {
      this.formData.birthdate = this.formatarDataParaEnvio(this.formData.birthdate);
      const renda = (Number(this.formData.renda.replace(/\D/g, '')) / 100);
      this.formData.renda = renda.toString();

      if (this.validateAll()) {
        await this.saveIgoalData(formData);

        const isSuccess = this.juvoData.isSuccess;
        const hasOffers = this.juvoData.data?.propositions?.offers.length > 0;

        if (hasOffers) {
          this.step = 3; //Tela Formulário adicional e ofertas
        } else if (isSuccess) {
          this.step = 4; //Tela de Sucesso
        }
      } else {
        alert('Por favor, preencha suas informações corretamente');
      }
    },
    async submitAdditionalData(additionalFormData) {
      additionalFormData.additionalFormData.personalInfo.maritalStatus = Number(this.additionalFormData.personalInfo.maritalStatus)
      additionalFormData.additionalFormData.personalInfo.educationLevel = Number(this.additionalFormData.personalInfo.educationLevel)

      if (this.validateName()) {
        const isSuccess = await this.sendAdditionalFormData(additionalFormData);

        if (isSuccess && this.juvoAdditionalFormData?.data?.redirectUrl) {
          window.location.href = this.juvoAdditionalFormData?.data?.redirectUrl;
        } else if (isSuccess) {
          this.step = 4;
        } else {
          alert('Erro nas informações. Por favor, entre em contato com nosso atendimento para atualizar seus dados')
        }
      } else {
        alert('Por favor, preencha o nome corretamente');
      }
    },
    updateAdditionalFormData() {
      this.additionalFormData.documentNumber = this.formData.cpf;
      this.additionalFormData.address.postalCode = this.formData.address_postal_code;
      this.additionalFormData.personalInfo.maritalStatus = this.formData.marital_status_id;
    },
    validateNumber(field) {
      let value = this.additionalFormData[field] || this.additionalFormData.bankDetails[field] || this.additionalFormData.address[field];

      // Remove non-digit characters
      value = value.replace(/\D/g, "");

      // Update the corresponding field with the formatted value
      if (this.additionalFormData[field] !== undefined) {
        this.additionalFormData[field] = value;
      } else if (this.additionalFormData.bankDetails[field] !== undefined) {
        this.additionalFormData.bankDetails[field] = value;
      } else if (this.additionalFormData.address[field] !== undefined) {
        this.additionalFormData.address[field] = value;
      }
    },
    maskAccountNumber() {
      let value = this.additionalFormData.bankDetails.accountNumber;

      // Remove non-digit characters
      value = value.replace(/\D/g, "");

      // Apply the mask: everything except the last digit is considered part of the account number
      if (value.length > 1) {
        value = value.slice(0, -1) + '-' + value.slice(-1);
      }

      this.additionalFormData.bankDetails.accountNumber = value;
    },
  },
  async mounted() {
    await this.getToken();

    this.getProfessionalList();
    this.getMaritalStatus();
    this.getDeviceInfo();
    this.getDeviceBrands();
    this.getBanksList();
    this.getStateList();
  },
  watch: {
    formData: {
      handler(newVal) {
        this.updateAdditionalFormData();
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
::placeholder {
  color: #000;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="tel"]:focus,
input[type="date"]:focus,
input[type="number"]:focus,
select:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.25rem rgba(221, 62, 131, 0.89);
}

select option {
  background: rgba(255, 255, 255, 0.103);
  color: #000;
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

    .additional-form-data {
      flex-direction: column;
      gap: 20px;
      justify-content: center;
      align-items: center;
      height: 816px;
      margin-top: 300px;
      position: absolute;
      width: 100%;
      left: 50%;
      transform: translate(-50%);
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
  .button-container .btn {
    font-size: 1rem;
  }

  .labels {
    .subtitle {
      text-align: center;
    }
  }

  .form {
    height: 660px !important;
    min-height: 660px !important;
    margin-top: 55px;

    &.additional-form-data {
      margin-top: 205px !important;
      height: 900px !important;

      .offers {
        .offer-details {
          flex-direction: column;
          gap: 2px !important;
        }
      }
    }

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
}
</style>
