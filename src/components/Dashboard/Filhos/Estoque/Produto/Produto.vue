<template>
    <div class="produto box">
        <div class="inicial" v-if="this.$route.name==='Produto'">
            <h1 class="title is-4">Modelos de Produto</h1>
            <h2 class="subtitle is-6">Selecione uma ação que deseja realizar</h2>

            <router-link :to="{ path: '/produto/novo' }">
                <div class="choose-option">
                    <fa icon="cart-plus"></fa>
                    Adicionar modelos
                </div>
            </router-link>

            <router-link :to="{ path: '/produto/gerenciar' }">
                <div class="choose-option">
                    <fa icon="people-carry"></fa>
                    Gerenciar modelos
                </div>
            </router-link>
    </div>

    <router-view v-else></router-view>
    </div>
</template>

<script>
export default {
  name: 'Produto',
};
</script>
