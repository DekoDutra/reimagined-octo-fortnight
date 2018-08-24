<template>
    <div class="box">
        <h1 class="title is-5">Gerenciar funcionários</h1>

        <div :class="{ modal: true, 'is-active': modal }">
        <div class="modal-background"></div>
            <div class="modal-card is-large">
                <header class="modal-card-head">
                    <p class="modal-card-title">{{ this.$route.name }}</p>
                    <router-link :to="{ path: '/rh/funcionarios/gerenciar' }" replace>
                        <button
                            class="delete"
                            @click="modal=false">
                        </button>
                    </router-link>
                </header>
                <section class="modal-card-body">

                    <div v-if="$route.params.acao === 'ver'">
                      <hr>

                      <h1 class="title is-6"></h1>
                      <table class="table">
                        <thead class="thead">
                          <th>Telefone</th>
                          <th></th>
                        </thead>

                        <tbody>
                          <tr >
                            <td :id="{}">(88) 99937-7113</td>
                            <td>
                              <button class="button is-small is-success">
                                <fa icon="edit"></fa>
                                Editar
                              </button>

                              <button class="button is-small is-danger">
                                <fa icon="trash"></fa>
                                Excluir
                              </button>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <div class="field">
                                <div class="control">
                                    <input
                                      type="text"
                                      class="input is -fullwidth"
                                      v-model="telefone"
                                      placeholder="Digite o telefone"
                                    />
                                </div>
                              </div>
                            </td>

                            <td>
                              <button class="button is-success">Adicionar número</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div v-else-if="$route.params.acao === 'editar'">
                        <form v-on:submit.prevent="editarFuncionario">

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

                            <button type="submit" class="button is-warning inline-block">Editar</button>
                        </form>
                    </div>

                    <div v-else-if="$route.params.acao === 'excluir'">
                        <p>Tem certeza que deseja remover este funcionário?</p>

                        <br>

                        <button
                            @click="excluirFuncionario($route.params.id)"
                            class="button is-danger inline-block">
                            Sim, excluir
                        </button>
                        <router-link :to="{ path: '/rh/funcionario/gerenciar' }" replace>
                            <button
                                class="button inline-block"
                                @click="modal=false">
                                Não, cancelar!
                            </button>
                        </router-link>
                    </div>

                    <div v-else>Um erro ocorreu, por favor contacte o administrador!</div>
                </section>
                <footer class="modal-card-foot"></footer>
            </div>
        </div>

        <div
            class="field"
            v-if="funcionarios.length > 1">
            <div class="control">
                <input
                    type="search"
                    class="input is-fullwidth"
                    v-model="busca"
                    placeholder="Digite uma busca nesta tabela"
                />
            </div>
        </div>

        <div
          v-if="funcionarios.length === 0"
          class="notification is-danger">
          Nenhum funcionário adicionado!
        </div>

        <table v-else class="table is-hoverable is-bordered is-fullwidth">
            <thead class="thead">
                <th><a @click="ordenarTabela('nome')">Nome <fa icon="sort" /></a></th>
                <th><a @click="ordenarTabela('dataNasc')">Data de nascimento <fa icon="sort" /></a></th>
                <th><a @click="ordenarTabela('alocado')">Alocado <fa icon="sort" /></a></th>
                <th><a @click="ordenarTabela('funcao')">Função <fa icon="sort" /></a></th>
                <th><a @click="ordenarTabela('valeTransporte')">Vale transporte <fa icon="sort" /></a></th>
                <th><a @click="ordenarTabela('valeRefeicao')">Vale refeição <fa icon="sort" /></a></th>
                <th><a @click="ordenarTabela('statusFuncionario')">Status do funcionário <fa icon="sort" /></a></th>
                <th><a @click="ordenarTabela('horarioTrabalho')">Horário de trabalho <fa icon="sort" /></a></th>
                <th></th>
            </thead>

            <tbody class="tbody">
                <tr v-for="funcionario in dadosCarregados" :key="funcionario.id">
                    <td>{{ funcionario.nome }}</td>
                    <td>{{ funcionario.dataNasc }}</td>
                    <td>{{ funcionario.alocado }}</td>
                    <td>{{ funcionario.funcao }}</td>
                    <td>{{ funcionario.valeTransporte }}</td>
                    <td>{{ funcionario.valeRefeicao }}</td>
                    <td>{{ funcionario.statusFuncionario }}</td>
                    <td>{{ funcionario.horarioTrabalho }}</td>
                    <td>
                        <button class="button is-small is-success" @click="carregar('editar', funcionario.id)">
                            <fa icon="edit"></fa>
                            Editar
                        </button>

                        <button class="button is-small is-danger" @click="carregar('excluir', funcionario.id)">
                            <fa icon="trash"></fa>
                            Excluir
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <nav
            class="pagination"
            v-if="funcionarios.length > pagina.tamanho">
            <a
                class="pagination-previous"
                @click="(pagina.atual !== 1) ? pagina.atual-- : ''"
                :disabled="pagina.atual === 1">
                Página anterior
            </a>
            <a
                class="pagination-next"
                @click="Math.ceil(funcionarios.length / pagina.tamanho) !== pagina.atual ? pagina.atual++ : ''"
                :disabled="pagina.atual * pagina.tamanho === funcionarios.length">
                Próxima página
            </a>
        </nav>
    </div>
</template>
<script>
import strMask from 'string-mask';
export default {
  name: 'GerenciarFuncionarios',

  data: () => ({
    modal: false,
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
    funcionarios: [],

    ordenar: {
      atual: '',
      direcao: 'desc',
    },

    pagina: {
      atual: 1,
      tamanho: 10,
    },

    busca: '',

    telefone: '',
    telefones: [],
  }),

  mounted() {
    this.getFuncionarios();
  },

  computed: {
    dadosCarregados(){
      let buscar = this.busca.toLowerCase();

      let carregarBusca = this.funcionarios.filter((res, index) => {
        let valoresRes = [];
        if(buscar === '') return true
        else {
            let verificarExistenciaDeBusca = this.findInObject(res, buscar);
            if(verificarExistenciaDeBusca > 0) return true;
            else return false;
        }
        return false;
      });

      let carregados = carregarBusca.filter((row, index) => {
        let start = (this.pagina.atual-1)*this.pagina.tamanho;
        let end = this.pagina.atual*this.pagina.tamanho;
        if(index >= start && index < end) return true;
      });

      return carregados.sort((ant, prox) => {
        let modifier = 1;
        if(this.ordenar.direcao === 'desc') modifier = -1;
        if(ant[this.ordenar.atual] < prox[this.ordenar.atual]) return -1 * modifier;
        if(ant[this.ordenar.atual] > prox[this.ordenar.atual]) return 1 * modifier;
        return 0;
      });
    }
  },

  methods: {

    ordenarTabela(elem){
      this.ordenar.atual = elem;
      this.ordenar.direcao = (this.ordenar.direcao === 'asc') ? 'desc' : 'asc';
    },

    getFuncionarios(){
      this.toggleLoad();
      this.$http.get(`${process.env.API}/funcionarios/listar-todos`, {
          headers: { Authorization: localStorage.getItem('USER_TOKEN') },
      })
      .then((res) => {
          this.toggleLoad();
          this.funcionarios = res.body.data;
      }, () => {
        this.toggleLoad();
        this.openToast();
      });
    },

    carregar(acao, id) {
      this.toggleLoad();
      this.$http.get(`${process.env.API}/funcionarios/${id}`, {
          headers: { Authorization: localStorage.getItem('USER_TOKEN') },
      })
      .then((res) => {
        this.funcionario = res.body.data;
        this.$router.replace(`/rh/funcionarios/gerenciar/${acao}/${id}`);
        this.modal = true;
        this.toggleLoad();
      }, () => {
        this.toggleLoad();
        this.openToast();
      });
    },

    editarFuncionario() {
      this.toggleLoad();
      let erros = 0;
      const vm = this;

      Object.keys(vm.funcionario).map(function verificarCampos(chave) {
        if (vm.funcionario[chave] === '') {
          vm.openToast('Preencha todos os campos!');
          erros += 1;
        }
      });

      if(erros === 0) {
        this.$http.put(`${process.env.API}/funcionarios/atualizar`, this.funcionario, {
          headers: { Authorization: localStorage.getItem('USER_TOKEN') },
        })
        .then((res) => {
          this.toggleLoad();
          this.modal = false;
          this.openToast('Funcionário editado!');
          this.getFuncionarios();
        }, (err) => {
          this.toggleLoad();
          this.openToast();
        });
      }
    },

    excluirFuncionario(id){
      this.toggleLoad();
      this.$http.delete(`${process.env.API}/funcionarios/deletar/${id}`, {
        headers: { Authorization: localStorage.getItem('USER_TOKEN') },
      })
      .then((res) => {
        this.toggleLoad();
        this.openToast('Funcionário deletado com sucesso!');
        this.getFuncionarios();
        this.modal = false;
      }, () => {
        this.toggleLoad();
        this.openToast();
      });
    },

    adicionarTelefone(id) {
      // adiciona telefone ao funcionário
    },

    exluirTelefone(id) {
      // exclui telefone do funcionário
    },

    editarTelefone(id) {
      // edita telefone do funcionário
    },
  }
}
</script>
