var cliente = null
var codigo = 0;

var xhttp = new XMLHttpRequest();
xhttp.open("GET", "https://private-ca8518-leobossgomes.apiary-mock.com/clientes", true);
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var objRetornado = JSON.parse(this.responseText);

        for (var i = 0; i < objRetornado.data.length; i++) {
            inserirCliente(objRetornado.data[i]);
        }
    }
};
xhttp.send();



function onFormSubmit() {
    if (validar()) {
        var formData = lerDoFormulario();
        if (cliente == null) {
            inserirCliente(formData);
            alert("Cliente criado");
        }
        else {
            atualizarRegistro(formData);
            alert("Cliente alterado");
        }
        resetarFormulario();
    }
}

function lerDoFormulario() {
    var formData = {};
    formData["id"] = document.getElementById("id").value;;
    formData["nome"] = document.getElementById("nome").value;
    formData["telefone"] = document.getElementById("telefone").value;
    formData["email"] = document.getElementById("email").value;
    formData["cpf"] = document.getElementById("cpf").value;
    formData["rua"] = document.getElementById("rua").value;
	formData["numero"] = document.getElementById("numero").value;
	formData["complemento"] = document.getElementById("complemento").value;
	formData["cep"] = document.getElementById("cep").value;
	formData["uf"] = document.getElementById("uf").value;
    return formData;
}

function inserirCliente(data) {
    var table = document.getElementById("listaDeClientes").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell0 = newRow.insertCell(0);
    cell0.innerHTML = data.id;
    cell1 = newRow.insertCell(1);
    cell1.innerHTML = data.nome;
    cell2 = newRow.insertCell(2);
    cell2.innerHTML = data.telefone;
    cell3 = newRow.insertCell(3);
    cell3.innerHTML = data.email;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = data.cpf;
    cell5 = newRow.insertCell(5);
    cell5.innerHTML = data.rua;
    cell6 = newRow.insertCell(6);
    cell6.innerHTML = data.numero;
    cell7 = newRow.insertCell(7);
    cell7.innerHTML = data.complemento;
    cell8 = newRow.insertCell(8);
    cell8.innerHTML = data.cep;
    cell9 = newRow.insertCell(9);
    cell9.innerHTML = data.uf;
    cell10 = newRow.insertCell(10);
    cell10.innerHTML = `<a onClick="onEdite(this)">Editar</a>
                       <a onClick="onDelete(this)">Deletar</a>`;
    enviarCliente(data);
}

function enviarCliente(data) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://private-ca8518-leobossgomes.apiary-mock.com/criacliente", true);

    var novoEmp = {
        id: data.id,
        nome: data.nome,
        telefone: data.telefone,
        email: data.email,
        cpf: data.cpf,
        rua: data.rua,
        numero: data.numero,
        complemento: data.complemento,
        cep: data.cep,
        uf: data.uf,
    }

    xhttp.send(JSON.stringify(novoEmp));
}

function resetarFormulario() {
    document.getElementById("id").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("rua").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("complemento").value = "";
    document.getElementById("cep").value = "";
    document.getElementById("uf").value = "";
    cliente = null;
}

function onEdite(td) {
    cliente = td.parentElement.parentElement;
    document.getElementById("id").value = cliente.cells[0].innerHTML;
    document.getElementById("nome").value = cliente.cells[1].innerHTML;
    document.getElementById("telefone").value = cliente.cells[2].innerHTML;
    document.getElementById("email").value = cliente.cells[3].innerHTML;
    document.getElementById("cpf").value = cliente.cells[4].innerHTML;
    document.getElementById("rua").value = cliente.cells[5].innerHTML;
    document.getElementById("numero").value = cliente.cells[6].innerHTML;
    document.getElementById("complemento").value = cliente.cells[7].innerHTML;
    document.getElementById("cep").value = cliente.cells[8].innerHTML;
    document.getElementById("uf").value = cliente.cells[9].innerHTML;
}
function atualizarRegistro(formData) {
    cliente.cells[0].innerHTML = formData.id;
    cliente.cells[1].innerHTML = formData.nome;
    cliente.cells[2].innerHTML = formData.telefone;
    cliente.cells[3].innerHTML = formData.email;
    cliente.cells[4].innerHTML = formData.cpf;
    cliente.cells[5].innerHTML = formData.rua;
    cliente.cells[6].innerHTML = formData.numero;
    cliente.cells[7].innerHTML = formData.complemento;
    cliente.cells[8].innerHTML = formData.cep;
    cliente.cells[9].innerHTML = formData.uf;    
    atualizarCliente(JSON.stringify(formData));
}

function atualizarCliente(json) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "https://private-ca8518-leobossgomes.apiary-mock.com/updatecliente/" + id, true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(xhr.responseText));
        }
    };
    xhttp.send(json);
}

function onDelete(td) {
    if (confirm('Você quer mesmo excluir este cliente?')) {
        row = td.parentElement.parentElement;
        document.getElementById("listaDeClientes").deleteRow(row.rowIndex);
        deletarCliente(row.firstElementChild.innerText)
        resetarFormulario();
    }
}

function deletarCliente(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                console.log(JSON.parse(xhr.responseText));
            }
        }
    };
    xhttp.open("DELETE", "https://private-ca8518-leobossgomes.apiary-mock.com/deletecliente/" + id, true);
    xhttp.send(null);
}

function validar() {
    ehValido = true;
    if (document.getElementById("nome").value == "") {
        ehValido = false;
        document.getElementById("validadcaoNomeCompleto").classList.remove("hide");
    } else {
        ehValido = true;
        if (!document.getElementById("validadcaoNomeCompleto").classList.contains("hide"))
            document.getElementById("validadcaoNomeCompleto").classList.add("hide");
    }
    return ehValido;
}


