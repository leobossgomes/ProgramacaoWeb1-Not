import { http } from "./config";

class Cliente {
    constructor(id, nome, idade, email, cpf) {
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.email = email;
        this.cpf = cpf;
    }

    static listar() {
        const ret = http.get('clientes');
        return ret
    }

    salvar(cliente){
        const ret = http.post('criacliente', cliente);
        return ret;
    }

    editar(cliente){
        const ret = http.put('updatecliente/'+cliente.id, cliente)
        return ret;
    }

    deletar(id){
        const ret = http.delete('deletecliente/'+ id);
        return ret;
    }
}

export default Cliente;