import Vue from 'vue';
import App from './App';
import router from './router';
import moment from 'moment'; // Moment para calculo de tempo

// Importação dos ícones usando Font-Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLock, faUser, faHome, faShoppingCart, faBell, faAngleDown, faCartPlus, faPeopleCarry, faBoxes, faBoxOpen, faUsers, faUserPlus, faTruckMoving, faEdit, faTrash, faEye, faCartArrowDown, faSpinner, faDollarSign, faExclamationCircle, faFrown, faSync, faAngleUp, faSort, faSignInAlt, faEllipsisV, faFilter } from '@fortawesome/free-solid-svg-icons'; // Seleção de ícones
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueResource from 'vue-resource'; // Módulo para requisições HTTP
import VueTheMask from 'vue-the-mask';
import money from 'v-money';

require('bulma'); // Importação do Bulma CSS
require('./sass/somar.scss'); // Importação das pré-definições de CSS do Somar

library.add(
  faLock,
  faUser,
  faHome,
  faShoppingCart,
  faBell,
  faAngleDown,
  faAngleUp,
  faCartPlus,
  faPeopleCarry,
  faBoxes,
  faBoxOpen,
  faUserPlus,
  faUsers,
  faTruckMoving,
  faEdit,
  faTrash,
  faEye,
  faCartArrowDown,
  faSpinner,
  faDollarSign,
  faExclamationCircle,
  faFrown,
  faUserPlus,
  faSync,
  faSort,
  faSignInAlt,
  faEllipsisV,
  faFilter
); // Adição de ícones a livraria

Vue.component('fa', FontAwesomeIcon); // Componente para uso dos ícones

Vue.use(VueResource); // Inicialização do módulo para requisições HTTP
Vue.use(VueTheMask, { masked: true }); // Inicialização do módulo para máscaras gerais
Vue.use(money, {
  precision: 2,
  decimal: ',',
  thousands: '.',
  masked: true,
}); // Inicialização do módulo para máscaras de dinheiro

Vue.config.productionTip = false;

Vue.mixin({
  methods: {
    // Calcular intervalo entre datas usando momentJS
    tempoIntervalo(dataTimestamp) {
			let data = new Date(dataTimestamp);

			let dia = data.getDate();
      dia = (dia < 10) ? `0${dia}` : dia;
      let mes = data.getMonth()+1;
      mes = (mes < 10) ? `0${mes}` : mes;
      let ano = data.getFullYear();

      let hora = data.getHours();
      hora = (hora < 10) ? `0${hora}` : hora;
      let minuto = data.getMinutes();
      minuto = (minuto < 10) ? `0${minuto}` : minuto;

			return `${dia}/${mes}/${ano} às ${hora}:${minuto}`;
    },

    // Separei dos demais pra poder trabalhar melhor nesse método depois
    findInObject(obj, value) { // Passa o objeto e o valor a buscar
      const objKeys = Object.keys(obj); // Pega todas as chaves do objeto
      const verificarExistenciaDeValor = objKeys.filter((key) => { // Faz um filtro
        if (obj[key] !== null && !(obj[key] instanceof Object)) { // Verifica se o valor da posição não é nulo ou uma instância de objeto (ainda vou fazer a recursão pra isso, mas por enquanto...)
          if (obj[key].toString().toLowerCase().indexOf(value) >= 0) return 1; // Vê se o valor está entre os valores
        }
      });

      return (verificarExistenciaDeValor.length > 0) ? 1 : 0; // Retorna 1 se o tamanho do filter for > 0 e 0 se o contrário
    },

    closeToast() {
      const toast = document.querySelector('.toast');
      toast.classList.remove('active');
    },

    openToast(message = 'Um erro ocorreu, contacte um administrador!') {
      this.closeToast();
      const toast = document.querySelector('.toast');
      toast.classList.add('active');
      toast.innerHTML = message;
      setTimeout(() => {
        this.closeToast();
      }, 5000);
    },

    toggleLoad() {
      const load = document.querySelector('.loading');
      load.classList.toggle('active');
    },
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
