<template>
  <div>
    <canvas id="ProdutosInseridos"></canvas>
  </div>
</template>


<script>
import Chart from 'chart.js';
import moment from 'moment';

export default {
  name: 'ProdutosInseridos',

  props: ['chart', 'options'],

  mounted() {
    this.carregarDados();
  },

  data: () => ({
    dados: [],
  }),

  methods: {
    carregar(chaves, dados) {
      new Chart(document.getElementById("ProdutosInseridos"), {
        type: 'pie',
        data: {
          labels: chaves,
          datasets: [{
              label: 'Produtos inseridos',
              data: dados,
              backgroundColor: ['#26759B','#F3D460','#EF6461','#92BDA3'],
              options: this.options,
          }]
        },
      });
    },

    carregarDados() {

      this.$http.get(`${process.env.API}/estoque/grafico-produtos-inseridos-mes?data=${moment().format('DD/MM/YYYY')}`, {
        headers: { Authorization: localStorage.getItem('USER_TOKEN') },
      })
      .then((res) => {
        let finalDados = [];
        let dados = res.body.data;

        let chaves = Object.keys(dados).filter(valor => valor != 'total');

        chaves.forEach(chave => {
          finalDados.push(dados[chave]);
        });

        this.carregar(chaves, finalDados);
      });
    },
  },
};

</script>