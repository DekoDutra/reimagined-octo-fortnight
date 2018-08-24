<template>
  <div class="box">
    <h1 class="title is-5">Todos os lembretes</h1>

    <div :class="{ modal: true, 'is-active': modal }">
      <div class="modal-background"></div>
          <div class="modal-card is-large">
              <header class="modal-card-head">
                  <p class="modal-card-title">Ver mais</p>
                  <button
                      class="delete"
                      @click="modal=false">
                  </button>
              </header>
              <section class="modal-card-body">
                <div v-if="!carregado.multiplos">
                  <div v-if="carregado.tipo === 'produto'">
                    <h1 class="is-size-5"><strong>Modelo de produto</strong> ({{carregado.dados.tipoProduto}}) </h1>
                    <div v-if="carregado.dados.tipoProduto === 'Fardamento'">
                      <table class="table is-bordered is-fullwidth">
                        <thead class="thead">
                          <th>Função</th>
                          <th>Sexo</th>
                          <th>Fornecedor</th>
                          <th>Tamanho</th>
                          <th>Valor</th>
                          <th>Observação</th>
                        </thead>

                        <tbody>
                          <td>{{ carregado.dados.funcao }}</td>
                          <td>{{ carregado.dados.sexo }}</td>
                          <td>{{ carregado.dados.fornecedor.nomeFantasia }}</td>
                          <td>{{ carregado.dados.tamanho }}</td>
                          <td>R${{ carregado.dados.valor.toString().replace('.',',') }}</td>
                          <td><small>{{ carregado.dados.observacao }}</small></td>
                        </tbody>
                      </table>
                    </div>

                    <div v-if="carregado.dados.tipoProduto === 'Botas'">
                      <table class="table is-bordered is-fullwidth">
                        <thead class="thead">
                          <th>Modelo</th>
                          <th>Estado</th>
                          <th>Fornecedor</th>
                          <th>Tamanho</th>
                          <th>Valor</th>
                          <th>Observação</th>
                        </thead>

                        <tbody>
                          <td>{{ carregado.dados.modelo }}</td>
                          <td>{{ carregado.dados.estado }}</td>
                          <td>{{ carregado.dados.fornecedor.nomeFantasia }}</td>
                          <td>{{ carregado.dados.tamanho }}</td>
                          <td>R${{ carregado.dados.valor.toString().replace('.',',') }}</td>
                          <td><small>{{ carregado.dados.observacao }}</small></td>
                        </tbody>
                      </table>
                    </div>

                    <div v-if="carregado.dados.tipoProduto === 'EPI'">
                      <table class="table is-bordered is-fullwidth">
                        <thead class="thead">
                          <th>EPI</th>
                          <th>Fornecedor</th>
                          <th>Tamanho</th>
                          <th>Valor</th>
                          <th>Observação</th>
                        </thead>

                        <tbody>
                          <td>{{ carregado.dados.nome }}</td>
                          <td>{{ carregado.dados.fornecedor.nomeFantasia }}</td>
                          <td>{{ carregado.dados.tamanho }}</td>
                          <td>R${{ carregado.dados.valor.toString().replace('.',',') }}</td>
                          <td><small>{{ carregado.dados.observacao }}</small></td>
                        </tbody>
                      </table>
                    </div>

                    <div v-if="carregado.dados.tipoProduto === 'bens'">
                      <table class="table is-bordered is-fullwidth">
                        <thead class="thead">
                          <th>Modelo</th>
                          <th>Marca</th>
                          <th>Categoria</th>
                          <th>Cor</th>
                          <th>Fornecedor</th>
                          <th>Valor</th>
                          <th>Observação</th>
                        </thead>

                        <tbody>
                          <td>{{ carregado.dados.modelo }}</td>
                          <td>{{ carregado.dados.marca }}</td>
                          <td>{{ carregado.dados.categoria }}</td>
                          <td>{{ carregado.dados.cor }}</td>
                          <td>{{ carregado.dados.fornecedor.nomeFantasia }}</td>
                          <td>R${{ carregado.dados.valor.toString().replace('.',',') }}</td>
                          <td><small>{{ carregado.dados.observacao }}</small></td>
                        </tbody>
                      </table>
                    </div>

                    <div v-if="carregado.dados.tipoProduto === 'limpeza'">
                      <table class="table is-bordered is-fullwidth">
                        <thead class="thead">
                          <th>Produto</th>
                          <th>Valor</th>
                          <th>Fornecedor</th>
                          <th>Observação</th>
                        </thead>

                        <tbody>
                          <td>{{ carregado.dados.nome }}</td>
                          <td>R${{ carregado.dados.valor.toString().replace('.',',') }}</td>
                          <td>{{ carregado.dados.fornecedor.nomeFantasia }}</td>
                          <td><small>{{ carregado.dados.observacao }}</small></td>
                        </tbody>
                      </table>
                    </div>

                    <div v-if="carregado.dados.tipoProduto === 'outros'">
                      <table class="table is-bordered is-fullwidth">
                        <thead class="thead">
                          <th>Nome</th>
                          <th>Setor</th>
                          <th>Marca</th>
                          <th>Modelo</th>
                          <th>Fornecedor</th>
                          <th>Valor</th>
                          <th>Observação</th>
                        </thead>

                        <tbody>
                          <td>{{ carregado.dados.nome }}</td>
                          <td>{{ carregado.dados.setor }}</td>
                          <td>{{ carregado.dados.marca }}</td>
                          <td>{{ carregado.dados.modelo }}</td>
                          <td>{{ carregado.dados.fornecedor.nomeFantasia }}</td>
                          <td>R${{ carregado.dados.valor.toString().replace('.',',') }}</td>
                          <td><small>{{ carregado.dados.observacao }}</small></td>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div v-else-if="carregado.tipo === 'fornecedor'">
                    <table class="table is-hoverable is-bordered is-fullwidth">
                      <thead class="thead">
                          <th>Nome fantasia</th>
                          <th>Razão social</th>
                          <th>Endereço</th>
                          <th>CNPJ</th>
                          <th>Responsável</th>
                          <th>Telefone</th>
                          <th>E-mail</th>
                          <th></th>
                      </thead>

                      <tbody class="tbody">
                          <tr>
                              <td>{{ carregado.dados.nomeFantasia }}</td>
                              <td>{{ carregado.dados.razaoSocial }}</td>
                              <td>{{ carregado.dados.endereco }}</td>
                              <td>{{ mascarar(carregado.dados.cnpj, '00.000.000/0000-00') }}</td>
                              <td>{{ carregado.dados.nomeResponsavel }}</td>
                              <td>{{ mascarar(carregado.dados.telefone, '(00) 00009-0000') }}</td>
                              <td>{{ carregado.dados.email }}</td>
                          </tr>
                      </tbody>
                  </table>
                  </div>

                  <div v-else> Um erro ocorreu! </div>
                </div>

                <div v-else>
                  <div v-if="carregado.tipo === 'produto'">
                    <div v-for="(dado,index) in carregado.dados" :key="dado.id">
                      <h1 class="is-size-6"><strong>Modelo de produto</strong> ({{dado.tipoProduto}}) </h1>
                      <div v-if="dado.tipoProduto === 'Fardamento'">
                        <table class="table is-bordered is-fullwidth">
                          <thead class="thead">
                            <th>Função</th>
                            <th>Sexo</th>
                            <th>Fornecedor</th>
                            <th>Tamanho</th>
                            <th>Valor</th>
                            <th>Observação</th>
                          </thead>

                          <tbody>
                            <td>{{ dado.funcao }}</td>
                            <td>{{ dado.sexo }}</td>
                            <td>{{ dado.fornecedor.nomeFantasia }}</td>
                            <td>{{ dado.tamanho }}</td>
                            <td>R${{ dado.valor.toString().replace('.',',') }}</td>
                            <td><small>{{ dado.observacao }}</small></td>
                          </tbody>
                        </table>
                      </div>

                      <div v-if="dado.tipoProduto === 'Botas'">
                        <table class="table is-bordered is-fullwidth">
                          <thead class="thead">
                            <th>Modelo</th>
                            <th>Estado</th>
                            <th>Fornecedor</th>
                            <th>Tamanho</th>
                            <th>Valor</th>
                            <th>Observação</th>
                          </thead>

                          <tbody>
                            <td>{{ dado.modelo }}</td>
                            <td>{{ dado.estado }}</td>
                            <td>{{ dado.fornecedor.nomeFantasia }}</td>
                            <td>{{ dado.tamanho }}</td>
                            <td>R${{ dado.valor.toString().replace('.',',') }}</td>
                            <td><small>{{ dado.observacao }}</small></td>
                          </tbody>
                        </table>
                      </div>

                      <div v-if="dado.tipoProduto === 'EPI'">
                        <table class="table is-bordered is-fullwidth">
                          <thead class="thead">
                            <th>EPI</th>
                            <th>Fornecedor</th>
                            <th>Tamanho</th>
                            <th>Valor</th>
                            <th>Observação</th>
                          </thead>

                          <tbody>
                            <td>{{ dado.nome }}</td>
                            <td>{{ dado.fornecedor.nomeFantasia }}</td>
                            <td>{{ dado.tamanho }}</td>
                            <td>R${{ dado.valor.toString().replace('.',',') }}</td>
                            <td><small>{{ dado.observacao }}</small></td>
                          </tbody>
                        </table>
                      </div>

                      <div v-if="dado.tipoProduto === 'bens'">
                        <table class="table is-bordered is-fullwidth">
                          <thead class="thead">
                            <th>Modelo</th>
                            <th>Marca</th>
                            <th>Categoria</th>
                            <th>Cor</th>
                            <th>Fornecedor</th>
                            <th>Valor</th>
                            <th>Observação</th>
                          </thead>

                          <tbody>
                            <td>{{ dado.modelo }}</td>
                            <td>{{ dado.marca }}</td>
                            <td>{{ dado.categoria }}</td>
                            <td>{{ dado.cor }}</td>
                            <td>{{ dado.fornecedor.nomeFantasia }}</td>
                            <td>R${{ dado.valor.toString().replace('.',',') }}</td>
                            <td><small>{{ dado.observacao }}</small></td>
                          </tbody>
                        </table>
                      </div>

                      <div v-if="dado.tipoProduto === 'limpeza'">
                        <table class="table is-bordered is-fullwidth">
                          <thead class="thead">
                            <th>Produto</th>
                            <th>Valor</th>
                            <th>Fornecedor</th>
                            <th>Observação</th>
                          </thead>

                          <tbody>
                            <td>{{ dado.nome }}</td>
                            <td>R${{ dado.valor.toString().replace('.',',') }}</td>
                            <td>{{ dado.fornecedor.nomeFantasia }}</td>
                            <td><small>{{ dado.observacao }}</small></td>
                          </tbody>
                        </table>
                      </div>

                      <div v-if="dado.tipoProduto === 'outros'">
                        <table class="table is-bordered is-fullwidth">
                          <thead class="thead">
                            <th>Nome</th>
                            <th>Setor</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Fornecedor</th>
                            <th>Valor</th>
                            <th>Observação</th>
                          </thead>

                          <tbody>
                            <td>{{ dado.nome }}</td>
                            <td>{{ dado.setor }}</td>
                            <td>{{ dado.marca }}</td>
                            <td>{{ dado.modelo }}</td>
                            <td>{{ dado.fornecedor.nomeFantasia }}</td>
                            <td>R${{ dado.valor.toString().replace('.',',') }}</td>
                            <td><small>{{ dado.observacao }}</small></td>
                          </tbody>
                        </table>
                      </div>

                      <hr v-if="index !== carregado.dados.length" />
                    </div>
                  </div>

                  <div v-else> Um erro ocorreu! </div>
                </div>
              </section>
              <footer class="modal-card-foot"></footer>
          </div>
      </div>

    <div
      v-if="lembretes.length === 0"
      class="notification is-danger">
      Nenhum lembrete!
    </div>

    <div v-else>
        <div class="columns" v-if="Object.keys(lembretes).length > 0">
          <div class="column">
              <strong>Buscar</strong>
                <input
                    type="search"
                    class="input"
                    v-model="busca"
                    :disabled="filtrarPorAcao !== '' || filtrarPorUsuario !== ''"
                    placeholder="Digite uma busca nesta tabela"
                />
          </div>

          <div class="column">
            <strong>Filtrar por usuário</strong> <br />
            <div class="select is-fullwidth">
              <select v-model="filtrarPorUsuario" :disabled="busca !== '' || filtrarPorAcao !== ''">
                  <option value="">Todos</option>
                  <option  v-for="usuario in usuarios" :key="usuario.id" :value="usuario.nome">
                    {{ usuario.nome }}
                  </option>
              </select>
          </div>
          </div>

          <div class="column">
            <strong>Filtrar por ação</strong> <br />
            <div class="select is-fullwidth">
              <select v-model="filtrarPorAcao" :disabled="busca !== '' || filtrarPorUsuario !== ''">
                  <option value="">Todas</option>
                  <option value="salvo">Salvo</option>
                  <option value="adicionado">Adicionado</option>
                  <option value="atualizado">Atualizado</option>
                  <option value="deletado">Deletado</option>
                  <option value="salvos no estoque">Salvos no estoque</option>
                  <option value="inseridos no estoque">Inseridos no estoque</option>
                  <option value="dados baixa">Dados baixa</option>
                  <option value="declarados como perdidos">Declarado perdido</option>
                  <option value="declarados como achados">Declarado achado</option>
              </select>
          </div>
        </div>

    </div>

      <br />

      <table class="table is-fullwidth is-bordered is-hoverable">
        <tbody>
          <tr v-for="lembrete in dadosCarregados" :key="lembrete.id">
                <td class="has-text-left">
                  <p>{{ lembrete.texto }}</p>
                  <small>{{ tempoIntervalo(lembrete.dataHora) }}</small>
                  <span class="tag is-light">Adicionado por {{ lembrete.usuarioExecutor.nome }}</span>
                </td>

                <td>
                  <button class="button is-small" v-if="lembrete.texto.indexOf('deletado') === -1" @click="carregar(lembrete.texto)">
                      <fa icon="eye"></fa>
                      Ver mais
                  </button>
                </td>
          </tr>
        </tbody>
      </table>

      <div
        v-if="dadosCarregados.length === 0"
        class="notification is-danger">
        Nenhum lembrete com este aspecto!
      </div>
    </div>
  </div>
</template>

<script>
import strMask from 'string-mask';
export default {
  name: 'Lembretes',

  data: () => ({
    modal: false,
    lembretes: [],
    busca: '',
    filtrarPorUsuario:  '',
    filtrarPorAcao: '',
    usuarios: [],
    verMais: {
      tipo: '',
      id: null,
    },
    carregado: {
      dados: null,
      tipo: '',
      multiplos: false,
    },
  }),

  mounted() {
    this.getLembretes();
    this.getUsuarios();
  },

  computed: {
    dadosCarregados(){
      let buscar = this.busca.toLowerCase();

      let carregados = this.lembretes.filter((res, index) => {
        let valoresRes = [];
        if(buscar === '' && this.filtrarPorUsuario === '' && this.filtrarPorAcao === '') return true
        else {
            if(buscar !== ''){
              let verificarExistenciaDeBusca = this.findInObject(res, buscar);
              if(verificarExistenciaDeBusca > 0) return true;
              return false;
            } else if(this.filtrarPorUsuario !== ''){
              if(res.usuarioExecutor.nome === this.filtrarPorUsuario) return true
              return false;
            } else if(this.filtrarPorAcao !== ''){
              let verificarExistenciaDeBusca = this.findInObject(res, this.filtrarPorAcao);
              if(verificarExistenciaDeBusca > 0) return true;
              return false;
            } else return true;
        }
        return false;
      });

      return carregados.reverse();
    }
  },

  methods: {
    tratarReq(texto) {
      const tratarTexto = {
        "Modelo de Produto": {
          tipo: 'produto',
          multiplos: false,
        },
        "O produto": {
          tipo: 'produto',
          multiplos: false,
        },

        "produtos do modelo": {
          tipo: 'produto',
          multiplos: false,
        },
        "produtos foram dados baixa dos modelos de": {
          tipo: 'produto',
          multiplos: true, // sempre depois do hífen
        },

        "Fornecedor": {
          tipo: 'fornecedor',
          multiplos: false,
        },
      };

      let final = Object.keys(tratarTexto).filter((res) => {
        if(texto.indexOf(res) >= 0) return true;
      });

      return tratarTexto[final[0]];
    },

    descobrirId(texto) {
      let id;
      let verificaMultiplosIds = texto.split('de id')[1].split(' ')[1] === '-';
      if(!verificaMultiplosIds){
        id = parseInt(texto.split('de id')[1].split(' ')[1]);
      }else {
        id = texto.split('-')[1].split(',').map(res => parseInt(res.replace(" ", "")));
      }

      return id;
    },

    carregar(texto){
      this.toggleLoad();
      let verificarTipo = this.tratarReq(texto);
      let listarId = this.descobrirId(texto);
      this.carregado.tipo = verificarTipo.tipo;

      if(!verificarTipo.multiplos){
        let pathRequisicao = verificarTipo.tipo === 'produto' ? 'modelos-produto' : 'estoque';
        let tipoId = verificarTipo.tipo === 'produto' ? 'idModelo' : 'idProduto';

        this.$http.get(`${process.env.API}/${pathRequisicao}/buscar-por-id?${tipoId}=${listarId}`, {
          headers: { Authorization: localStorage.getItem('USER_TOKEN') }
        })
        .then((res) => {
          this.toggleLoad();
          this.carregado.dados = res.body.data;
          this.modal = true;
        }, () => {
          this.toggleLoad();
          this.openToast();
        });
      }else{
        this.carregado.multiplos = true;
        this.carregado.dados = [];

        listarId.forEach(id => {
          this.$http.get(`${process.env.API}/modelos-produto/buscar-por-id?idModelo=${id}`, {
            headers: { Authorization: localStorage.getItem('USER_TOKEN') }
          })
          .then((res) => {
            this.toggleLoad();
            this.carregado.dados.push(res.body.data);
            this.modal = true;
          }, () => {
            this.toggleLoad();
            this.openToast();
          });
        });
      }
    },

    getLembretes() {
      this.toggleLoad();
      this.$http.get(`${process.env.API}/lembrete/listar-todos`, {
        headers: { Authorization: localStorage.getItem('USER_TOKEN') },
      })
      .then((res) => {
        this.toggleLoad();
        this.lembretes = res.body.data;
      },() => {
        this.toggleLoad();
        this.openToast();
      });
    },

    getUsuarios(){
      this.$http.get(`${process.env.API}/usuarios/listar-todos`, {
          headers: { Authorization: localStorage.getItem('USER_TOKEN') },
      })
      .then(res => this.usuarios = res.body.data );
    },

    mascarar(str, mask) {
      return  strMask.apply(str, mask);
    },

  },
};
</script>