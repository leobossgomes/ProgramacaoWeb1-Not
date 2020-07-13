<template>
  <div>
    <h2>Lista de Clientes</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Idade</th>
          <th>Email</th>
          <th>CPF</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!possuiClientes">
          <td colspan="4">Nenhum registro encontrado</td>
        </tr>
        <tr v-for="cliente in clientes" v-bind:key="cliente.id">
          <td>{{cliente.id}}</td>
          <td>{{cliente.nome}}</td>
          <td>{{cliente.idade}}</td>
          <td>{{cliente.email}}</td>
          <td>{{cliente.cpf}}</td>
          <td>
            <a href="#" v-on:click.prevent="editar(cliente)">editar</a> |
            <a href="#" v-on:click.prevent="excluir(cliente.id)">excluir</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  computed: {
    possuiClientes() {
      return this.clientes && this.clientes.length > 0;
    }
  },
  methods: {
    editar(cliente) {
      this.$parent.carregar(cliente);
    },
    excluir(id) {
      if (confirm("Deseja realmente excluir o cliente?")) {
        this.$parent.excluir(id);
      }
    }
  },
  props: { clientes: Array }
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
th {
  background: green;
  color: white;
}
td,
th {
  border: 1px solid #ddd;
  padding: 8px;
}
tr:nth-child(even) {
  background: #ddd;
}
tr:hover {
  background-color: #aaa;
}
</style>