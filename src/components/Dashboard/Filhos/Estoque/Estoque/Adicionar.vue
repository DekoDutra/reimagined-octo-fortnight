<template>
  <div class="estoque box">
    <h1 class="title is-5">Adicionar ao estoque</h1>

    <form v-on:submit.prevent="adicionarAoEstoque">
      <div class="columns">
        <div class="column">
          <div class="field">
            <label>Produto</label>
            <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="tipo">
                    <option value="">Selecione um tipo de produto</option>
                    <option value="fardamentos">Fardamento</option>
                    <option value="botas">Bota</option>
                    <option value="epi">EPI</option>
                    <option value="bens">Bens</option>
                    <option value="limpeza">Material de limpeza</option>
                    <option value="outros">Indefinido</option>
                  </select>
                </div>
            </div>
          </div>
        </div>

        <div v-if="tipo !== '' && mostrarProdutos" class="column">
          <div class="field">
            <label>Produto</label>
            <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="produto.produto">
                    <option
                      v-for="(produto, key) in produto.produtos"
                      :key="key"
                      :value="key">
                      {{ toString(produto) }}
                    </option>
                  </select>
                </div>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label>Quantidade</label>
            <div class="control">
              <input
                type="number"
                step="1"
                min="1"
                class="input is-fullwidth"
                v-model="produto.quantidade"
                placeholder="Digite uma quantidade"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div v-if="tipo !== '' && mostrarProdutos" class="box">
        <h1 class="title is-5">Modelo de produto</h1>
        <h2 class="subtitle is-7">Visualize melhor as informações deste produto</h2>

        <div v-if="tipo === 'fardamentos'">
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
              <td>{{ produto.produtos[produto.produto].funcao }}</td>
              <td>{{ produto.produtos[produto.produto].sexo }}</td>
              <td>{{ produto.produtos[produto.produto].fornecedor.nomeFantasia }}</td>
              <td>{{ produto.produtos[produto.produto].tamanho }}</td>
              <td>R${{ produto.produtos[produto.produto].valor.toString().replace('.',',') }}</td>
              <td><small>{{ produto.produtos[produto.produto].observacao }}</small></td>
            </tbody>
          </table>
        </div>

        <div v-if="tipo === 'botas'">
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
              <td>{{ produto.produtos[produto.produto].modelo }}</td>
              <td>{{ produto.produtos[produto.produto].estado }}</td>
              <td>{{ produto.produtos[produto.produto].fornecedor.nomeFantasia }}</td>
              <td>{{ produto.produtos[produto.produto].tamanho }}</td>
              <td>R${{ produto.produtos[produto.produto].valor.toString().replace('.',',') }}</td>
              <td><small>{{ produto.produtos[produto.produto].observacao }}</small></td>
            </tbody>
          </table>
        </div>

        <div v-if="tipo === 'epi'">
          <table class="table is-bordered is-fullwidth">
            <thead class="thead">
              <th>EPI</th>
              <th>Fornecedor</th>
              <th>Tamanho</th>
              <th>Valor</th>
              <th>Observação</th>
            </thead>

            <tbody>
              <td>{{ produto.produtos[produto.produto].nome }}</td>
              <td>{{ produto.produtos[produto.produto].fornecedor.nomeFantasia }}</td>
              <td>{{ produto.produtos[produto.produto].tamanho }}</td>
              <td>R${{ produto.produtos[produto.produto].valor.toString().replace('.',',') }}</td>
              <td><small>{{ produto.produtos[produto.produto].observacao }}</small></td>
            </tbody>
          </table>
        </div>

        <div v-if="tipo === 'bens'">
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
              <td>{{ produto.produtos[produto.produto].modelo }}</td>
              <td>{{ produto.produtos[produto.produto].marca }}</td>
              <td>{{ produto.produtos[produto.produto].categoria }}</td>
              <td>{{ produto.produtos[produto.produto].cor }}</td>
              <td>{{ produto.produtos[produto.produto].fornecedor.nomeFantasia }}</td>
              <td>R${{ produto.produtos[produto.produto].valor.toString().replace('.',',') }}</td>
              <td><small>{{ produto.produtos[produto.produto].observacao }}</small></td>
            </tbody>
          </table>
        </div>

        <div v-if="tipo === 'limpeza'">
          <table class="table is-bordered is-fullwidth">
            <thead class="thead">
              <th>Produto</th>
              <th>Valor</th>
              <th>Fornecedor</th>
              <th>Observação</th>
            </thead>

            <tbody>
              <td>{{ produto.produtos[produto.produto].nome }}</td>
              <td>R${{ produto.produtos[produto.produto].valor.toString().replace('.',',') }}</td>
              <td>{{ produto.produtos[produto.produto].fornecedor.nomeFantasia }}</td>
              <td><small>{{ produto.produtos[produto.produto].observacao }}</small></td>
            </tbody>
          </table>
        </div>

        <div v-if="tipo === 'outros'">
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
              <td>{{ produto.produtos[produto.produto].nome }}</td>
              <td>{{ produto.produtos[produto.produto].setor }}</td>
              <td>{{ produto.produtos[produto.produto].marca }}</td>
              <td>{{ produto.produtos[produto.produto].modelo }}</td>
              <td>{{ produto.produtos[produto.produto].fornecedor.nomeFantasia }}</td>
              <td>R${{ produto.produtos[produto.produto].valor.toString().replace('.',',') }}</td>
              <td><small>{{ produto.produtos[produto.produto].observacao }}</small></td>
            </tbody>
          </table>
        </div>
      </div>

      <button type="submit" class="button is-warning inline-block" :disabled="tipo === ''">Adicionar</button>
    </form>

  </div>
</template>

<script>
export default {
  name: 'AdicionarAoEstoque',

  data: () => ({
    tipo: '',
    produto: {
      produto: '',
      quantidade: 1,
      produtos: {},
    },
    mostrarProdutos: false,
  }),

  watch: {
    tipo: function carregarProdutosConformeTipo() {
      this.toggleLoad();
      this.mostrarProdutos = false;
      if(this.tipo !== ''){
        this.carregarProdutos(this.tipo);
      } else {
        this.toggleLoad();
      }
    },
  },

  methods: {
    carregarProdutos(tipo) {
      let data;
      this.$http.get(`${process.env.API}/modelos-produto/listar-${tipo}`, {
        headers: { Authorization: localStorage.getItem('USER_TOKEN') }
      })
      .then((res) => {
        this.toggleLoad();
        this.produto.produtos = res.body.data;
        if (Object.keys(this.produto.produtos).length > 0) {
          this.mostrarProdutos = true;
          this.produto.produto = 0;
        } else {
          this.openToast('Nenhum produto nessa categoria!');
        }
      }, (err) => {
        this.toggleLoad();
        this.openToast();
      });
    },

    toString(produto) {
      switch (produto.tipoProduto) {
        case 'Fardamento':
          return `${produto.funcao}; ${produto.tamanho}; ${produto.sexo}; R$${produto.valor}; ${produto.observacao} `;
        break;

        case 'Botas':
          return `${produto.modelo}; ${produto.tamanho};  R$${produto.valor}; ${produto.observacao}`;
        break;

        case 'EPI':
          return `${produto.nome}; ${produto.tamanho};  R$${produto.valor}; ${produto.observacao}`;
        break;

        case 'Bens':
          return `${produto.modelo}, ${produto.marca}; ${produto.categoria};  R$${produto.valor}; ${produto.observacao}`;
        break;

        default:
          return `${produto.nome}; R$${produto.valor}; ${produto.observacao}`;
        break;
      }
    },

    adicionarAoEstoque() {
      this.toggleLoad();
      const produto = this.produto.produtos[this.produto.produto];

      produto['idModeloProduto'] = produto.id;
      delete produto.id;

      this.$http.post(`${process.env.API}/estoque/adicionar?qtd=${this.produto.quantidade}`, produto, {
        headers: { Authorization: localStorage.getItem('USER_TOKEN') }
      })
      .then((res) => {
        this.toggleLoad();
        this.openToast('Produto adicionado com sucesso ao estoque!');
      }, () => {
        this.toggleLoad();
        this.openToast();
      });
    },
  },
};
</script>
