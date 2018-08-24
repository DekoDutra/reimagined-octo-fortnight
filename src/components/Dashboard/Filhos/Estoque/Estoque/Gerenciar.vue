<template>
    <div>
        <div class="gerenciarEstoque box">
            <h1 class="title is-5">Gerenciar estoque</h1>

            <div :class="{ modal: true, 'is-active': modal }">
                <div class="modal-background"></div>
                <div class="modal-card is-large">
                    <header class="modal-card-head">
                        <p class="modal-card-title">
                            {{ this.$route.name }}
                        </p>
                        <router-link :to="{ path: '/estoque/gerenciar' }" replace>
                        <button
                            class="delete"
                            @click="modal=false">
                        </button>
                        </router-link>
                    </header>
                    <section class="modal-card-body">
                        <div v-if="this.$route.name === 'Inserir mais'">
                            <form v-on:submit.prevent="inserirMais($route.params.id)">
                                <div class="columns">
                                    <div class="column">
                                        <div class="field">
                                            <label>Número a adicionar</label>
                                            <div class="control">
                                                <input
                                                    type="number"
                                                    class="input is-fullwidth"
                                                    step="1"
                                                    min="1"
                                                    placeholder="Digite um número"
                                                    v-model="adicionar"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" class="button is-warning inline-block">Inserir</button>
                            </form>
                        </div>

                        <div v-else-if="this.$route.name === 'Dar baixa'">
                            <form v-on:submit.prevent="darBaixa($route.params.id)">
                                <div class="columns">
                                    <div class="column">
                                        <div class="field">
                                            <label>Número a dar baixa</label>
                                            <div class="control">
                                                <input
                                                    type="number"
                                                    class="input is-fullwidth"
                                                    step="1"
                                                    min="1"
                                                    placeholder="Digite um número"
                                                    v-model="baixa"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="columns" v-if="baixa !== ''">
                                    <div class="column notification">
                                        Ao dar baixa {{ baixa }} produtos serão removidos do seu estoque.
                                    </div>
                                </div>

                                <button type="submit" class="button is-warning inline-block">Dar baixa</button>
                            </form>
                        </div>

                        <div v-else-if="this.$route.name === 'Declarar perdido'">
                            <form v-on:submit.prevent="declararPerdido($route.params.tipo)">
                                <div class="columns">
                                    <div class="column">
                                        <div class="field">
                                            <label>Número de produtos perdidos</label>
                                            <div class="control">
                                                <input
                                                    type="number"
                                                    class="input is-fullwidth"
                                                    step="1"
                                                    min="1"
                                                    placeholder="Digite um número"
                                                    v-model="perdidos"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="columns" v-if="perdidos !== ''">
                                    <div class="column notification">
                                        Ao declarar perdidos {{ perdidos }} produtos serão removidos do seu estoque e declarados como perdidos!
                                    </div>
                                </div>

                                <button type="submit" class="button is-warning inline-block">Declarar perdido</button>
                            </form>
                        </div>

                        <div v-else>Um erro ocorreu, por favor contacte o administrador!</div>
                    </section>
                    <footer class="modal-card-foot">
                    </footer>
                </div>
            </div>

            <div class="tabs is-fullwidth is-small">
                <ul>
                    <li :class="{ 'is-active': menuSelecionado === 'fardamentos' }" @click="carregarDados('fardamentos')">
                        <a @click="menuSelecionado = 'fardamentos'">Fardamento</a>
                    </li>
                    <li :class="{ 'is-active': menuSelecionado === 'botas' }" @click="carregarDados('botas')">
                        <a @click="menuSelecionado = 'botas'">Bota</a>
                    </li>
                    <li :class="{ 'is-active': menuSelecionado === 'epi' }" @click="carregarDados('epi')">
                        <a @click="menuSelecionado = 'epi'">EPI</a>
                    </li>
                    <li :class="{ 'is-active': menuSelecionado === 'bens' }" @click="carregarDados('bens')">
                        <a @click="menuSelecionado = 'bens'">Bem</a>
                    </li>
                    <li :class="{ 'is-active': menuSelecionado === 'limpeza' }" @click="carregarDados('limpeza')">
                        <a @click="menuSelecionado = 'limpeza'">Limpeza</a>
                    </li>
                    <li :class="{ 'is-active': menuSelecionado === 'outros' }" @click="carregarDados('outros')">
                        <a @click="menuSelecionado = 'outros'">Indefinido</a>
                    </li>
                </ul>
            </div>

            <div
                class="field"
                v-if="Object.keys(carregados[menuSelecionado]).length > 0">
                <div class="control">
                    <input
                        type="search"
                        class="input is-fullwidth"
                        v-model="busca"
                        placeholder="Digite uma busca nesta tabela"
                    />
                </div>
            </div>

            <div v-if="menuSelecionado === 'fardamentos'">
                <div
                    v-if="Object.keys(carregados.fardamentos).length === 0"
                    class="notification is-danger">
                    Nenhum fardamento em estoque!
                </div>

                <table v-else class="table is-hoverable is-bordered is-fullwidth">
                    <thead class="thead">
                        <th><a @click="ordenarTabela('funcao')">Função <fa icon="sort" /></a></th>
                        <th><a @click="ordenarTabela('tamanho')">Tamanho <fa icon="sort" /></a></th>
                        <th><a @click="ordenarTabela('sexo')">Sexo <fa icon="sort" /></a></th>
                        <th><a @click="ordenarTabela('valor')">Valor <fa icon="sort" /></a></th>
                        <th><a @click="ordenarTabela('qtdEstoque')">Quantidade <fa icon="sort" /></a></th>
                        <th><a @click="ordenarTabela('observacao')">Observação <fa icon="sort" /></a></th>
                        <th></th>
                    </thead>

                    <tbody class="tbody">
                        <tr v-for="(fardamento) in dadosCarregados" :key="fardamento.id">
                            <td>{{ fardamento.funcao }}</td>
                            <td>{{ fardamento.tamanho }}</td>
                            <td>{{ fardamento.sexo }}</td>
                            <td>R${{ fardamento.valor.toString().replace('.',',') }}</td>
                            <td>{{ fardamento.qtdEstoque }} {{ (fardamento.qtdEstoque > 1) ? 'unidades' : 'unidade' }}</td>
                            <td>{{ fardamento.observacao }}</td>
                            <td>
                                <button class="button is-small" @click="carregar('inserir', fardamento.id)">
                                    <fa icon="cart-plus"></fa>
                                    Inserir mais
                                </button>

                                <button class="button is-small" @click="carregar('baixa', fardamento.id)">
                                    <fa icon="cart-arrow-down"></fa>
                                    Dar baixa
                                </button>

                                <button
                                    class="button is-small is-warning"
                                    @click="carregar('perdido', fardamento.id)">
                                    Declarar perdido
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="menuSelecionado === 'botas'">
                <div
                    v-if="Object.keys(carregados.botas).length === 0"
                    class="notification is-danger">
                    Nenhuma bota em estoque!
                </div>

                <table v-else class="table is-hoverable is-bordered is-fullwidth">
                    <thead class="thead">
                        <th><a @click="ordenarTabela('modelo')">Modelo <fa icon="sort" /></a></th>
                        <th><a @click="ordenarTabela('tamanho')">Tamanho <fa icon="sort" /></a></th>
                        <th><a @click="ordenarTabela('estado')">Estado <fa icon="sort" /></a></th>
                        <th><a @click="ordenarTabela('valor')">Valor <fa icon="sort" /></a></th>
                        <th><a @click="ordenarTabela('qtdEstoque')">Quantidade <fa icon="sort" /></a></th>
                        <th><a @click="ordenarTabela('observacao')">Observação <fa icon="sort" /></a></th>
                        <th></th>
                    </thead>

                    <tbody class="tbody">
                        <tr v-for="bota in carregados.botas" :key="bota.id">
                            <td>{{ bota.modelo }}</td>
                            <td>{{ bota.tamanho }}</td>
                            <td>{{ bota.estado }}</td>
                            <td>R${{ bota.valor.toString().replace('.',',') }}</td>
                            <td>{{ bota.qtdEstoque }} {{ (bota.qtdEstoque > 1) ? 'unidades' : 'unidade' }}</td>
                            <td>{{ bota.observacao }}</td>
                            <td>
                                <button class="button is-small" @click="carregar('inserir', bota.id)">
                                    <fa icon="cart-plus"></fa>
                                    Inserir mais
                                </button>

                                <button class="button is-small" @click="carregar('baixa', bota.id)">
                                    <fa icon="cart-arrow-down"></fa>
                                    Dar baixa
                                </button>

                                <button
                                    class="button is-small is-warning"
                                    @click="carregar('perdido', bota.id)">
                                    Declarar perdido
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="menuSelecionado === 'epi'">
                <div
                    v-if="Object.keys(carregados.epi).length === 0"
                    class="notification is-danger">
                    Nenhum EPI em estoque!
                </div>

                <table v-else class="table is-hoverable is-bordered is-notclick is-fullwidth">
                    <thead class="thead">
                        <th><a @click="ordenarTabela('nome')">EPI <fa icon="sort" /></a></th>
                        <th><a @click="ordenarTabela('tamanho')">Tamanho <fa icon="sort" /></a></th>
                        <th><a @click="ordenarTabela('valor')">Valor <fa icon="sort" /></a></th>
                        <th><a @click="ordenarTabela('qtdEstoque')">Quantidade <fa icon="sort" /></a></th>
                        <th><a @click="ordenarTabela('observacao')">Observação <fa icon="sort" /></a></th>
                        <th></th>
                    </thead>

                    <tbody class="tbody">
                        <tr v-for="epi in carregados.epi" :key="epi.id">
                            <td>{{ epi.nome }}</td>
                            <td>{{ epi.tamanho }}</td>
                            <td>R${{ epi.valor.toString().replace('.',',') }}</td>
                            <td>{{ epi.qtdEstoque }} {{ (epi.qtdEstoque > 1) ? 'unidades' : 'unidade' }}</td>
                            <td>{{ epi.observacao }}</td>
                            <td>
                                <button class="button is-small" @click="carregar('inserir', epi.id)">
                                    <fa icon="cart-plus"></fa>
                                    Inserir mais
                                </button>

                                <button class="button is-small" @click="carregar('baixa', epi.id)">
                                    <fa icon="cart-arrow-down"></fa>
                                    Dar baixa
                                </button>

                                <button
                                    class="button is-small is-warning"
                                    @click="carregar('perdido', epi.id)">
                                    Declarar perdido
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="menuSelecionado === 'bens'">
                <div
                    v-if="Object.keys(carregados.bens).length === 0"
                    class="notification is-danger">
                    Nenhum bem em estoque!
                </div>

                <table v-else class="table is-hoverable is-bordered is-notclick is-fullwidth">
                    <thead class="thead">
                        <th><a @click="ordenarTabela('modelo')">Modelo <fa icon="sort" /></a></th>
                        <th><a @click="ordenarTabela('categoria')">Categoria <fa icon="sort" /></a></th>
                        <th><a @click="ordenarTabela('responsavelDeUso')">Responsável de uso <fa icon="sort" /></a></th>
                        <th><a @click="ordenarTabela('valor')">Valor <fa icon="sort" /></a></th>
                        <th><a @click="ordenarTabela('qtdEstoque')">Quantidade <fa icon="sort" /></a></th>
                        <th><a @click="ordenarTabela('observacao')">Observação <fa icon="sort" /></a></th>
                        <th></th>
                    </thead>

                    <tbody class="tbody">
                        <tr v-for="bem in carregados.bens" :key="bem.id">
                            <td>{{ bem.modelo }}</td>
                            <td>{{ bem.categoria }}</td>
                            <td>{{ bem.responsavelDeUso }}</td>
                            <td>R${{ bem.valor.toString().replace('.',',') }}</td>
                            <td>{{ bem.qtdEstoque }} {{ (bem.qtdEstoque > 1) ? 'unidades' : 'unidade' }}</td>
                            <td>{{ bem.observacao }}</td>
                            <td>
                                <button class="button is-small" @click="carregar('inserir', bem.id)">
                                    <fa icon="cart-plus"></fa>
                                    Inserir mais
                                </button>

                                <button class="button is-small" @click="carregar('baixa', bem.id)">
                                    <fa icon="cart-arrow-down"></fa>
                                    Dar baixa
                                </button>

                                <button
                                    class="button is-small is-warning"
                                    @click="carregar('perdido', bem.id)">
                                    Declarar perdido
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="menuSelecionado === 'limpeza'">
                <div
                    v-if="Object.keys(carregados.limpeza).length === 0"
                    class="notification is-danger">
                    Nenhum material de limpeza em estoque!
                </div>

                <table v-else class="table is-hoverable is-bordered is-notclick is-fullwidth">
                    <thead class="thead">
                        <th><a @click="ordenarTabela('nome')">Produto <fa icon="sort" /></a></th>
                        <th><a @click="ordenarTabela('valor')">Valor <fa icon="sort" /></a></th>
                        <th><a @click="ordenarTabela('qtdEstoque')">Quantidade <fa icon="sort" /></a></th>
                        <th><a @click="ordenarTabela('observacao')">Observação <fa icon="sort" /></a></th>
                        <th></th>
                    </thead>

                    <tbody class="tbody">
                        <tr v-for="limpeza in carregados.limpeza" :key="limpeza.id">
                            <td>{{ limpeza.nome }}</td>
                            <td>R${{ limpeza.valor.toString().replace('.',',') }}</td>
                            <td>{{ limpeza.qtdEstoque }} {{ (limpeza.qtdEstoque > 1) ? 'unidades' : 'unidade' }}</td>
                            <td>{{ limpeza.observacao }}</td>
                            <td>
                                <button class="button is-small" @click="carregar('inserir', limpeza.id)">
                                    <fa icon="cart-plus"></fa>
                                    Inserir mais
                                </button>

                                <button class="button is-small" @click="carregar('baixa', limpeza.id)">
                                    <fa icon="cart-arrow-down"></fa>
                                    Dar baixa
                                </button>

                                <button
                                    type="button"
                                    class="button is-small is-warning"
                                    @click="carregar('perdido', limpeza.id)">
                                    Declarar perdido
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="menuSelecionado === 'outros'">
                <div
                    v-if="Object.keys(carregados.outros).length === 0"
                    class="notification is-danger">
                    Nenhum outro produto em estoque!
                </div>

                <table v-else class="table is-hoverable is-bordered is-notclick is-fullwidth">
                    <thead class="thead">
                        <th><a @click="ordenarTabela('nome')">Nome <fa icon="sort" /></a></th>
                        <th><a @click="ordenarTabela('categoria')">Categoria <fa icon="sort" /></a></th>
                        <th><a @click="ordenarTabela('modelo')">Modelo <fa icon="sort" /></a></th>
                        <th><a @click="ordenarTabela('valor')">Valor <fa icon="sort" /></a></th>
                        <th><a @click="ordenarTabela('qtdEstoque')">Quantidade <fa icon="sort" /></a></th>
                        <th><a @click="ordenarTabela('observacao')">Observação <fa icon="sort" /></a></th>
                        <th></th>
                    </thead>

                    <tbody class="tbody">
                        <tr v-for="indefinido in dadosCarregados" :key="indefinido.id">
                            <td>{{ indefinido.nome }}</td>
                            <td>{{ indefinido.categoria }}</td>
                            <td>{{ indefinido.modelo }}</td>
                            <td>{{ indefinido.qtdEstoque }} {{ (indefinido.qtdEstoque > 1) ? 'unidades' : 'unidade' }}</td>
                            <td>R${{ indefinido.valor.toString().replace('.',',') }}</td>
                            <td>{{ indefinido.observacao }}</td>
                            <td>
                                <button class="button is-small" @click="carregar('inserir', indefinido.id)">
                                    <fa icon="cart-plus"></fa>
                                    Inserir mais
                                </button>

                                <button class="button is-small" @click="carregar('baixa', indefinido.id)">
                                    <fa icon="cart-arrow-down"></fa>
                                    Dar baixa
                                </button>

                                <button
                                    class="button is-small is-warning"
                                    @click="carregar('perdido', indefinido.id)">
                                    Declarar perdido
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="lista-estoque"
                v-if="listaBaixa.length > 0"
                :class="{'aberto': listaAberta}">
            <div
                class="lista-toggle"
                @click="listaAberta = !listaAberta">
                Dar baixa
                <fa icon="angle-up" />
            </div>
            <div class="lista-content">
                <form v-on:submit.prevent="darBaixaDefinitivo">
                    <div class="field has-text-left">
                        <label>Cliente</label>
                        <div class="control">
                            <input
                                type="text"
                                class="input is-fullwidth"
                                v-model="cliente"
                                placeholder="Digite um cliente"
                                required
                            />
                        </div>
                    </div>

                    <table class="table is-bordered is-hoverable is-fullwidth">
                        <thead class="thead">
                            <th>Tipo</th>
                            <th>Detalhes</th>
                            <th>Quantidade</th>
                            <th></th>
                        </thead>

                        <tbody class="tbody">
                            <tr v-for="(item,chave) in listaBaixa" :key="item.produto.id">
                                <td>{{ item.produto.tipoProduto }}</td>
                                <td><small>{{ item.detalhes }}</small></td>
                                <td>{{ item.quantidade }} unidades</td>
                                <td>
                                    <button
                                        type="button"
                                        class="button is-small is-danger"
                                        @click="removerProdutoDarBaixa(chave)">
                                        <fa icon="trash"></fa>
                                        Remover
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="is-fullwidth has-text-left">
                        <button class="button is-warning">
                            Dar baixa
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .lista-estoque {
        position: fixed;
        bottom: 0;
        right: 0;
        background: #dddddd;
        border-radius: 5px 0 0 0;
        width: 200px;
        transition: all 0.3s;
        box-shadow: 0 0 15px 5px rgba(0,0,0,0.2), inset 0 0 0 2px rgba(0,0,0,0.2);
        text-align: center;
        &.aberto {
            width: 700px;
            .lista-toggle {
                svg {
                    transform: rotate(-180deg);
                }
            }
            .lista-content {
                display: block;
                padding: 10px;
                height: 300px;
                overflow-y: scroll;
                &::-webkit-scrollbar { width:5px; background:#e3e0d6;  border-radius:10px;  } /* configurando scroll */
				&::-webkit-scrollbar-track { background: rgba(0,0,0,0.1);  border-radius:10px;  }
				&::-webkit-scrollbar-thumb { border-radius:10px; background:#8b8778;  }
            }
        }

        .lista-toggle {
            cursor: pointer;
            color: #666666;
            padding: 20px;

            &:hover {
                color: #333333;
            }

            svg {
                font-size: 24px;
                margin-bottom: -3px;
                margin-left: 10px;
                transition: all 0.2s;
            }
        }

        .lista-content {
            display: none;

            .table {
                background: #ddd;

                td, th {
                    border-color: rgba(0,0,0,0.2);
                }
            }
        }
    }

    .table {
        .tbody {
            td {
                button {
                    width: 100%;
                    display: block;
                    margin-bottom: 5px;
                }
            }
        }
    }
</style>


<script>
import jsPDF from 'jspdf';
import jsPDFTable from 'jspdf-autotable';
export default {
  name: 'GerenciarEstoque',

  data: () => ({
    menuSelecionado: 'fardamentos',
    modal: false,
    carregado: {}, // item de estoque carregado quando o usuário clica em alguma ação
    carregadoItem: {},
    carregados: {
      fardamentos: {},
      botas: {},
      epi: {},
      bens: {},
      limpeza: {},
      outros: {},
    }, //  array com itens carregados (é carregado quando o usuário clica em uma tab)
    baixa: '',
    adicionar: '',
    perdidos: '',

    listaBaixa: [], // lista com os produtos que serão adicionados ao dar baixa
    listaAberta: false,
    cliente: '',

    ordenar: {
      atual: '',
      direcao: 'desc',
    },

    busca: '',
  }),

  mounted() {
    this.carregarDados('fardamentos');
  },

  computed: {
    dadosCarregados(){
      let buscar = this.busca.toLowerCase();

      let carregados = this.carregados[this.menuSelecionado].filter((res, index) => {
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

    carregarDados(tipo) {
      this.toggleLoad();

      let load = 0;

      let tipoParaRequisicao;

      switch (tipo) {
        case 'fardamentos':
        case 'fardamento':
          tipoParaRequisicao = 'Fardamento';
        break;
        case 'botas':
        case 'bota':
          tipoParaRequisicao = 'Botas';
        break;
        case 'epi':
          tipoParaRequisicao = 'EPI';
        break;
        case 'outros':
        case 'indefinido':
          tipoParaRequisicao = 'Outro';
        break;
        case 'bens':
          tipoParaRequisicao = 'Bens';
        break;
        case 'limpeza':
          tipoParaRequisicao = 'Limpeza';
        break;
        default:
          tipoParaRequisicao = tipo;
        break;
      }

      this.$http.get(`${process.env.API}/estoque/listar-produtos?tipoProduto=${tipoParaRequisicao}`, {
        headers: { Authorization: localStorage.getItem('USER_TOKEN') }
      })
      .then((res) => {
        this.carregados[tipo] = res.body.data;
        this.toggleLoad();
      }, (err) => {
        this.toggleLoad();
        this.openToast();
      });
    },

    carregar(acao, id) {
      this.toggleLoad();

      this.$http.get(`${process.env.API}/estoque/buscar-por-id?idProduto=${id}`, {
        headers: { Authorization: localStorage.getItem('USER_TOKEN') }
      })
      .then((res) => {
        this.carregado = res.body.data;

        this.$http.get(`${process.env.API}/modelos-produto/buscar-por-id?idModelo=${this.carregado.idModeloProduto}`, {
          headers: { Authorization: localStorage.getItem('USER_TOKEN') }
        }).then((item) => {
          this.carregadoItem = item.body.data;
          this.$router.replace(`/estoque/gerenciar/${acao}/${id}`);
          this.toggleLoad();
          this.modal = true;
        }, () => {
          this.toggleLoad();
          this.openToast();
        });
      }, () => {
        this.toggleLoad();
        this.openToast();
      });
    },

    inserirMais() {
      this.toggleLoad();
      this.$http.post(`${process.env.API}/estoque/inserir-mais?idModelo=${this.carregado.idModeloProduto}&tipo=${this.carregado.tipoProduto}&qtd=${this.adicionar}`, null, {
        headers: { Authorization: localStorage.getItem('USER_TOKEN') }
      })
      .then((res) => {
        this.toggleLoad();
        this.modal = false;
        this.carregarDados(this.menuSelecionado);
        this.openToast(`${this.adicionar} produtos inseridos!`);
      }, () => {
        this.toggleLoad();
        this.openToast();
      });
    },

    darBaixa() {
      function detalhesItem(item, campos){ // desacoplamento para exibição de detalhes
        let string = ''; // string detalhes
        campos.map((valor, chave) => {
          let divider = ';'; // divisor da string
          let value = item[valor]; // valor da string
          if(chave == 0) divider = '';

          if(valor === 'valor') value = 'R$'+item[valor].toString().replace('.',',');
          if(valor === 'fornecedor') value = item[valor].nomeFantasia;
          string = string + `${divider} ${value}`;
        });

        return string;
      }

      const produto = {
        produto: this.carregado,
        quantidade: this.baixa,
        detalhes: '',
      };

      // Verifica sem tem algum elemento igual ao que está sendo adicionado na lista
      let repetidos = this.listaBaixa.filter((item,chave) => this.carregado.id === item.produto.id);

      if(repetidos.length === 0){
        // Para adicionar mais categorias, basta adicionar uma nova posição no objeto com o array (válido) dos campos da categoria
        // Para exibir mais campos basta adicionar uma nova posição no array
        const campos = {
          Fardamento: ['funcao','tamanho','sexo','fornecedor','valor'],
          Botas: ['modelo','tamanho','fornecedor','valor'],
          EPI: ['nome','tamanho','fornecedor','valor'],
          Outro: ['nome','categoria','fornecedor','valor'],
          Bens: ['modelo','categoria','responsavelDeUso','valor'],
          Limpeza: ['nome','valor']
        };

        produto.detalhes = detalhesItem(produto.produto, campos[produto.produto.tipoProduto])

        this.listaBaixa.push(produto);
        this.modal = false;
      } else {
          this.openToast('Este produto já está na lista de itens a dar baixa!');
      }
    },

    removerProdutoDarBaixa(index) {
      this.listaBaixa.splice(index, 1);
      this.openToast('Produto removido da lista de dar baixa!');
    },

    darBaixaDefinitivo() {

      let final = [];

      this.listaBaixa.map( (item, key) => {
          final.push({
            idModelo: item.produto.idModeloProduto,
            quantidade: parseInt(item.quantidade)
          });
      });

      this.toggleLoad();
      this.$http.post(`${process.env.API}/estoque/dar-baixa`, final, {
        headers: { Authorization: localStorage.getItem('USER_TOKEN') }
      })
      .then((res) => {
        this.toggleLoad();
        this.modal = false;
        this.carregarDados(this.menuSelecionado);
        this.gerarPDF();
        this.listaBaixa = [];
      }, () => {
        this.toggleLoad();
        this.openToast();
      });
    },

    gerarPDF() {
      let doc = new jsPDF();
      let columns = ["ID", "Produto", "Detalhes", "Quantidade"];
      let data = [];

      this.listaBaixa.map((item,chave) => {
        let linha = [chave+1, item.produto.tipoProduto, item.detalhes, item.quantidade];
        data.push(linha);
      });

      doc.autoTable(columns, data, {
          theme: 'grid',
          styles: {
            font: 'times'
          },
          headerStyles: {
            fillColor: [38, 117, 155]
          },
        });

      doc.setFontSize(12);
      doc.setFont('times','bold');
      doc.text('Responsável de retirar:  ________________________________________', 14, doc.autoTable.previous.finalY + 10);
      doc.text('Nome:  ________________________________________', 14, doc.autoTable.previous.finalY + 20);
      doc.text('Responsável de recebimento:  ________________________________________', 14, doc.autoTable.previous.finalY + 30);

      doc.text(`Cliente: ${this.cliente}`, 14, doc.autoTable.previous.finalY + 60);

      doc.save(`Dar baixa - ${Date.now()}.pdf`);
    },

    declararPerdido() {
      this.toggleLoad();
      this.$http.post(`${process.env.API}/estoque/perdido?idModelo=${this.carregado.idModeloProduto}&tipo=${this.carregado.tipoProduto}&qtd=${this.perdidos}`, null, {
        headers: { Authorization: localStorage.getItem('USER_TOKEN') }
      })
      .then((res) => {
        this.toggleLoad();
        this.modal = false;
        this.carregarDados(this.menuSelecionado);
        this.openToast(res.body.message);
      }, (err) => {
        this.toggleLoad();
        this.openToast();
      });
    },
  },
};
</script>