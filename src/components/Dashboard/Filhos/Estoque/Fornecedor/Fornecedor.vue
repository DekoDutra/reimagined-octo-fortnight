<template>
    <div class="estoque box">
        <div class="inicial" v-if="this.$route.name==='Fornecedor'">
            <h1 class="title is-4">Fornecedor</h1>
            <h2 class="subtitle is-6">Selecione uma ação que deseja realizar</h2>

            <router-link :to="{ path: '/fornecedor/adicionar' }">
                <div class="choose-option">
                    <fa icon="user-plus"></fa>
                    Adicionar fornecedor
                </div>
            </router-link>

            <router-link :to="{ path: '/fornecedor/gerenciar' }">
                <div class="choose-option">
                    <fa icon="users"></fa>
                    Gerenciar fornecedores
                </div>
            </router-link>
        </div>

        <router-view v-else></router-view>
    </div>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  name: 'Fornecedor',
};
</script>
