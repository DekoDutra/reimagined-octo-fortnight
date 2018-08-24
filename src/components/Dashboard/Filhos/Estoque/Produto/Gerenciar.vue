<template>
    <div class="novoProduto">
        <h1 class="title is-5">Gerenciar modelos de produtos</h1>
        <h1 class="subtitle is-7">Clique nas ações para editar ou excluir um produto</h1>

        <div :class="{ modal: true, 'is-active': modal }">
        <div class="modal-background"></div>
            <div class="modal-card is-large">
                <header class="modal-card-head">
                    <p class="modal-card-title">
                        {{ this.$route.name }}
                    </p>
                    <router-link :to="{ path: '/produto/gerenciar' }" replace>
                    <button
                        class="delete"
                        @click="modal=false">
                    </button>
                    </router-link>
                </header>
                <section class="modal-card-body">
                    <div v-if="this.$route.name === 'Editar produto'">

                        <div v-if="this.$route.params.tipo === 'fardamento'">
                            <form v-on:submit.prevent="editarProduto($route.params.tipo)">
                                <div class="field">
                                    <label>Função</label>
                                    <div class="control">
                                        <div class="select is-fullwidth">
                                            <select v-model="formulario.fardamento.funcao">
                                                <option value="Carga e Descarga">Carga e Descarga</option>
                                                <option value="Serviços Gerais">Serviços Gerais</option>
                                                <option value="Serviços Gerais de Shopping">Serviços Gerais de Shopping</option>
                                                <option value="Copeira de Shopping">Copeira de Shopping</option>
                                                <option value="Touca">Touca</option>
                                                <option value="Cozinheiro">Cozinheiro</option>
                                                <option value="Portaria (Blusa)">Portaria (Blusa)</option>
                                                <option value="Portaria (Calça)">Portaria (Calça)</option>
                                                <option value="Portaria (Gravata)">Portaria (Gravata)</option>
                                                <option value="Manutenção Predial">Manutenção Predial</option>
                                                <option value="Blusa de Evento Branca">Blusa de Evento Branca</option>
                                                <option value="Blusa Azul de Diarista">Blusa Azul de Diarista</option>
                                                <option value="Blusa Social de Escritório">Blusa Social de Escritório</option>
                                                <option value="Calça Social de Escritório">Calça Social de Escritório</option>
                                                <option value="Blusa da Staff">Blusa da Staff</option>
                                                <option value="Social Branca">Social Branca</option>
                                                <option value="Camisas Diversas">Camisas Diversas</option>
                                                <option value="Calças Diversas">Calças Diversas</option>
                                                <option value="Calças Jeans">Calças Jeans</option>
                                                <option value="Calças De Brin">Calças De Brin</option>
                                                <option value="Boné">Boné</option>
                                                <option value="Jardineiro">Jardineiro</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="columns">
                                    <div class="column">
                                        <div class="field">
                                            <label>Tamanho</label>
                                            <div class="control">
                                                <div class="select is-fullwidth">
                                                    <select v-model="formulario.fardamento.tamanho">
                                                        <option value="Tamanho único" selected>Tamanho único</option>
                                                        <option value="Em número">Em número</option>
                                                        <option value="PP">PP</option>
                                                        <option value="P">P</option>
                                                        <option value="M">M</option>
                                                        <option value="G">G</option>
                                                        <option value="GG">GG</option>
                                                        <option value="XG">XG</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column" v-if="formulario.fardamento.tamanho === 'Em número'">
                                        <div class="field">
                                            <label>Número</label>
                                            <div class="control">
                                                <input
                                                    type="number"
                                                    class="input is-fullwidth"
                                                    step="1"
                                                    min="1"
                                                    max="50"
                                                    v-model="formulario.fardamento.numeroDoTamanho"
                                                    placeholder="Digite um número"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column">
                                        <div class="field">
                                            <label>Sexo</label>
                                            <div class="control">
                                                <div class="select is-fullwidth">
                                                    <select v-model="formulario.fardamento.sexo">
                                                        <option value="Unissex" selected>Unissex</option>
                                                        <option value="Feminino">Feminino</option>
                                                        <option value="Masculino">Masculino</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="columns">
                                    <div class="column">
                                        <div class="field">
                                            <label>Fornecedor</label>
                                            <div class="control">
                                                <div class="select is-fullwidth">
                                                    <select v-model="formulario.fardamento.fornecedor.id">
                                                        <option disabled selected value="">Selecione um fornecedor</option>
                                                        <option v-for="fornecedor in fornecedores"  :key="fornecedor.id" :value="fornecedor.id">
                                                            {{ fornecedor.nomeFantasia }}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column">
                                        <div class="field">
                                            <label>Valor</label>
                                            <div class="control">
                                                <money
                                                    prefix="R$"
                                                    class="input is-fullwidth"
                                                    v-model="formulario.fardamento.valor"
                                                    placeholder="Digite um valor"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="columns">
                                    <div class="column">
                                        <div class="field">
                                            <label>Observação</label>
                                            <div class="control">
                                                <input
                                                    type="text"
                                                    class="input is-fullwidth"
                                                    v-model="formulario.fardamento.observacao"
                                                    placeholder="Digite uma observação"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" class="button is-warning inline-block">Editar</button>
                            </form>
                        </div>

                        <div v-else-if="this.$route.params.tipo === 'bota'">
                            <form v-on:submit.prevent="editarProduto($route.params.tipo)">
                                <div class="columns">
                                    <div class="column">
                                        <div class="field">
                                            <label>Material</label>
                                            <div class="control">
                                                <div class="select is-fullwidth">
                                                    <select v-model="formulario.bota.material">
                                                        <option value="Couro">Couro</option>
                                                        <option value="PVC">PVC</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column">
                                        <div class="field">
                                            <label>Tamanho</label>
                                            <div class="control">
                                                <input
                                                    type="number"
                                                    class="input is-fullwidth"
                                                    step="1"
                                                    min="1"
                                                    v-model="formulario.bota.tamanho"
                                                    placeholder="Digite um número"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column">
                                        <div class="field">
                                            <label>Estado</label>
                                            <div class="control">
                                                <div class="select is-fullwidth">
                                                    <select v-model="formulario.bota.estado">
                                                        <option value="Novo" selected>Novo</option>
                                                        <option value="Usado">Usado</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="columns">
                                    <div class="column">
                                        <div class="field">
                                            <label>Fornecedor</label>
                                            <div class="control">
                                                <div class="select is-fullwidth">
                                                    <select v-model="formulario.fardamento.fornecedor.id">
                                                        <option disabled selected value="">Selecione um fornecedor</option>
                                                        <option v-for="fornecedor in fornecedores"  :key="fornecedor.id" :value="fornecedor.id">
                                                            {{ fornecedor.nomeFantasia }}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column">
                                        <div class="field">
                                            <label>Modelo</label>
                                            <div class="control">
                                                <div class="select is-fullwidth">
                                                    <select v-model="formulario.bota.modelo">
                                                        <option value="Com biqueira de aço">Com biqueira de aço</option>
                                                        <option value="Sem biqueira de aço">Sem biqueira de aço</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column">
                                        <div class="field">
                                            <label>Valor</label>
                                            <div class="control">
                                                <money
                                                    prefix="R$"
                                                    class="input is-fullwidth"
                                                    v-model="formulario.bota.valor"
                                                    placeholder="Digite um valor"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="columns">
                                    <div class="column">
                                        <div class="field">
                                            <label>C.A.</label>
                                            <div class="control">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="1"
                                                    class="input is-fullwidth"
                                                    v-model="formulario.bota.ca"
                                                    placeholder="Digite um C.A."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column">
                                        <div class="field">
                                            <label>Observação</label>
                                            <div class="control">
                                                <input
                                                    type="text"
                                                    class="input is-fullwidth"
                                                    v-model="formulario.bota.observacao"
                                                    placeholder="Digite uma observação"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" class="button is-warning inline-block">Editar</button>
                            </form>
                        </div>

                        <div v-else-if="this.$route.params.tipo === 'epi'">
                            <form v-on:submit.prevent="editarProduto($route.params.tipo)">
                                <div class="field">
                                    <label>EPI</label>
                                    <div class="control">
                                        <div class="select is-fullwidth">
                                            <select v-model="formulario.epi.epi">
                                                <option value="Luva Latex">Luva Latex</option>
                                                <option value="Luva Latex resistente">Luva Latex resistente</option>
                                                <option value="Luva Pigmentada">Luva Pigmentada</option>
                                                <option value="Máscara Descartável">Máscara Descartável</option>
                                                <option value="Máscara com filtro">Máscara com filtro</option>
                                                <option value="Protetor Auricular">Protetor Auricular</option>
                                                <option value="Protetor Auricular Concha">Protetor Auricular Concha</option>
                                                <option value="Protetor Facial">Protetor Facial</option>
                                                <option value="Avental Raspa de Couro">Avental Raspa de Couro</option>
                                                <option value="Óculos Preto">Óculos Preto</option>
                                                <option value="Óculos Transparente">Óculos Transparente</option>
                                                <option value="Gravata">Gravata</option>
                                                <option value="Meia">Meia</option>
                                                <option value="Capacete">Capacete</option>
                                                <option value="Cinta Lombar">Cinta Lombar</option>
                                                <option value="Cinto de Segurança">Cinto de Segurança</option>
                                                <option value="Rádio">Rádio</option>
                                                <option value="Colete">Colete</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="columns">
                                    <div class="column">
                                        <div class="field">
                                            <label>Tamanho</label>
                                            <div class="control">
                                                <div class="select is-fullwidth">
                                                    <select v-model="formulario.epi.tamanho">
                                                        <option value="Tamanho único" selected>Tamanho único</option>
                                                        <option value="PP">PP</option>
                                                        <option value="P">P</option>
                                                        <option value="M">M</option>
                                                        <option value="G">G</option>
                                                        <option value="GG">GG</option>
                                                        <option value="XG">XG</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column">
                                        <div class="field">
                                            <label>Fornecedor</label>
                                            <div class="control">
                                                <div class="select is-fullwidth">
                                                    <select v-model="formulario.fardamento.fornecedor.id">
                                                        <option disabled selected value="">Selecione um fornecedor</option>
                                                        <option v-for="fornecedor in fornecedores"  :key="fornecedor.id" :value="fornecedor.id">
                                                            {{ fornecedor.nomeFantasia }}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column">
                                        <div class="field">
                                            <label>Valor</label>
                                            <div class="control">
                                                <money
                                                    prefix="R$"
                                                    class="input is-fullwidth"
                                                    v-model="formulario.epi.valor"
                                                    placeholder="Digite um valor"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="columns">
                                    <div class="column">
                                        <div class="field">
                                            <label>Observação</label>
                                            <div class="control">
                                                <input
                                                    type="text"
                                                    class="input is-fullwidth"
                                                    v-model="formulario.epi.observacao"
                                                    placeholder="Digite uma observação"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" class="button is-warning inline-block">Editar</button>
                            </form>
                        </div>

                        <div v-else-if="this.$route.params.tipo === 'bens'">
                            <form v-on:submit.prevent="editarProduto('bens')">
                                <div class="columns">

                                    <div class="column">
                                        <div class="field">
                                            <label>Modelo</label>
                                            <div class="control">
                                                <input
                                                    type="text"
                                                    class="input is-fullwidth"
                                                    v-model="formulario.bens.modelo"
                                                    placeholder="Digite um modelo"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column">
                                        <div class="field">
                                            <label>Marca</label>
                                            <div class="control">
                                                <input
                                                    type="text"
                                                    class="input is-fullwidth"
                                                    v-model="formulario.bens.marca"
                                                    placeholder="Digite uma marca"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column">
                                        <div class="field">
                                            <label>Categoria</label>
                                            <div class="control">
                                                <div class="select is-fullwidth">
                                                    <select v-model="formulario.bens.categoria">
                                                        <option value="Tamanho único" selected>Tamanho único</option>
                                                        <option value="PP">PP</option>
                                                        <option value="P">P</option>
                                                        <option value="M">M</option>
                                                        <option value="G">G</option>
                                                        <option value="GG">GG</option>
                                                        <option value="XG">XG</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="columns">

                                    <div class="column">
                                        <div class="field">
                                            <label>Fornecedor</label>
                                            <div class="control">
                                                <div class="select is-fullwidth">
                                                    <select v-model="formulario.bens.fornecedor.id">
                                                        <option disabled selected value="">Selecione um fornecedor</option>
                                                        <option v-for="(fornecedor) in fornecedores"  :key="fornecedor.id" :value="fornecedor.id">
                                                            {{ fornecedor.nomeFantasia }}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column">
                                        <div class="field">
                                            <label>Valor</label>
                                            <div class="control">
                                                <money
                                                    prefix="R$"
                                                    class="input is-fullwidth"
                                                    v-model="formulario.bens.valor"
                                                    placeholder="Digite um valor"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column">
                                        <div class="field">
                                            <label>Cor</label>
                                            <div class="control">
                                                <input
                                                    type="text"
                                                    class="input is-fullwidth"
                                                    v-model="formulario.bens.cor"
                                                    placeholder="Digite uma cor "
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column">
                                        <div class="field">
                                            <label>Número de série</label>
                                            <div class="control">
                                                <input
                                                    type="number"
                                                    class="input is-fullwidth"
                                                    v-model="formulario.bens.nSerie"
                                                    placeholder="Digite um número de série"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="columns">
                                    <div class="column">
                                        <div class="field">
                                            <label>Setor</label>
                                            <div class="control">
                                                <input
                                                    type="text"
                                                    class="input is-fullwidth"
                                                    v-model="formulario.bens.setor"
                                                    placeholder="Digite um setor"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column">
                                        <div class="field">
                                            <label>Responsável de uso</label>
                                            <div class="control">
                                                <input
                                                    type="text"
                                                    class="input is-fullwidth"
                                                    v-model="formulario.bens.responsavelDeUso"
                                                    placeholder="Digite um responsável de uso"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column">
                                        <div class="field">
                                            <label>Estado</label>
                                            <div class="control">
                                                <div class="select is-fullwidth">
                                                    <select v-model="formulario.bens.estado">
                                                        <option value="Novo" selected>Novo</option>
                                                        <option value="Usado">Usado</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="columns">
                                    <div class="column">
                                        <div class="field">
                                            <label>Observação</label>
                                            <div class="control">
                                                <input
                                                    type="text"
                                                    class="input is-fullwidth"
                                                    v-model="formulario.bens.observacao"
                                                    placeholder="Digite uma obervação"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" class="button is-warning inline-block">Enviar</button>
                                <router-link
                                    :to="{ path: '/produto' }">
                                    <button
                                        type="button"
                                        class="button inline-block">
                                        Cancelar
                                    </button>
                                </router-link>
                            </form>
                        </div>

                        <div v-else-if="this.$route.params.tipo === 'limpeza'">
                            <form v-on:submit.prevent="editarProduto($route.params.tipo)">
                                <div class="columns">
                                    <div class="column">
                                        <div class="field">
                                            <label>Produto</label>
                                            <div class="control">
                                                <div class="select is-fullwidth">
                                                    <select v-model="formulario.limpeza.nome">
                                                        <option value="Sabão" selected>Sabão</option>
                                                        <option value="Veja">Veja</option>
                                                        <option value="Álcool">Álcool</option>
                                                        <option value="Álcool em gel">Álcool em gel</option>
                                                        <option value="Detergente">Detergente</option>
                                                        <option value="Pano multiuso">Pano multiuso</option>
                                                        <option value="Pano de chão">Pano de chão</option>
                                                        <option value="Esponja">Esponja</option>
                                                        <option value="Saco de lixo 40L">Saco de lixo 40L</option>
                                                        <option value="Saco de lixo 100L">Saco de lixo 100L</option>
                                                        <option value="Saco de lixo 200L">Saco de lixo 200L</option>
                                                        <option value="Saco de lixo 300L">Saco de lixo 300L</option>
                                                        <option value="Pá de lixo pequena">Pá de lixa pequena</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column">
                                        <div class="field">
                                            <label>Valor</label>
                                            <div class="control">
                                                <money
                                                    prefix="R$"
                                                    class="input is-fullwidth"
                                                    v-model="formulario.limpeza.valor"
                                                    placeholder="Digite um valor"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="columns">
                                    <div class="column">
                                        <div class="field">
                                            <label>Fornecedor</label>
                                            <div class="control">
                                                <div class="select is-fullwidth">
                                                    <select v-model="formulario.limpeza.fornecedor.id">
                                                        <option disabled selected value="">Selecione um fornecedor</option>
                                                        <option v-for="(fornecedor) in fornecedores"  :key="fornecedor.id" :value="fornecedor.id">
                                                            {{ fornecedor.nomeFantasia }}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column">
                                        <div class="field">
                                            <label>Observação</label>
                                            <div class="control">
                                                <input
                                                    type="text"
                                                    class="input is-fullwidth"
                                                    v-model="formulario.limpeza.observacao"
                                                    placeholder="Digite uma observação"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" class="button is-warning inline-block">Enviar</button>
                                <router-link
                                    :to="{ path: '/produto' }">
                                    <button
                                        type="button"
                                        class="button inline-block">
                                        Cancelar
                                    </button>
                                </router-link>
                            </form>
                        </div>

                        <div v-else-if="this.$route.params.tipo === 'indefinido'">
                            <form v-on:submit.prevent="editarProduto($route.params.tipo)">
                                <div class="columns">
                                    <div class="column">
                                        <div class="field">
                                            <label>Nome</label>
                                            <div class="control">
                                                <input
                                                    type="text"
                                                    class="input is-fullwidth"
                                                    v-model="formulario.indefinido.nome"
                                                    placeholder="Digite um nome"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column">
                                        <div class="field">
                                        <label>categoria</label>
                                        <div class="control">
                                            <div class="select is-fullwidth">
                                                <select v-model="formulario.indefinido.categoria">
                                                    <option value="Eletrônico">Eletrônico</option>
                                                    <option value="Higiene">Higiene</option>
                                                    <option value="Papelaria">Papelaria</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>

                                <div class="columns">
                                    <div class="column">
                                        <div class="field">
                                            <label>Setor</label>
                                            <div class="control">
                                                <input
                                                    type="text"
                                                    class="input is-fullwidth"
                                                    v-model="formulario.indefinido.setor"
                                                    placeholder="Digite um setor"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column">
                                        <div class="field">
                                            <label>Fornecedor</label>
                                            <div class="control">
                                                <div class="select is-fullwidth">
                                                    <select v-model="formulario.fardamento.fornecedor.id">
                                                        <option disabled selected value="">Selecione um fornecedor</option>
                                                        <option v-for="fornecedor in fornecedores"  :key="fornecedor.id" :value="fornecedor.id">
                                                            {{ fornecedor.nomeFantasia }}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column">
                                        <div class="field">
                                            <label>Marca</label>
                                            <div class="control">
                                                <input
                                                    type="text"
                                                    class="input is-fullwidth"
                                                    v-model="formulario.indefinido.marca"
                                                    placeholder="Digite uma marca"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column">
                                        <div class="field">
                                            <label>Modelo</label>
                                            <div class="control">
                                                <input
                                                    type="text"
                                                    class="input is-fullwidth"
                                                    v-model="formulario.indefinido.modelo"
                                                    placeholder="Digite um modelo"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="columns">
                                    <div class="column">
                                        <div class="field">
                                            <label>Valor</label>
                                            <div class="control">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    step="0.1"
                                                    class="input is-fullwidth"
                                                    v-model="formulario.indefinido.valor"
                                                    placeholder="Digite um valor"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column">
                                        <div class="field">
                                            <label>Observação</label>
                                            <div class="control">
                                                <input
                                                    type="text"
                                                    class="input is-fullwidth"
                                                    v-model="formulario.indefinido.observacao"
                                                    placeholder="Digite uma observação"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" class="button is-warning inline-block">Editar</button>
                            </form>
                        </div>

                        <div v-else>Um erro ocorreu, por favor contacte o administrador!</div>
                    </div>

                    <div v-else-if="this.$route.name === 'Excluir produto'">
                        <p>Tem certeza que deseja remover este produto?</p>

                        <br>

                        <button
                            @click="excluirProduto($route.params.id)"
                            class="button is-danger inline-block">
                            Sim, excluir
                        </button>
                        <router-link :to="{ path: '/produto/gerenciar' }" replace>
                            <button
                                class="button inline-block"
                                @click="modal=false">
                                Não, cancelar!
                            </button>
                        </router-link>
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
                    <a @click="menuSelecionado='fardamentos'; pagina.atual=1">Fardamento</a>
                </li>
                <li :class="{ 'is-active': menuSelecionado === 'botas' }" @click="carregarDados('botas')">
                    <a @click="menuSelecionado='botas'; pagina.atual=1">Bota</a>
                </li>
                <li :class="{ 'is-active': menuSelecionado === 'epi' }" @click="carregarDados('epi')">
                    <a @click="menuSelecionado='epi'; pagina.atual=1">EPI</a>
                </li>
                <li :class="{ 'is-active': menuSelecionado === 'bens' }" @click="carregarDados('bens')">
                    <a @click="menuSelecionado = 'bens'; pagina.atual=1">Bens</a>
                </li>
                <li :class="{ 'is-active': menuSelecionado === 'limpeza' }" @click="carregarDados('limpeza')">
                    <a @click="menuSelecionado='limpeza'; pagina.atual=1">Material de limpeza</a>
                </li>
                <li :class="{ 'is-active': menuSelecionado === 'outros' }" @click="carregarDados('outros')">
                    <a @click="menuSelecionado='outros'; pagina.atual=1">Indefinido</a>
                </li>
            </ul>
        </div>

        <div class="columns" v-if="Object.keys(carregados[menuSelecionado]).length > 1">
            <div class="column is-four-fifths">
                <input
                    type="search"
                    class="input is-fullwidth"
                    v-model="busca"
                    placeholder="Digite uma busca nesta tabela"
                />
            </div>

            <div class="column" >
                <div
                    class="dropdown is-right is-fullwidth"
                    :class="{'is-active': filtros.aberto}">
                    <div class="dropdown-trigger button" @click="filtros.aberto = !filtros.aberto">
                        <span>Filtrar por coluna</span>
                        <fa icon="angle-down" style="margin-left: 10px;"/>
                    </div>
                    <div class="dropdown-menu">
                        <div class="dropdown-content">
                        <div class="dropdown-item">
														<strong>Filtros</strong>
														<div class="field is-grouped is-grouped-multiline">

															<div class="control" v-for="(filtro, index) in filtros.dados" :key="filtro.coluna">
																<div class="tags has-addons">
																	<span class="tag is-dark">{{ filtro.coluna }}</span>
																	<span class="tag">{{ filtro.texto }}</span>
																	<a class="tag is-delete" @click="filtrar(0,index)"></a>
																</div>

															</div>

														</div>

														<div class="columns">
															<div class="column">
																<div class="select is-fullwidth is-small">
																		<select v-model="filtro.coluna">
																				<option value="">Nenhum</option>
																				<option v-for="coluna in filtros.colunas" :key="coluna" :value="coluna">{{coluna}}</option>
																		</select>
																</div>
															</div>

															<div class="column is-half">
																	<input class="input is-small" v-model="filtro.texto" type="text" placeholder="Texto">
															</div>

															<div class="column has-text-centered">
																<div class="button is-small is-success" @click="filtrar()">Adicionar</div>
															</div>
														</div>
                        	</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="menuSelecionado === 'fardamentos'">
            <div
                v-if="Object.keys(carregados.fardamentos).length === 0"
                class="notification is-danger">
                Nenhum fardamento adicionado!
            </div>

            <table v-else class="table is-hoverable is-bordered is-fullwidth">
                <thead class="thead">
                    <th><a @click="ordenarTabela('funcao')">Função <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('tamanho')">Tamanho <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('sexo')">Sexo <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('fornecedor')">Fornecedor <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('valor')">Valor <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('observacao')">Observação <fa icon="sort" /></a></th>
                    <th></th>
                </thead>

                <tbody class="tbody">
                    <tr v-for="fardamento in dadosCarregados" :key="fardamento.id">
                        <td>{{ fardamento.funcao }}</td>
                        <td>{{ fardamento.tamanho }}</td>
                        <td>{{ fardamento.sexo }}</td>
                        <td>{{ fardamento.fornecedor.nomeFantasia }}</td>
                        <td>R${{ fardamento.valor.toString().replace('.',',') }}</td>
                        <td><small>{{ fardamento.observacao }}</small></td>
                        <td>
                            <button
                                class="button is-small is-success"
                                @click="carregar('editar', 'fardamento', fardamento.id)">
                                <fa icon="edit"></fa>
                                Editar
                            </button>

                            <button
                                class="button is-small is-danger"
                                @click="carregar('excluir', 'fardamento', fardamento.id)">
                                <fa icon="trash"></fa>
                                Excluir
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
                Nenhuma bota adicionada!
            </div>

            <table v-else class="table is-hoverable is-bordered is-notclick is-fullwidth">
                <thead class="thead">
                    <th><a @click="ordenarTabela('modelo')">Modelo <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('tamanho')">Tamanho <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('estado')">Estado <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('fornecedor')">Fornecedor <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('valor')">Valor <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('ca')">C.A. <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('observacao')">Observação <fa icon="sort" /></a></th>
                    <th></th>
                </thead>

                <tbody class="tbody">
                    <tr v-for="bota in dadosCarregados" :key="bota.id">
                        <td>{{ bota.modelo }}</td>
                        <td>{{ bota.tamanho }}</td>
                        <td>{{ bota.estado }}</td>
                        <td>{{ bota.fornecedor.nomeFantasia }}</td>
                        <td>R${{ bota.valor.toString().replace('.',',') }}</td>
                        <td>{{ bota.ca }}</td>
                        <td><small>{{ bota.observacao }}</small></td>
                        <td>
                            <button
                                class="button is-small is-success"
                                @click="carregar('editar', 'bota', bota.id)">
                                <fa icon="edit"></fa>
                                Editar
                            </button>

                            <button
                                class="button is-small is-danger"
                                @click="carregar('excluir', 'bota', bota.id)">
                                <fa icon="trash"></fa>
                                Excluir
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
                Nenhum EPI adicionado!
            </div>

            <table v-else class="table is-hoverable is-bordered is-notclick is-fullwidth">
                <thead class="thead">
                    <th><a @click="ordenarTabela('nome')">EPI <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('tamanho')">Tamanho <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('fornecedor')">Fornecedor <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('valor')">Valor <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('observacao')">Observação <fa icon="sort" /></a></th>
                    <th></th>
                </thead>

                <tbody class="tbody">
                    <tr v-for="epi in dadosCarregados" :key="epi.id">
                        <td>{{ epi.nome }}</td>
                        <td>{{ epi.tamanho }}</td>
                        <td>{{ epi.fornecedor.nomeFantasia }}</td>
                        <td>R${{ epi.valor.toString().replace('.',',') }}</td>
                        <td><small>{{ epi.observacao }}</small></td>
                        <td>
                            <button
                                class="button is-small is-success"
                                @click="carregar('editar', 'epi', epi.id)">
                                <fa icon="edit"></fa>
                                Editar
                            </button>

                            <button
                                class="button is-small is-danger"
                                @click="carregar('excluir', 'epi', epi.id)">
                                <fa icon="trash"></fa>
                                Excluir
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
                Nenhum bem adicionado!
            </div>

            <table v-else class="table is-hoverable is-bordered is-notclick is-fullwidth">
                <thead class="thead">
                    <th><a @click="ordenarTabela('modelo')">Modelo <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('marca')">Marca <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('categoria')">Categoria <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('fornecedor')">Fornecedor <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('valor')">Valor <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('cor')">Cor <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('nSerie')">Número de série <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('setor')">Setor <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('responsavelDeUso')">Responsável de uso <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('estado')">Estado <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('observacao')">Observação <fa icon="sort" /></a></th>
                    <th></th>
                </thead>

                <tbody class="tbody">
                    <tr v-for="bem in carregados.bens" :key="bem.id">
                        <td>{{ bem.modelo }}</td>
                        <td>{{ bem.marca }}</td>
                        <td>{{ bem.categoria }}</td>
                        <td>{{ bem.fornecedor.nomeFantasia }}</td>
                        <td>R${{ bem.valor.toString().replace('.',',') }}</td>
                        <td>{{ bem.cor }}</td>
                        <td>{{ bem.nSerie }}</td>
                        <td>{{ bem.setor }}</td>
                        <td>{{ bem.responsavelDeUso }}</td>
                        <td>{{ bem.estado }}</td>
                        <td>{{ bem.observacao }}</td>
                        <td>
                            <button
                                class="button is-small is-success"
                                @click="carregar('editar', 'bens', bem.id)">
                                <fa icon="edit"></fa>
                                Editar
                            </button>

                            <button
                                class="button is-small is-danger"
                                @click="carregar('excluir', 'bens', bem.id)">
                                <fa icon="trash"></fa>
                                Excluir
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
                Nenhum material de limpeza adicionado!
            </div>

            <table v-else class="table is-hoverable is-bordered is-notclick is-fullwidth">
                <thead class="thead">
                    <th><a @click="ordenarTabela('nome')">Produto <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('valor')">Valor <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('fornecedor')">Fornecedor <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('observacao')">Observação <fa icon="sort" /></a></th>
                    <th></th>
                </thead>

                <tbody class="tbody">
                    <tr v-for="material in dadosCarregados" :key="material.id">
                        <td>{{ material.nome }}</td>
                        <td>R${{ material.valor.toString().replace('.',',') }}</td>
                        <td>{{ material.fornecedor.nomeFantasia }}</td>
                        <td>{{ material.observacao }}</td>
                        <td>
                            <button
                                class="button is-small is-success"
                                @click="carregar('editar', 'limpeza', material.id)">
                                <fa icon="edit"></fa>
                                Editar
                            </button>

                            <button
                                class="button is-small is-danger"
                                @click="carregar('excluir', 'limpeza', material.id)">
                                <fa icon="trash"></fa>
                                Excluir
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
                Nenhum Indefinido adicionado!
            </div>

            <table v-else class="table is-hoverable is-bordered is-notclick is-fullwidth">
                <thead class="thead">
                    <th><a @click="ordenarTabela('nome')">Nome <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('categoria')">Categoria <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('setor')">Setor <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('fornecedor')">Fornecedor <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('marca')">Marca <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('modelo')">Modelo <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('valor')">Valor <fa icon="sort" /></a></th>
                    <th><a @click="ordenarTabela('observacao')">Observação <fa icon="sort" /></a></th>
                    <th></th>
                </thead>

                <tbody class="tbody">
                    <tr v-for="indefinido in dadosCarregados" :key="indefinido.id">
                        <td>{{ indefinido.nome }}</td>
                        <td>{{ indefinido.categoria }}</td>
                        <td>{{ indefinido.setor }}</td>
                        <td>{{ indefinido.fornecedor.nomeFantasia }}</td>
                        <td>{{ indefinido.marca }}</td>
                        <td>{{ indefinido.modelo }}</td>
                        <td>R${{ indefinido.valor.toString().replace('.',',') }}</td>
                        <td><small>{{ indefinido.observacao }}</small></td>
                        <td>
                            <button
                                class="button is-small is-success"
                                @click="carregar('editar', 'indefinido', indefinido.id)">
                                <fa icon="edit"></fa>
                                Editar
                            </button>

                            <button
                                class="button is-small is-danger"
                                @click="carregar('excluir', 'indefinido', indefinido.id)">
                                <fa icon="trash"></fa>
                                Excluir
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style lang="scss" scoped>
	.dropdown-menu {
		.dropdown-content {
			width: 500px;
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
export default {
  name: 'GerenciarProduto',

  data: () => ({
		filtros: {
			aberto: false,
			dados: [],
			colunas: [],
		},
		filtro: {
			coluna: '',
			texto: '',
		},
    modal: false,
    menuSelecionado: 'fardamentos',
    fornecedores: {},
    formulario: {
      fardamento: {
        funcao: 'Carga e Descarga',
        tamanho: 'Tamanho único',
        numeroDoTamanho: '',
        sexo: 'Unissex',
        fornecedor: '',
        valor: '',
        observacao: '',
      },

      bota: {
        material: 'Couro',
        tamanho: '',
        estado: 'Novo',
        fornecedor: '',
        modelo: 'Com biqueira de aço',
        valor: '',
        ca: '',
        observacao: '',
      },

      epi: {
        epi: 'Luva Latex',
        tamanho: 'Tamanho único',
        fornecedor: '',
        valor: '',
        observacao: '',
      },

      bens: {
        modelo: '',
        marca: '',
        fornecedor: {
          id: 0
        },
        valor: '',
        categoria: '',
        cor: '',
        nSerie: '',
        setor: '',
        responsavelDeUso: '',
        estado: 'Novo',
        observacao: '',
      },

      limpeza: {
        nome: 'Sabão',
        valor: '',
        fornecedor: {
          id: 0,
        },
        observacao: ''
      },

      indefinido: {
        nome: '',
        tipo: 'Eletrônico',
        setor: '',
        fornecedor: '',
        marca: '',
        modelo: '',
        valor: '',
        observacao: '',
      },
    },

    carregados: {
      fardamentos: {},
      botas: {},
      epi: {},
      bens: {},
      limpeza: {},
      outros: {},
    },

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
    this.carregarFornecedores();
    this.carregarDados('fardamentos'); // Carrego primeiro os fardamentos, pois é o primeiro menu
  },

  computed: {
    dadosCarregados(){
			let buscar = this.busca.toLowerCase();

			let filtros = this.carregados[this.menuSelecionado].filter((res,index) => {
				if(this.filtros.dados.length <= 0) return true
				else{
					let filtrarDado = [];
					let naoConsta = [];
					Object.keys(res).forEach((chave, ind) => {
						if(res[chave] != null && !["dataHora","deletado","cadastrante","tipoProduto"].includes(res)){
							this.filtros.dados.forEach((filtro) => {
								let valor = filtro.coluna !== 'fornecedor' ? res[filtro.coluna] : res[filtro.coluna].nomeFantasia;
								if(valor.toString().toLowerCase().indexOf(filtro.texto.toLowerCase()) >= 0){
									if(!filtrarDado.includes(res.id)){
										filtrarDado.push(res.id);
									}
								}else{
									if(!naoConsta.includes(res.id)){
										naoConsta.push(res.id);
									}
								}
							});
						}
					});

					let difference = filtrarDado.filter(x => !naoConsta.includes(x));

					return difference.length > 0
				}
			});

      let carregados = filtros.filter((res, index) => {
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
        if(this.ordenar.atual === 'fornecedor') {
          if(ant[this.ordenar.atual]['nomeFantasia'] < prox[this.ordenar.atual]['nomeFantasia']) return -1 * modifier;
          if(ant[this.ordenar.atual]['nomeFantasia'] > prox[this.ordenar.atual]['nomeFantasia']) return 1 * modifier;
        }else {
          if(ant[this.ordenar.atual] < prox[this.ordenar.atual]) return -1 * modifier;
          if(ant[this.ordenar.atual] > prox[this.ordenar.atual]) return 1 * modifier;
        }
        return 0;
      });
    }
  },

  methods: {
		filtrar(acao, index = null) {
			switch (acao) {
				case 0:
					this.filtros.colunas.push(this.filtros.dados[index].coluna);
					this.filtros.dados.splice(index,1);
				break;
			
				default:
					if(this.filtro.coluna !== '' && this.filtro.texto !== ''){
						this.filtros.dados.push(this.filtro);
						this.filtros.colunas.splice(this.filtros.colunas.indexOf(this.filtro.coluna), 1);
						this.filtro = {
							coluna: '',
							texto: '',
						};
					}else this.openToast('Preencha todos os campos!');
				break;
			}
		},


    ordenarTabela(elem){
      this.ordenar.atual = elem;
      this.ordenar.direcao = (this.ordenar.direcao === 'asc') ? 'desc' : 'asc';
    },

    carregarFornecedores(){
      this.$http.get(`${process.env.API}/fornecedores/listar-ativos`, {
        headers: {
          Authorization: localStorage.getItem('USER_TOKEN'),
        }
      })
      .then((res) => {
        this.fornecedores = res.body.data;
      }, () => {
        this.openToast();
      });
    },

    carregar(acao, tipo, id){
      this.toggleLoad();

      this.$http.get(`${process.env.API}/modelos-produto/buscar-por-id?idModelo=${id}`, {
        headers: { Authorization: localStorage.getItem('USER_TOKEN') }
      })
      .then((res) => {
        this.formulario[tipo] = res.body.data;
        this.$router.replace(`/produto/gerenciar/${acao}/${tipo}/${id}`);
        this.toggleLoad();
        this.modal = true;
      }, () => {
        this.toggleLoad();
        this.openToast();
      });
    },

    carregarDados(tipo) {
      this.toggleLoad();

      switch (tipo) { // Trata o tipo para não ir nenhum erro de requisição por tipos não-válidos
        case 'fardamento':
          tipo = 'fardamentos';
        break;
        case 'bota':
          tipo = 'botas';
        break;
        case 'EPI':
          tipo = 'epi';
        break;
        case 'indefinido':
          tipo = 'outros';
        break;
        default:
          tipo = tipo;
        break;
      }

      this.$http.get(`${process.env.API}/modelos-produto/listar-${tipo}`, {
        headers: { Authorization: localStorage.getItem('USER_TOKEN') }
      })
      .then((res) => {
				this.carregados[tipo] = res.body.data;

				this.filtros = { aberto: false, dados: [], colunas: [] };
				this.filtro = { coluna: '', texto: '' };

				if(Object.keys(this.carregados[tipo]).length > 0){
					this.filtros.colunas = Object.keys(this.carregados[tipo][0]).filter((res) => {
						return this.carregados[tipo][0][res] != null  && !["dataHora","deletado","cadastrante","tipoProduto"].includes(res)
					});
				}


        this.toggleLoad();
      }, (err) => {
        this.toggleLoad();
        this.openToast();
      });
    },

    editarProduto(tipo) {
      let erros = 0;
      const form = this.formulario[tipo];

      Object.keys(form).map((chave) => {
        // Para atributos com escolhas simultâneas eu tenho que fazer o seguinte:
        if ((Object.prototype.hasOwnProperty.call(form, 'numeroDoTamanho') && // Verifico se ele TEM o atributo numeroDoTamanho
            Object.prototype.hasOwnProperty.call(form, 'tamanho') && // Verifico se ele TEM o atributo tamanho
            form['tamanho'] === 'Em número' && // Verifico se ele selecionou "Em numero" no tamanho
            form['numeroDoTamanho'] === '') || // Verifico se ele deixou o campo de numero em branco
            (chave !== 'numeroDoTamanho' && form[chave] === '')) { // Ignoro o atributo numeroDoTamanho, pois já foi verificado acima

          this.openToast('Preencha todos os campos!');
          erros += 1; // Conto os erros
        }
      });

      if (erros === 0) {
        const copiaForm = JSON.parse(JSON.stringify(form)); // Copia o objeto form (metodo menos recomendado, mas único que funcionou)

      try { // Uso o try para caso alguma lógica estiver errada não escapar do escopo e acabar vazando para o usuário
        // Se ele tiver os campos citados acima, tenho que remover o numeroDoTamanho para poder formalizar o form antes de enviar ao banco

          if (Object.prototype.hasOwnProperty.call(copiaForm, 'tamanho') &&
              Object.prototype.hasOwnProperty.call(copiaForm, 'numeroDoTamanho')) {
            copiaForm.tamanho = copiaForm.numeroDoTamanho;
            delete copiaForm.numeroDoTamanho;
          }

          this.$http.put(`${process.env.API}/modelos-produto/atualizar`, copiaForm, {
            headers: { Authorization: localStorage.getItem('USER_TOKEN') }
          })
          .then((res) => {
            this.modal = false;
            this.openToast('Modelo de produto editado!');
            this.carregarDados(tipo);
          }, () => {
            this.openToast();
          });
        } catch(error) {
          this.openToast(error);
        }
      }
    },

    excluirProduto(id) {
      this.$http.delete(`${process.env.API}/modelos-produto/deletar?idModelo=${id}`, {
        headers: { Authorization: localStorage.getItem('USER_TOKEN') },
      })
      .then((res) => {
        this.carregarDados(this.menuSelecionado);
        this.openToast('Produto deletado com sucesso!');
        this.modal = false;
      }, () => {
          this.openToast();
      });
    },
  },
};
</script>
