<template>
  <div>
    <Cliente></Cliente>
  </div>
</template>

<script>
import Vue from "vue";
import Cliente from "./components/Clientes";

export default Vue.extend({
  components: {
    Cliente
  }
});
</script>

<style>
html,
body,
* {
  font-family: 'Times New Roman', Times, serif;
  box-sizing: border-box;
}
</style>