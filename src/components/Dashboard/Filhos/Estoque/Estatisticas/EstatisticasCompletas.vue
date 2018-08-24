<template>
    <div class="estatisticas">
        <h1 class="title is-5">Estatísticas</h1>
        <div class="subtitle is-7">Dados do mês <strong>{{ meses[new Date().getMonth()] }}</strong>, ano <strong>{{ new Date().getFullYear() }}</strong></div>

        <div class="columns">
            <div class="column card first">
                <div class="card-image">
                    <fa icon="dollar-sign" />
                </div>
                <div class="card-content">
                    <h1 class="title is-5">R${{cards.total}}</h1>
                    <h2 class="subtitle is-7">Total em produtos</h2>
                </div>
            </div>

            <div class="column card second">
                <div class="card-image">
                    <fa icon="cart-plus" />
                </div>
                <div class="card-content">
                    <h1 class="title is-5">R${{cards.adicionados}}</h1>
                    <h2 class="subtitle is-7">Produtos adicionados</h2>
                </div>
            </div>

            <div class="column card third">
                <div class="card-image">
                    <fa icon="exclamation-circle" />
                </div>
                <div class="card-content">
                    <h1 class="title is-5">R${{cards.perdidos}}</h1>
                    <h2 class="subtitle is-7">Produtos perdidos</h2>
                </div>
            </div>

            <div class="column card fourth">
                <div class="card-image">
                    <fa icon="cart-arrow-down" />
                </div>
                <div class="card-content">
                    <h1 class="title is-5">R${{cards.retirados}}</h1>
                    <h2 class="subtitle is-7">Produtos retirados</h2>
                </div>
            </div>
        </div>

        <div class="columns">
            <div class="column box grafico-box" id="produtos-perdidos-meses">
                <h1
                    @click="abrirGraficoBox('produtos-perdidos-meses')">
                    Produtos perdidos em meses
                    <fa icon="angle-down" class="submenu-icon"></fa>
                </h1>


                <div class="grafico grande">
                    <div class="reloadPPMeses" @click="carregar(0)">
                        <fa icon="sync" />
                    </div>
                    <produtos-perdidos-meses
                        :chart="graficos.ProdutosPerdidosMeses"
                        :options="{responsive: false, maintainAspectRatio: false}"
                        :width="1200"
                        :height="400" />
                </div>
            </div>
        </div>

        <div class="columns">
            <div class="column box grafico-box" id="produtos-perdidos">
                <h1
                    @click="abrirGraficoBox('produtos-perdidos')">
                    Produtos perdidos
                    <fa icon="angle-down" class="submenu-icon"></fa>
                </h1>

                <div class="medio">

                    <produtos-perdidos
                        class="grafico"
                        :chart="graficos.ProdutosPerdidos"
                        :options="{responsive: false, maintainAspectRatio: false}"
                        :width="1200"
                        :height="400" />
                </div>
            </div>
        </div>

        <div class="columns">
            <div class="column box grafico-box" id="produtos-removidos">
                <h1
                    @click="abrirGraficoBox('produtos-removidos')">
                    Produtos removidos
                    <fa icon="angle-down" class="submenu-icon"></fa>
                </h1>

                <produtos-removidos
                    class="grafico"
                    :chart="graficos.ProdutosRemovidos"
                    :options="{responsive: false, maintainAspectRatio: false}"
                    :width="200"
                    :height="150" />
            </div>

            <div class="column box grafico-box" id="produtos-inseridos">
                <h1
                    @click="abrirGraficoBox('produtos-inseridos')">
                    Produtos inseridos
                    <fa icon="angle-down" class="submenu-icon"></fa>
                </h1>

                <produtos-inseridos
                    class="grafico"
                    :chart="graficos.ProdutosInseridos"
                    :options="{responsive: false, maintainAspectRatio: false}"
                    :width="200"
                    :height="150" />
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
    .grafico-box {
        margin: 10px;
        padding: 0;

        &.box {
            border: 0;
            box-shadow: none;
            -webkit-box-shadow: none;
        }

        h1 {
            cursor: pointer;
            text-align: center;
            margin: 0;
            background: rgba(0,0,0,0.1);
            border-radius: 6px;
            padding: 10px;
            box-shadow: 0 0 1px 1px rgba(0,0,0,0.2);
            text-shadow: 0 2px 0 rgba(255, 255, 255, 0.5);
            transition: all 0.1s;

            &:hover {
                background: rgba(0,0,0,0.15);
                box-shadow: 0 0 1px 1px rgba(0,0,0,0.3);
            }
        }

        svg {
            transition: all 0.2s;
            margin-left: 5px;
        }

        .grande {
            width: 90%;
            margin: 0 auto;
        }

        .medio {
            width: 80%;
            margin: 0 auto;
        }

        &.aberto {
            height: auto;

            h1 {
                border-radius: 6px 6px 0 0;
            }

            &.box {
                box-shadow: 0 0 1px 1px rgba(0,0,0,0.2);
            }
            .grafico {
                display: block;
                padding: 5px 0 30px 0;
            }

            svg {
                transform: rotate(-180deg);
            }
        }
    }

    .grafico {
        display: none;
        transition: all 2s;
        position: relative;

        .reloadPPMeses {
            position: absolute;
            top: 10px;
            right: 20px;
            cursor: pointer;
            background: linear-gradient(#26759B,#26759B - 20);
            color: #ffffff;
            border-radius: 3px;
            padding: 5px 15px 5px 10px;
            font-size: 12px;

            &:hover {
                svg {
                    transform: rotate(180deg);
                }
            }

            svg {
                margin-right: 10px;
                transition: all 0.8s;
            }

            &::after {
                content: 'Recarrecar grafico';
            }
        }
    }

    .card {
        display: flex;
        align-items: center;
        margin: 15px;
        color: #ffffff;
        text-align: center;
        border-radius: 5px;
        box-shadow: 0 5px 15px 0 rgba(0,0,0,0.1), inset 0 0 0 2px rgba(0,0,0,0.1);
        text-shadow: 0 1px 0 rgba(0,0,0,0.2);
        transition: all 0.2s;
        cursor: default;
        opacity: 0.9;

        &:hover {
            box-shadow: 0 8px 15px 0 rgba(0,0,0,0.4), inset 0 0 0 2px rgba(0,0,0,0.1);
            transform: scale(1.05);
            opacity: 1;
        }

        &.first {
            background: linear-gradient(#26759B,#26759B - 20);
        }

        &.second {
            background: linear-gradient(#F3D460 - 10,#F3D460 - 30);
        }

        &.third {
            background: linear-gradient(#EF6461, #EF6461 - 20);
        }

        &.fourth {
            background: linear-gradient(#92BDA3, #92BDA3 - 20);
        }

        .card-image {
            flex: 1;
            font-size: 3em;
        }

        .card-content {
            flex: 3;
            padding: 0;
            margin-left: 10px;
            .title, .subtitle {
                color: #ffffff;
            }
        }
    }
</style>


<script>
import ProdutosPerdidos from './Graficos/ProdutosPerdidos.vue';
import ProdutosInseridos from './Graficos/ProdutosInseridos.vue';
import ProdutosRemovidos from './Graficos/ProdutosRemovidos.vue';
import ProdutosPerdidosMeses from './Graficos/ProdutosPerdidosMeses.vue';
import moment from 'moment';

export default {
  name: 'Estatisticas',

  data: () => ({
    cards: {
      total: 0,
      adicionados: 0,
      perdidos: 0,
      retirados: 0,
    },
    graficos: {
      ProdutosPerdidos: [],
      ProdutosPerdidosMeses: [],
      ProdutosRemovidos: [],
      ProdutosInseridos: [],
    },
    meses: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  }),

  components: {
    'produtos-perdidos': ProdutosPerdidos,
    'produtos-inseridos': ProdutosInseridos,
    'produtos-removidos': ProdutosRemovidos,
    'produtos-perdidos-meses': ProdutosPerdidosMeses,
	},

	mounted() {
		this.valorProdutos();
		this.graficoPerdidosMeses();
	},

  methods: {
    abrirGraficoBox(ref) {
        document.getElementById(ref).classList.toggle('aberto');
    },

    valorProdutosTotal() {
			this.$http.get(`${process.env.API}/estoque/valor-produtos-total`,{
        headers: { Authorization: localStorage.getItem('USER_TOKEN') }
			}).then((res) => {
				this.cards.total = (res.data.data !== null) ? parseFloat(res.data.data).toFixed(2).toString().replace('.',',') : 0;
			});
		},

		valorProdutosMes() {
			let now = moment().format('DD/MM/YYYY');

			this.$http.get(`${process.env.API}/estoque/valor-produtos-mes?data=${now}`,{
        headers: { Authorization: localStorage.getItem('USER_TOKEN') }
			}).then((res) => {
				this.cards.adicionados = (res.data.data !== null) ? parseFloat(res.data.data).toFixed(2).toString().replace('.',',') : 0;
			});
		},

		valorProdutoPerdidos() {
			let now = moment().format('DD/MM/YYYY');
			this.$http.get(`${process.env.API}/estoque/valor-produtos-perdidos?data=${now}`,{
        headers: { Authorization: localStorage.getItem('USER_TOKEN') }
			}).then((res) => {
				this.cards.perdidos = (res.data.data !== null) ? parseFloat(res.data.data).toFixed(2).toString().replace('.',',') : 0;
			});
		},

		valorProdutoRetirados() {
			let now = moment().format('DD/MM/YYYY');
			this.$http.get(`${process.env.API}/estoque/valor-produtos-retirados?data=${now}`,{
        headers: { Authorization: localStorage.getItem('USER_TOKEN') }
			}).then((res) => {
				this.cards.retirados = (res.data.data !== null) ? parseFloat(res.data.data).toFixed(2).toString().replace('.',',') : 0;
			});
		},

		valorProdutos(){
			this.valorProdutosTotal();
			this.valorProdutosMes();
			this.valorProdutoPerdidos();
			this.valorProdutoRetirados();
		},

		graficoPerdidosMeses() {
      this.$http.get(`${process.env.API}/estoque/grafico-produtos-perdidos-ano`, {
        headers: { Authorization: localStorage.getItem('USER_TOKEN') },
      })
      .then((res) => {
        let finalDados = [];
        let dados = res.body.data;
        Object.keys(dados).map(value => {
          if(value !== 'data'){
            finalDados.push(dados[value]);
          }
				});
				this.graficos.ProdutosPerdidosMeses = finalDados;
      });
		},

    carregar() {
    },
  }
};
</script>
