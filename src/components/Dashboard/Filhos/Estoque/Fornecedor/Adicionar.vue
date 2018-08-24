<template>
  <div class="fornecedor">
    <h1 class="title is-5">Adicionar fornecedor</h1>

    <form v-on:submit.prevent="adicionarFornecedor">
      <div class="columns">

        <div class="column">
          <div class="field">
            <label>Nome Fantasia</label>
            <div class="control">
                <input
                  type="text"
                  class="input is-fullwidth"
                  v-model="fornecedor.nomeFantasia"
                  placeholder="Digite um nome fantasia"
                />
            </div>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label>Razão Social</label>
            <div class="control">
                <input
                  type="text"
                  class="input is-fullwidth"
                  v-model="fornecedor.razaoSocial"
                  placeholder="Digite uma razão social"
                />
            </div>
          </div>
        </div>

      </div>

      <div class="columns">

        <div class="column">
          <div class="field">
            <label>Endereço</label>
            <div class="control">
                <input
                  type="text"
                  class="input is-fullwidth"
                  v-model="fornecedor.endereco"
                  placeholder="Digite uma Endereço"
                />
            </div>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label>CNPJ</label>
            <div class="control">
                <the-mask
                  type="text"
                  class="input is-fullwidth"
                  v-model="fornecedor.cnpj"
                  pattern=".{18}"
                  title="O número de CNPJ deve conter obrigatoriamente todos os dígitos!"
                  :mask="['##.###.###/####-##']"
                  placeholder="99.999.999/9999-99"
                />
            </div>
          </div>
        </div>

      </div>

      <div class="columns">
        <div class="column">
          <div class="field">
            <label>Nome do responsável</label>
            <div class="control">
                <input
                  type="text"
                  class="input is-fullwidth"
                  v-model="fornecedor.nomeResponsavel"
                  placeholder="Digite um nome"
                />
            </div>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label>E-mail</label>
            <div class="control">
                <input
                  type="email"
                  class="input is-fullwidth"
                  v-model="fornecedor.email"
                  placeholder="Digite uma email"
                />
            </div>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label>Telefone</label>
            <div class="control">
                <the-mask
                  type="text"
                  class="input is-fullwidth"
                  v-model="fornecedor.telefone"
                  pattern=".{14,15}"
                  title="O número de telefone deve conter 10 ou 11 dígitos (com DDD)"
                  :mask="['(##) ####-####', '(##) #####-####']"
                  placeholder="Digite um telefone"
                />
            </div>
          </div>
        </div>

      </div>

      <button type="submit" class="button is-warning inline-block">Adicionar</button>
      <router-link
        :to="{ path: '/fornecedor' }">
        <button
            type="button"
            class="button inline-block">
            Cancelar
        </button>
      </router-link>


    </form>

  </div>
</template>

<script>
export default {
  name: 'AdicionarFornecedor',

  data: () => ({
    fornecedor: {
      nomeFantasia: '',
      razaoSocial: '',
      endereco: '',
      cnpj: '',
      nomeResponsavel: '',
      email: '',
      telefone: '',
    },
  }),

  methods: {
    adicionarFornecedor: function adicionarFornecedor() {
      if (
        this.fornecedor.nomeFantasia    === '' ||
        this.fornecedor.razaoSocial     === '' ||
        this.fornecedor.endereco        === '' ||
        this.fornecedor.cnpj            === '' ||
        this.fornecedor.nomeResponsavel === '' ||
        this.fornecedor.email           === '' ||
        this.fornecedor.telefone  === ''
      ) {

        this.openToast('Preencha todos os campos!');

      } else {
        this.toggleLoad();
        this.$http.post(`${process.env.API}/fornecedores/salvar`, this.fornecedor, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('USER_TOKEN') },
        })
        .then((res) => {
          this.toggleLoad();
          this.openToast('Fornecedor cadastrado com sucesso!');
        }, () => {
          this.toggleLoad();
          this.openToast();
        });
      }
    }
  },
};
</script>
