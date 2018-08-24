<template>
    <div class="estoque">
        <div class="inicial box" v-if="this.$route.name === 'Funcionarios'">
            <h1 class="title is-4">Funcionários</h1>
            <h2 class="subtitle is-6">Selecione uma ação que deseja realizar</h2>

            <router-link :to="{ path: '/rh/funcionarios/adicionar' }">
                <div class="choose-option">
                    <fa icon="user-plus"></fa>
                    Adicionar funcionário
                </div>
            </router-link>

            <router-link :to="{ path: '/rh/funcionarios/gerenciar' }">
                <div class="choose-option">
                    <fa icon="users"></fa>
                    Gerenciar funcionários
                </div>
            </router-link>
        </div>

        <router-view v-else></router-view>
    </div>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  name: 'Funcionarios',
};
</script>
