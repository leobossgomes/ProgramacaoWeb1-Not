// CRUD setores

var setor = null
var codigoSetor = 0;

var xhttp = new XMLHttpRequest();
xhttp.open("GET", "https://private-ca8518-leobossgomes.apiary-mock.com/departamentos", true);
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var objRetornado = JSON.parse(this.responseText);

        for (var i = 0; i < objRetornado.data.length; i++) {
            inserirSetor(objRetornado.data[i]);
        }
    }
};
xhttp.send();

function onFormSubmit() {
    if (validarSetor()) {
        var formData = lerDoFormularioSetor();
        if (setor == null) {
            inserirSetor(formData);
            alert("Setor criado");
        }
        else {
            atualizarRegistroSetor(formData);
            alert("Setor alterado");
        }
        resetarFormularioSetor();
    }
}

function lerDoFormularioSetor() {
    var formData = {};
    formData["id_dep"] = document.getElementById("id_dep").value;;
    formData["nome"] = document.getElementById("nome").value;
    formData["integrantes"] = document.getElementById("integrantes").value;
    formData["carga_horaria"] = document.getElementById("carga_horaria").value;
    return formData;
}

function inserirSetor(data) {
    var table = document.getElementById("listaDeSetores").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell0 = newRow.insertCell(0);
    cell0.innerHTML = data.id_dep;
    cell1 = newRow.insertCell(1);
    cell1.innerHTML = data.nome;
    cell2 = newRow.insertCell(2);
    cell2.innerHTML = data.integrantes;
    cell3 = newRow.insertCell(3);
    cell3.innerHTML = data.carga_horaria;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdite(this)">Editar</a>
                       <a onClick="onDelete(this)">Deletar</a>`;
    enviarSetor(data);
}

function enviarSetor(data) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://private-ca8518-leobossgomes.apiary-mock.com/criadepartamento", true);

    var novoSetor = {
        id_dep: data.id_dep,
        nome: data.nome,
        integrantes: data.integrantes,
        carga_horaria: data.carga_horaria
    }

    xhttp.send(JSON.stringify(novoSetor));
}

function resetarFormularioSetor() {
    document.getElementById("id_dep").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("integrantes").value = "";
    document.getElementById("carga_horaria").value = "";
    setor = null;
}

function onEdite(td) {
    setor = td.parentElement.parentElement;
    document.getElementById("id_dep").value = setor.cells[0].innerHTML;
    document.getElementById("nome").value = setor.cells[1].innerHTML;
    document.getElementById("integrantes").value = setor.cells[2].innerHTML;
    document.getElementById("carga_horaria").value = setor.cells[3].innerHTML;
}
function atualizarRegistroSetor(formData) {
    setor.cells[0].innerHTML = formData.id_dep;
    setor.cells[1].innerHTML = formData.nome;
    setor.cells[2].innerHTML = formData.integrantes;
    setor.cells[3].innerHTML = formData.carga_horaria;
    atualizarSetor(JSON.stringify(formData));
}

function atualizarSetor(json) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "https://private-ca8518-leobossgomes.apiary-mock.com/editadepartamento/" + id, true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(xhr.responseText));
        }
    };
    xhttp.send(json);
}

function onDelete(td) {
    if (confirm('Você quer mesmo excluir este Setor?')) {
        row = td.parentElement.parentElement;
        document.getElementById("listaDeSetores").deleteRow(row.rowIndex);
        deletarSetor(row.firstElementChild.innerText)
        resetarFormularioSetor();
    }
}

function deletarSetorSetor(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                console.log(JSON.parse(xhr.responseText));
            }
        }
    };
    xhttp.open("DELETE", "https://private-ca8518-leobossgomes.apiary-mock.com/deletesetor/" + id, true);
    xhttp.send(null);
}

function validarSetor() {
    ehValido = true;
    if (document.getElementById("nome").value == "") {
        ehValido = false;
        document.getElementById("validadcaoNomeSetor").classList.remove("hide");
    } else {
        ehValido = true;
        if (!document.getElementById("validadcaoNomeSetor").classList.contains("hide"))
            document.getElementById("validadcaoNomeSetor").classList.add("hide");
    }
    return ehValido;
}
