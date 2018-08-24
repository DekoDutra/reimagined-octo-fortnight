<template>
  <div id="app">
    <div class="toast"></div>
    <div class="loading">
      <fa icon="spinner" spin />
    </div>

    <transition name="fade" mode="out-in" v-on:after-enter="afterEnter" appear>
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    USER_TOKEN: '',
  }),
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
