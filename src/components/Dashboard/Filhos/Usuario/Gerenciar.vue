<template>
    <div class="box">
        <h1 class="title is-5">Gerenciar usuários</h1>

        <div :class="{ modal: true, 'is-active': modal }">
        <div class="modal-background"></div>
            <div class="modal-card is-large">
                <header class="modal-card-head">
                    <p class="modal-card-title">Excluir usuário</p>
                    <router-link :to="{ path: '/usuario/gerenciar' }" replace>
                        <button
                            class="delete"
                            @click="modal=false">
                        </button>
                    </router-link>
                </header>
                <section class="modal-card-body">
					<p>Tem certeza que deseja remover este usuário?</p>

					<br>

					<button
						@click="excluirUsuario($route.params.id)"
						class="button is-danger inline-block">
						Sim, excluir
					</button>
					<router-link :to="{ path: '/usuario/gerenciar' }" replace>
						<button
							class="button inline-block"
							@click="modal=false">
							Não, cancelar!
						</button>
					</router-link>
                </section>
                <footer class="modal-card-foot"></footer>
            </div>
        </div>

        <div
          v-if="usuarios.length === 0"
          class="notification is-danger">
          Nenhum usuário cadastrado!
        </div>

        <div
            class="field"
            v-if="Object.keys(usuarios).length > 1">
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
                <th><a @click="ordenarTabela('nome')">Nome <fa icon="sort" /></a></th>
                <th><a @click="ordenarTabela('email')">E-mail <fa icon="sort" /></a></th>
                <th><a @click="ordenarTabela('telefone')">Telefone <fa icon="sort" /></a></th>
                <th><a @click="ordenarTabela('tipo')">Função <fa icon="sort" /></a></th>
                <th></th>
            </thead>

            <tbody class="tbody">
                <tr v-for="usuario in dadosCarregados" :key="usuario.id">
                    <td>{{ usuario.nome }}</td>
                    <td>{{ usuario.email }}</td>
                    <td>{{ mascarar(usuario.telefone, '(00) 00009-0000') }}</td>
                    <td>{{ usuario.tipo }}</td>
                    <td>
                        <router-link
                            :to="{ path: `/usuario/gerenciar/excluir/${usuario.id}` }" replace>
                            <button class="button is-small is-danger" @click="modal=true">
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
  name: 'GerenciarUsuarios',

  data: () => ({
    modal: false,
    usuarios: [],

    ordenar: {
      atual: '',
      direcao: 'desc',
    },

    busca: '',
  }),

  mounted() {
    this.getUsuarios();
  },

  computed: {
    dadosCarregados(){
      let buscar = this.busca.toLowerCase();

      let carregados = this.usuarios.filter((res, index) => {
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

    getUsuarios(){
      this.toggleLoad();
      this.$http.get(`${process.env.API}/usuarios/listar-todos`, {
          headers: { Authorization: localStorage.getItem('USER_TOKEN') },
      })
      .then((res) => {
          this.toggleLoad();
          this.usuarios = res.body.data;
          this.usuarios = this.usuarios.filter((res) => res.id != this.$parent.user.id);

      }, () => {
        this.toggleLoad();
        this.openToast();
      });
    },

    excluirUsuario(id){
      this.$http.delete(`${process.env.API}/usuarios/deletar-usuario?idUsuario=${id}`, {
        headers: { Authorization: localStorage.getItem('USER_TOKEN') },
      })
      .then((res) => {
        this.openToast('Usuário deletado com sucesso!');
        this.getUsuarios();
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
