var empregado = null
var codigo = 0;

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var objRetornado = JSON.parse(this.responseText);

        for (var i = 0; i < objRetornado.data.length; i++) {
            inserirEmpregado(objRetornado.data[i]);
        }
    }
};
xhttp.open("GET", "http://dummy.restapiexample.com/api/v1/employees", true);
xhttp.send();



function onFormSubmit() {
    if (validar()) {
        var formData = lerDoFormulario();
        if (empregado == null) {
            inserirEmpregado(formData);
            alert("Empregado criado");
        }
        else {
            atualizarRegistro(formData);
            alert("Empregado alterado");
        }
        resetarFormulario();
    }
}

function lerDoFormulario() {
    var formData = {};
    formData["id"] = document.getElementById("id").value;;
    formData["employee_name"] = document.getElementById("nomeCompleto").value;
    formData["employee_salary"] = document.getElementById("salario").value;
    formData["employee_age"] = document.getElementById("idade").value;
    return formData;
}

function inserirEmpregado(data) {
    var table = document.getElementById("listaDeEmpregados").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell0 = newRow.insertCell(0);
    cell0.innerHTML = data.id;
    cell1 = newRow.insertCell(1);
    cell1.innerHTML = data.employee_name;
    cell2 = newRow.insertCell(2);
    cell2.innerHTML = data.employee_salary;
    cell3 = newRow.insertCell(3);
    cell3.innerHTML = data.employee_age;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdite(this)">Editar</a>
                       <a onClick="onDelete(this)">Deletar</a>`;
    enviarEmpregado(data);
}

function enviarEmpregado(data) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://dummy.restapiexample.com/api/v1/create", true);

    var novoEmp = {
        id: data.id,
        nomeCompleto: data.employee_name,
        salario: data.employee_salary,
        idade: data.employee_age,
    }

    xhttp.send(JSON.stringify(novoEmp));
}

function resetarFormulario() {
    document.getElementById("id").value = "";
    document.getElementById("nomeCompleto").value = "";
    document.getElementById("salario").value = "";
    document.getElementById("idade").value = "";
    empregado = null;
}

function onEdite(td) {
    empregado = td.parentElement.parentElement;
    document.getElementById("id").value = empregado.cells[0].innerHTML;
    document.getElementById("nomeCompleto").value = empregado.cells[1].innerHTML;
    document.getElementById("salario").value = empregado.cells[2].innerHTML;
    document.getElementById("idade").value = empregado.cells[3].innerHTML;
}
function atualizarRegistro(formData) {
    empregado.cells[0].innerHTML = formData.id;
    empregado.cells[1].innerHTML = formData.employee_name;
    empregado.cells[2].innerHTML = formData.employee_salary;
    empregado.cells[3].innerHTML = formData.employee_age;
    atualizarEmpregado(JSON.stringify(formData));
}

function atualizarEmpregado(json) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "http://dummy.restapiexample.com/api/v1/update" + id, true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(xhr.responseText));
        }
    };
    xhttp.send(json);
}

function onDelete(td) {
    if (confirm('Você quer mesmo excluir este empregado?')) {
        row = td.parentElement.parentElement;
        document.getElementById("listaDeEmpregados").deleteRow(row.rowIndex);
        deletarEmpregado(row.firstElementChild.innerText)
        resetarFormulario();
    }
}

function deletarEmpregado(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                console.log(JSON.parse(xhr.responseText));
            }
        }
    };
    xhttp.open("DELETE", "http://dummy.restapiexample.com/api/v1/delete/" + id, true);
    xhttp.send(null);
}

function validar() {
    ehValido = true;
    if (document.getElementById("nomeCompleto").value == "") {
        ehValido = false;
        document.getElementById("validadcaoNomeCompleto").classList.remove("hide");
    } else {
        ehValido = true;
        if (!document.getElementById("validadcaoNomeCompleto").classList.contains("hide"))
            document.getElementById("validadcaoNomeCompleto").classList.add("hide");
    }
    return ehValido;
}