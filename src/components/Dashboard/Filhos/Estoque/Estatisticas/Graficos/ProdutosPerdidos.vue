<template>
  <div>
    <canvas id="ProdutosPerdidos"></canvas>
  </div>
</template>


<script>
import Chart from 'chart.js';
import moment from 'moment';

export default {
  name: 'ProdutosPerdidos',

  props: ['chart', 'options'],

  mounted() {
    this.carregarDados();
  },

  data: () => ({
    dados: this.chart
  }),

  methods: {
    carregar(chaves, dados) {
      new Chart(document.getElementById("ProdutosPerdidos"), {
        type: 'pie',
        data: {
          labels: chaves,
          datasets: [{
              label: 'Produtos perdidos',
              data: dados,
              backgroundColor: ['#26759B','#F3D460','#EF6461','#92BDA3'],
              options: this.options,
          }]
        },
      });
    },

    carregarDados() {

      this.$http.get(`${process.env.API}/estoque/grafico-produtos-perdidos-mes?data=${moment().format('DD/MM/YYYY')}`, {
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