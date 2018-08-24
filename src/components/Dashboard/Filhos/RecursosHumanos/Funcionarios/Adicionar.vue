<template>
  <div class="box">
    <h1 class="title is-5">Adicionar funcionário</h1>

    <form v-on:submit.prevent="adicionarFuncionario">
      <div class="columns">

        <div class="column">
          <div class="field">
            <label>Nome</label>
            <div class="control">
                <input
                  type="text"
                  class="input is-fullwidth"
                  v-model="funcionario.nome"
                  placeholder="Digite o nome completo"
                />
            </div>
          </div>
        </div>
      </div>

      <div class="columns">

        <div class="column">
          <div class="field">
            <label>Data de nascimento</label>
            <div class="control">
                <input
                  type="date"
                  class="input is-fullwidth"
                  v-model="funcionario.dataNasc"
                  placeholder="Digite uma data de nascimento"
                />
            </div>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label>Alocado</label>
            <div class="control">
                <input
                  type="text"
                  class="input is-fullwidth"
                  v-model="funcionario.alocado"
                  placeholder="Digite um lugar de alocação"
                />
            </div>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label>Função</label>
            <div class="control">
                <input
                  type="text"
                  class="input is-fullwidth"
                  v-model="funcionario.funcao"
                  placeholder="Digite uma funçao"
                />
            </div>
          </div>
        </div>

      </div>

      <div class="columns">

        <div class="column">
          <div class="field">
            <label>Vale transporte</label>
            <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="funcionario.valeTransporte">
                    <option value="true">Possui</option>
                    <option value="false">Não possui</option>
                  </select>
                </div>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label>Vale refeição</label>
            <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="funcionario.valeRefeicao">
                    <option value="true">Possui</option>
                    <option value="false">Não possui</option>
                  </select>
                </div>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label>Status do funcionário</label>
            <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="funcionario.statusFuncionario">
                    <option value="1">Aguardando</option>
                    <option value="2">Admitido</option>
                    <option value="3">Demitido</option>
                    <option value="4">Aprovado</option>
                    <option value="5">Rejeitado</option>
                  </select>
                </div>
            </div>
          </div>
        </div>

      </div>

      <div class="columns">

        <div class="column">
          <div class="field">
            <label>Horário de trabalho</label>
            <div class="control">
                <input
                  type="text"
                  class="input is-fullwidth"
                  v-model="funcionario.horarioDeTrabalho"
                  placeholder="Digite um horário de trabalho"
                />
            </div>
          </div>

        </div>

      </div>

      <button type="submit" class="button is-warning inline-block">Adicionar</button>
    </form>

  </div>
</template>

<script>
export default {
  name: 'AdicionarFuncionario',

  data: () => ({
    funcionario: {
      nome: '',
      dataNasc: '',
      alocado: '',
      funcao: '',
      valeTransporte: true,
      valeRefeicao: true,
      horarioDeTrabalho: '',
      statusFuncionario: 1
    },
  }),

  methods: {
    adicionarFuncionario() {
      let erros = 0;
      const vm = this;

      Object.keys(vm.funcionario).map(function verificarCampos(chave) {
        if (vm.funcionario[chave] === '') {
          vm.openToast('Preencha todos os campos!');
          erros += 1;
        }
      });

      if(erros === 0) {
        this.toggleLoad();
        this.$http.post(`${process.env.API}/funcionarios/inserirFuncionario`, this.funcionario, {
          headers: { Authorization: localStorage.getItem('USER_TOKEN') },
        })
        .then((res) => {
          this.toggleLoad();
          this.openToast('Funcionário cadastrado com sucesso!');
        }, () => {
          this.toggleLoad();
          this.openToast();
        });
      }
    }
  },
};
</script>
