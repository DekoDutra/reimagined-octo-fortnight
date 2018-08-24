<template>
    <div class="novoProduto">
        <h1 class="title is-5">Adicionar modelo de produto</h1>

        <div class="tabs is-fullwidth is-small">
            <ul>
                <li :class="{ 'is-active': menuSelecionado === 'fardamento' }">
                    <a @click="menuSelecionado='fardamento'">Fardamento</a>
                </li>
                <li :class="{ 'is-active': menuSelecionado === 'bota' }">
                    <a @click="menuSelecionado='bota'">Bota</a>
                </li>
                <li :class="{ 'is-active': menuSelecionado === 'EPI' }">
                    <a @click="menuSelecionado='EPI'">EPI</a>
                </li>
                <li :class="{ 'is-active': menuSelecionado === 'bens' }">
                    <a @click="menuSelecionado='bens'">Bens</a>
                </li>
                <li :class="{ 'is-active': menuSelecionado === 'limpeza' }">
                    <a @click="menuSelecionado='limpeza'">Limpeza</a>
                </li>
                <li :class="{ 'is-active': menuSelecionado==='indefinido' }">
                    <a @click="menuSelecionado='indefinido'">Indefinido</a>
                </li>
            </ul>
        </div>

        <div v-if="menuSelecionado === 'fardamento'">
            <form v-on:submit.prevent="adicionarProduto('fardamento')">
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
                                        <option value="EG">EG</option>
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

        <div v-if="menuSelecionado === 'bota'">
            <form v-on:submit.prevent="adicionarProduto('bota')">
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
                                    <select v-model="formulario.bota.fornecedor.id">
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

        <div v-if="menuSelecionado === 'EPI'">
            <form v-on:submit.prevent="adicionarProduto('epi')">
                <div class="field">
                    <label>EPI</label>
                    <div class="control">
                        <div class="select is-fullwidth">
                            <select v-model="formulario.epi.nome">
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
                                        <option value="EG">EG</option>
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
                                    <select v-model="formulario.epi.fornecedor.id">
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

        <div v-if="menuSelecionado === 'bens'">
            <form v-on:submit.prevent="adicionarProduto('bens')">

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
                                <input
                                    type="text"
                                    class="input is-fullwidth"
                                    v-model="formulario.bens.categoria"
                                    placeholder="Digite uma categoria"
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

        <div v-if="menuSelecionado === 'limpeza'">
            <form v-on:submit.prevent="adicionarProduto('limpeza')">

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

        <div v-if="menuSelecionado==='indefinido'">
            <form v-on:submit.prevent="adicionarProduto('indefinido')">
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
                        <label>Categoria</label>
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
                                    <select v-model="formulario.indefinido.fornecedor.id">
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
                                <money
                                    prefix="R$"
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
    </div>
</template>

<style lang="scss" scoped></style>


<script>
export default {
  name: 'NovoProduto',

  data: () => ({
    fornecedores: 'none',
    menuSelecionado: 'fardamento',
    formulario: {
      fardamento: {
        funcao: 'Carga e Descarga',
        tamanho: 'Tamanho único',
        numeroDoTamanho: '',
        sexo: 'Unissex',
        fornecedor: {
          id: 0
        },
        valor: '',
        observacao: '',
      },

      bota: {
        material: 'Couro',
        tamanho: '',
        estado: 'Novo',
        fornecedor: {
          id: 0
        },
        modelo: 'Com biqueira de aço',
        valor: '',
        ca: '',
        observacao: '',
      },

      epi: {
        nome: 'Luva Latex',
        tamanho: 'Tamanho único',
        fornecedor: {
          id: 0
        },
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
        categoria: 'Eletrônico',
        setor: '',
        fornecedor: {
          id: 0
        },
        marca: '',
        modelo: '',
        valor: '',
        observacao: '',
      },
    },
  }),

  beforeMount() {
      this.carregarFornecedores();
  },

  methods: {
    carregarFornecedores: function carregarFornecedores(){
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

    adicionarProduto(tipo) {
      let erros = 0;
      const form = this.formulario[tipo];
      const tipoProduto = {
        fardamento: 0, bota: 1, epi: 2, indefinido: 3, bens: 4, limpeza: 5
      };

      Object.keys(form).map(function verificarCampos(chave) {
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
          this.toggleLoad();

          if (Object.prototype.hasOwnProperty.call(copiaForm, 'tamanho') &&
              Object.prototype.hasOwnProperty.call(copiaForm, 'numeroDoTamanho')) {
            copiaForm.tamanho = (copiaForm.numeroDoTamanho !== '') ? copiaForm.numeroDoTamanho : copiaForm.tamanho;
            delete copiaForm.numeroDoTamanho;
          }

          copiaForm['tipoProduto'] = tipoProduto[tipo];

          this.$http.post(`${process.env.API}/modelos-produto/salvar`, copiaForm, {
            headers: { Authorization: localStorage.getItem('USER_TOKEN') }
          })
          .then((res) => {
            this.toggleLoad();
            this.openToast('Produto adicionado com sucesso!');
          }, () => {
            this.toggleLoad();
            this.openToast();
          });
        } catch(error) {
          this.toggleLoad();
          this.openToast(error);
        }
      }
    },
  },
};
</script>
