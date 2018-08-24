<template>
  <div>
    <canvas id="ProdutosPerdidosMeses"></canvas>
  </div>
</template>


<script>
import Chart from 'chart.js';
export default {
  name: 'ProdutosPerdidosMeses',

  props: ['chart', 'options'],

  mounted() {
    this.carregar(this.chart);
  },

  data: () => ({
    dados: this.chart
  }),

  watch: {
    chart(novoValor) {
      this.carregar(novoValor)
    },
  },

  methods: {
    carregar(dados) {
      new Chart(document.getElementById("ProdutosPerdidosMeses"), {
        type: 'line',
        data: {
          labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          datasets: [{
              label: 'Produtos perdidos',
              data: dados,
              backgroundColor: '#26759B',
              options: this.options,
          }]
        },
      });
    }
  },
};

</script>