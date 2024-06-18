import { defineStore } from 'pinia'

const baseUrl = 'https://gateway.juvocredito-dev.com.br/services/bff_partner'
const partnerToken = 'OlAZhhILOX8PtwzkcJcKeIlJ5SnsDULP'

export const useJuvo = defineStore('juvo', {
  state: () => ({
    juvoData: null,
    juvoLoading: false,
    juvoError: null,
    token: null,
    juvoProfessionList: [],
    juvoMaritalStatusList: [],
    juvoDeviceInfo: null,
    juvoDeviceModels: {},
    juvoDeviceBrands: [],
    brand: null,
    loadingModels: false,
    disableModels: true,
    juvoAdditionalFormData: null,
    juvoBankList: null,
    juvoStateList: null,
  }),
  actions: {
    setBrand(value) {
      this.brand = value;
      this.loadingModels = true;
      this.getDeviceModels();
    },
    async getToken() {
      try {
        const response = await fetch(`${baseUrl}/auth/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ secret: partnerToken })
        })

        const { data } = await response.json()
        this.token = data.access_token
      } catch (error) {
        // TODO: implementar this.error do token e parar as outras solicitações até esse dar true
        console.error('Erro ao obter token:', error)
      }
    },
    async getProfessionalList() {
      try {
        const response = await fetch(`${baseUrl}/auxiliary/professionalClass`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`
          },
        })

        const { data } = await response.json()
        this.juvoProfessionList = data;
      } catch (error) {
        console.error('Erro ao obter lista de profissões:', error)
      }
    },
    async getMaritalStatus() {
      try {
        const response = await fetch(`${baseUrl}/auxiliary/maritalStatus`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`
          },
        })

        const { data } = await response.json()
        this.juvoMaritalStatusList = data;
      } catch (error) {
        console.error('Erro ao obter lista de estado civil:', error)
      }
    },
    async getDeviceInfo() {
      try {
        const response = await fetch(`${baseUrl}/device/info`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`
          },
        })

        const { data } = await response.json()
        this.juvoDeviceInfo = data;
        this.brand = data.brand;
      } catch (error) {
        console.error('Erro ao obter lista de estado civil:', error)
      }
    },
    async getDeviceModels() {
      try {
        const response = await fetch(`${baseUrl}/device/models/${this.brand}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`
          },
        })

        const { data } = await response.json()
        this.juvoDeviceModels = data;
      } catch (error) {
        console.error('Erro ao obter lista de dispositivos:', error)
      } finally {
        this.loadingModels = false;
        this.disableModels = false;
      }
    },
    async getDeviceBrands() {
      try {
        const response = await fetch(`${baseUrl}/auxiliary/deviceBrands`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`
          },
        })

        const { data } = await response.json()
        this.juvoDeviceBrands = data;
      } catch (error) {
        console.error('Erro ao obter lista de marcas disponíveis:', error)
      }
    },
    async getBanksList() {
      try {
        const response = await fetch(`${baseUrl}/auxiliary/banks`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`
          },
        })

        const { data } = await response.json()
        this.juvoBankList = data;
      } catch (error) {
        console.error('Erro ao obter lista de bancos disponíveis:', error)
      }
    },
    async getStateList() {
      try {
        const response = await fetch(`${baseUrl}/auxiliary/provinceOptions`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`
          },
        })

        const { data } = await response.json()
        this.juvoStateList = data;
      } catch (error) {
        console.error('Erro ao obter lista de estados disponíveis:', error)
      }
    },
    async sendForm({ formData }) {
      this.juvoLoading = true;

      const requestData = {
        full_name: formData.nome,
        email: formData.email,
        address_postal_code: formData.address_postal_code,
        birthdate: formData.birthdate,
        cpf_number: formData.cpf.replace(/\D/g, ''),
        gross_income: formData.renda,
        professional_class_id: Number(formData.professional_class_id),
        marital_status_id: Number(formData.marital_status_id),
        mobile_phone: formData.celular.replace(/\D/g, ''),
        device: {
          model: formData.device.model,
          brand_option: this.brand,
          brand: this.brand,
          os_version: this.juvoDeviceInfo.osVersion
        },
        terms: formData.terms,
        politically_exposed_person: formData.politically_exposed_person
      }

      try {
        const response = await fetch(`${baseUrl}/simulation/basic-data?partner=igoal`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`
          },
          body: JSON.stringify(requestData)
        })

        this.juvoData = await response.json();

        if (this.juvoData?.isSuccess === false && this.juvoData?.message.includes('Este telefone já está cadastrado em nosso sistema. Por favor faça o login ou recupere sua senha.')) {
          alert('Este telefone já está cadastrado em nosso sistema. Por favor faça o login ou recupere sua senha.');
        }

        if (this.juvoData?.isSuccess === false && this.juvoData?.message.includes('Este CPF já está vinculado a outro e-mail')) {
          alert('Este CPF já está vinculado a outro e-mail, Por favor, entre em contato com nosso atendimento para atualizar seus dados.')
        }

        if (this.juvoData?.validationErrors?.body?.cpf_number?._errors?.length > 0) {
          alert('Por favor preencha um CEP válido.');
        }

        if(this.juvoData?.isSuccess === false && this.juvoData?.message.includes('Esse cpf e email já estão registrados')) {
          alert('Esse CPF e E-mail já estão registrados em nosso sistema')
        }

        if(this.juvoData?.isSuccess === false && this.juvoData?.message.includes('CPF')) {
          alert('CPF Inválido')
        }


        if (this.juvoData?.validationErrors?.body?.address_postal_code?._errors?.length > 0) {
          alert('Por favor preencha um CEP válido.');
        }
      } catch (error) {
        this.juvoError = true
        console.error('Erro ao enviar o formulário:', error)
        alert('Erro ao enviar o formulário. Tente novamente.')
      } finally {
        this.juvoLoading = false
      }
    },
    async sendAdditionalFormData({ additionalFormData }) {
      this.juvoLoading = true;

      try {
        const response = await fetch(`${baseUrl}/v2/simulation/save-additional-customer-info?partner=igoal`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`
          },
          body: JSON.stringify(additionalFormData)
        })

        this.juvoAdditionalFormData = await response.json();

        return this.juvoAdditionalFormData.isSuccess;
      } catch (error) {
        this.juvoError = true
        console.error('Erro ao enviar o formulário:', error)
        alert('Erro ao enviar o formulário. Tente novamente.')
      } finally {
        this.juvoLoading = false
      }
    },
  }
})
