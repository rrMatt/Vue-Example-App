<template>
  <article id="app">
    <header class="mainHeader">
      <h1>Vue Example</h1>
    </header>
    <Shell />
  </article>
</template>

<script>
import Shell from './components/Shell'

export default {
  name: 'App',
  components: {
    Shell
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
