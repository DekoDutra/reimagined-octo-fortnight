<template>
    <div class="gerenciarFornecedor">
        <h1 class="title is-5">Gerenciar fornecedores</h1>

        <div :class="{ modal: true, 'is-active': modal }">
        <div class="modal-background"></div>
            <div class="modal-card is-large">
                <header class="modal-card-head">
                    <p class="modal-card-title">{{ this.$route.name }}</p>
                    <router-link :to="{ path: '/fornecedor/gerenciar' }" replace>
                        <button
                            class="delete"
                            @click="modal=false">
                        </button>
                    </router-link>
                </header>
                <section class="modal-card-body">
                    <div v-if="this.$route.name === 'Ver fornecedor'">
                        <div class="columns is-pseudotable">
                            <div class="column">
                                <strong>Nome fantasia</strong> {{ fornecedor.nomeFantasia }}
                            </div>

                            <div class="column">
                                <strong>Razão Social</strong> {{ fornecedor.razaoSocial }}
                            </div>
                        </div>

                        <div class="columns is-pseudotable">
                            <div class="column">
                                <strong>Endereço</strong> {{ fornecedor.endereco }}
                            </div>

                            <div class="column">
                                <strong>CNPJ</strong> {{ mascarar(fornecedor.cnpj, '00.000.000/0000-00') }}
                            </div>
                        </div>

                        <div class="columns is-pseudotable">
                            <div class="column">
                                <strong>Responsável</strong> {{ fornecedor.nomeResponsavel }}
                            </div>

                            <div class="column">
                                <strong>Telefone</strong> {{ mascarar(fornecedor.telefone, '(00) 00009-0000') }}
                            </div>

                            <div class="column">
                                <strong>E-mail</strong> {{ fornecedor.email }}
                            </div>
                        </div>
                    </div>

                    <div v-else-if="this.$route.name === 'Editar fornecedor'">
                        <form v-on:submit.prevent="editarFornecedor">
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
                                            :mask="['(##) ####-####', '(##) #####-####']"
                                            placeholder="Digite uma email"
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <button type="submit" class="button is-warning inline-block">Editar</button>
                        </form>
                    </div>

                    <div v-else-if="this.$route.name === 'Excluir fornecedor'">
                        <p>Tem certeza que deseja remover este fornecedor?</p>

                        <br>

                        <button
                            @click="excluirFornecedor($route.params.id)"
                            class="button is-danger inline-block">
                            Sim, excluir
                        </button>
                        <router-link :to="{ path: '/fornecedor/gerenciar' }" replace>
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
            v-if="Object.keys(fornecedores).length > 1">
            <div class="control">
                <input
                    type="search"
                    class="input is-fullwidth"
                    v-model="busca"
                    placeholder="Digite uma busca nesta tabela"
                />
            </div>
        </div>

        <table class="table is-hoverable is-bordered is-fullwidth">
            <thead class="thead">
                <th><a @click="ordenarTabela('nomeFantasia')">Nome fantasia <fa icon="sort" /></a></th>
                <th><a @click="ordenarTabela('cnpj')">CNPJ <fa icon="sort" /></a></th>
                <th><a @click="ordenarTabela('nomeResponsavel')">Responsável <fa icon="sort" /></a></th>
                <th><a @click="ordenarTabela('telefone')">Telefone <fa icon="sort" /></a></th>
                <th></th>
            </thead>

            <tbody class="tbody">
                <tr v-for="fornecedor in dadosCarregados" :key="fornecedor.id">
                    <td><small>{{ fornecedor.nomeFantasia }}</small></td>
                    <td>{{ mascarar(fornecedor.cnpj, '00.000.000/0000-00') }}</td>
                    <td>{{ fornecedor.nomeResponsavel }}</td>
                    <td>{{ mascarar(fornecedor.telefone, '(00) 00009-0000') }}</td>
                    <td>
                        <button class="button is-small" @click="carregar(fornecedor.id, ver)">
                            <fa icon="eye"></fa>
                            Ver mais
                        </button>

                        <button class="button is-small is-success" @click="carregar(fornecedor.id, editar)">
                            <fa icon="edit"></fa>
                            Editar
                        </button>

                        <router-link
                            :to="{ path: `/fornecedor/gerenciar/excluir/${fornecedor.id}` }" replace>
                            <button class="button is-small is-danger" @click="carregar(fornecedor.id, excluir)">
                                <fa icon="trash"></fa>
                                Excluir
                            </button>
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss" scoped>
    .gerenciarFornecedor {
        .is-pseudotable {
            font-size: 14px;
        }
    }
</style>

<script>
import strMask from 'string-mask';
export default {
  name: 'GerenciarFornecedores',

  data: () => ({
    modal: false,
    fornecedor: {
      nomeFantasia: '',
      razaoSocial: '',
      endereco: '',
      cnpj: '',
      nomeResponsavel: '',
      email: '',
      telefone: '',
    },
    fornecedores: [],

    ordenar: {
      atual: '',
      direcao: 'desc',
    },

    pagina: {
      atual: 1,
      tamanho: 10,
    },

    busca: '',
  }),

  mounted() {
    this.getFornecedores();
  },

  computed: {
    dadosCarregados(){
      let buscar = this.busca.toLowerCase();

      let carregados = this.fornecedores.filter((res, index) => {
        let valoresRes = [];
        if(buscar === '') return true
        else {
            let verificarExistenciaDeBusca = this.findInObject(res, buscar);
            if(verificarExistenciaDeBusca > 0) return true;
            else return false;
        }
        return false;
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

    getFornecedores(){
      this.toggleLoad();
      this.$http.get(`${process.env.API}/fornecedores/listar-ativos`, {
          headers: { Authorization: localStorage.getItem('USER_TOKEN') },
      })
      .then((res) => {
          this.toggleLoad();
          this.fornecedores = res.body.data;
      }, () => {
        this.openToast();
      });
    },

    carregar(id,next) {
      this.toggleLoad();
      this.$http.get(`${process.env.API}/fornecedores/buscar-por-id?idFornecedor=${id}`, {
          headers: { Authorization: localStorage.getItem('USER_TOKEN') },
      })
      .then((res) => {
        this.fornecedor = res.body.data;
        this.toggleLoad();
        next(id);
      }, () => {
        this.toggleLoad();
        this.openToast();
      });
    },

    ver(id) {
      this.$router.replace(`/fornecedor/gerenciar/ver/${id}`);
      this.modal = true;
    },

    editar(id) {
      this.$router.replace(`/fornecedor/gerenciar/editar/${id}`);
      this.modal = true;
    },

    excluir(id) {
      this.$router.replace(`/fornecedor/gerenciar/excluir/${id}`);
      this.modal = true;
    },

    editarFornecedor() {
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
        this.$http.put(`${process.env.API}/fornecedores/atualizar`, this.fornecedor, {
          headers: { Authorization: localStorage.getItem('USER_TOKEN') },
        })
        .then((res) => {
          this.modal = false;
          this.openToast('Fornecedor editado!');
          this.getFornecedores();
        }, (err) => {
          this.openToast();
        });
      }
    },

    excluirFornecedor(id){
      this.$http.delete(`${process.env.API}/fornecedores/deletar?idFornecedor=${id}`, {
        headers: { Authorization: localStorage.getItem('USER_TOKEN') },
      })
      .then((res) => {
        this.openToast('Fornecedor deletado com sucesso!');
        this.getFornecedores();
        this.modal = false;
      }, () => {
          this.openToast();
      });
    },

    mascarar(str, mask) {
      return  strMask.apply(str, mask);
    },
  }
}
</script>
