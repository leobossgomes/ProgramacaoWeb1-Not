<template>
  <form id="form-clientes" v-on:submit.prevent="onSubmit">
    <h2>Cadastrar cliente</h2>
    <p>
      <label for="nome">Nome:</label>
      <input name="nome" v-model="nome" />
    </p>
    <p>
      <label for="idade">Idade:</label>
      <input name="idade" v-model="idade" type="number" />
    </p>
    <p>
      <label for="email">Email:</label>
      <input name="email" v-model="email" type="email" />
    </p>
    <p>
      <label for="cpf">CPF:</label>
      <input name="cpf" v-model="cpf" />
    </p>
    <p>
      <div class="error">{{errorMessage}}</div>
      <input type="submit" value="Salvar" />
    </p>
  </form>
</template>

<script>
import Cliente from '../../models/Cliente';

export default {
  data() {
    return {
      errorMessage: "",
      id: "",
      nome: "",
      idade: "",
      email: "",
      cpf: ""
    };
  },
  methods: {
    onSubmit(e) {
      this.errorMessage = "";
      if (!this.nome) {
        this.errorMessage = "Nome é obrigatório"
        return;
      }
      const cliente = new Cliente(this.id, this.nome, this.idade, this.email, this.cpf);
      this.$parent.salvar(cliente);
      this.id = 0;
      this.nome = "";
      this.idade = "";
      this.email = "";
      this.cpf = "";
    },
    async carregar(cliente) {
      
      let ret = await new Cliente().editar(cliente);     
      cliente = ret.data.data;
      this.id = cliente.id;
      this.nome = cliente.nome;
      this.idade = cliente.idade;
      this.email = cliente.email;
      this.cpf = cliente.cpf;
    }
  }
};
</script>

<style>
.error {
  color: red;
}

#form-clientes {
  border: 1px solid #aaa;
  padding: 10px;
}
label {
  display: block;
}
</style>