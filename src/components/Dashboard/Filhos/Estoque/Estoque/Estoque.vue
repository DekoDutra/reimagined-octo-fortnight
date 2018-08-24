<template>
    <div>
        <div class="estoque box" v-if="this.$route.name === 'Estoque'">
            <div class="inicial">
                <h1 class="title is-4">Produto</h1>
                <h2 class="subtitle is-6">Selecione uma ação que deseja realizar</h2>

                <router-link :to="{ path: '/estoque/adicionar' }">
                    <div class="choose-option">
                        <fa icon="box-open"></fa>
                        Adicionar ao estoque
                    </div>
                </router-link>

                <router-link :to="{ path: '/estoque/gerenciar' }">
                    <div class="choose-option">
                        <fa icon="boxes"></fa>
                        Gerenciar estoque
                    </div>
                </router-link>
            </div>

        </div>
        <router-view v-else></router-view>
    </div>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  name: 'Estoque',
};
</script>
