<template>
  <div>
    <FormClientes ref="FormClientes"></FormClientes>
    <ListaClientes v-bind:clientes="clientes"></ListaClientes>
  </div>
</template>

<script>
import FormClientes from "./FormClientes.vue";
import ListaClientes from "./ListaClientes.vue";
import Cliente from "../../models/Cliente";

export default {
  data() {
    return {
      proxId: 3,
      clientes: []
    };
  },
  mounted() {
    this.iniciar();
  },

  methods: {
    async iniciar() {
      let retornoListar = await Cliente.listar();
      retornoListar = retornoListar.data.data;
      this.clientes.push(retornoListar)
    },

    carregar(cliente) {
      this.$refs.FormClientes.carregar(cliente);
    },
    async salvar(cliente) {
      const ret = await cliente.salvar(cliente);
      cliente = ret.data.data;
      if (cliente.id) {
        const index = this.clientes.findIndex(x => x.id == cliente.id);
        const clientes = [...this.clientes]; //cria copia de alunos
        clientes[index] = cliente; //edita o aluno pelo indice
        this.clientes = clientes; //atualiza this.alunos
      } else {
        cliente.id = this.proxId;
        this.proxId++;
        this.clientes.push(cliente);
      }
    },
    excluir(id) {
      const index = this.clientes.findIndex(x => x.id == id);
      const cliente = this.clientes.find(x => x.id == id);
      this.clientes.splice(index, 1);
      cliente.deletar(id);
    }
  },
  components: {
    FormClientes,
    ListaClientes
  }
};
</script>

<style>
</style>