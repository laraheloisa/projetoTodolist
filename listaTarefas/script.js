const inputNovaTarefa = document.getElementById('input');
const btnCriaTarefa = document.getElementById('btnCriaTarefa');
const hrlinha = document.getElementById('linha');
const ullistaTarefas = document.getElementById('listadeTarefas');
const imgClipboard = document.getElementById('clipboard-img');
const divTexto1 = document.getElementById("texto1");
const divTexto2 = document.getElementById("texto2");
const tarefasCriadas = document.getElementById('tarefasCriadas');
const tarefasConcluidas = document.getElementById('tarefasConcluídas');

let lista = [];
let checks = [];
// carregar a lista do localStorage ao iniciar
carregarListaDoLocalStorage();

ullistaTarefas.textContent = ' ';

btnCriaTarefa.addEventListener('click', function() {
    if (inputNovaTarefa.value.trim() === '') {
        alert('Por favor, digite uma task');
        return;
    }

    lista.push({
        nome: inputNovaTarefa.value.trim(),
        check: false
    });
    mostraTarefas();
    divTexto1.textContent = " ";
    divTexto2.textContent = " ";
    if (hrlinha.parentNode) {
        hrlinha.parentNode.removeChild(hrlinha); // Localiza o pai do elemento linha e remove o elemento linha
    }
    clipboard();
    salvarListaNoLocalStorage(); 
});

inputNovaTarefa.addEventListener('click', function() {
    inputNovaTarefa.value = ' ';
});

function mostraTarefas() {
    let novalista = '';

    lista.forEach(tarefa => {
        let a = tarefa.check ? 'check' : 'circle';
        novalista += `
        <li class="task" id="${tarefa.nome}">
            <div>
                <button class="btnAcao" onclick="uncheck('${tarefa.nome}')">
                    <i class="material-icons" id="check${tarefa.nome}">${a}</i>
                </button>
            </div>
            <div class="nomeTarefaCriada" id="index${tarefa.nome}">${tarefa.nome}</div>
            <div>
                <button class="btnDelete" onclick="apagarTarefa('${tarefa.nome}')">
                    <i class="material-icons">delete_forever</i>
                </button>
            </div>
        </li>`;
    });

    ullistaTarefas.innerHTML = novalista;

    lista.forEach(tarefa => {
        let sublinhado = document.getElementById('index' + tarefa.nome);
        if (tarefa.check) {
            sublinhado.style.cssText = 'color: grey; text-decoration: line-through;';
        } else {
            sublinhado.style.cssText = 'color: white; text-decoration: none;';
        }
    });

    atualizarContagem();
    salvarListaNoLocalStorage(); 

}

function apagarTarefa(tarefaNome) {
    lista = lista.filter(tarefa => tarefa.nome !== tarefaNome);
    mostraTarefas();
    salvarListaNoLocalStorage(); 
}

function uncheck(tarefaNome) {
    let tarefa = lista.find(t => t.nome === tarefaNome);
    tarefa.check = !tarefa.check;

    let elemento = document.getElementById('check' + tarefaNome);
    let sublinhado = document.getElementById('index' + tarefaNome);

    if (tarefa.check) {
        elemento.innerHTML = 'check';
        sublinhado.style.cssText = 'color: grey; text-decoration: line-through;';
    } else {
        elemento.innerHTML = 'circle';
        sublinhado.style.cssText = 'color: white; text-decoration: none;';
    }

    salvarListaNoLocalStorage(); 
}

function atualizarContagem() {
    const totalTarefas = lista.length;
    const tarefasConcluidasCount = lista.filter(tarefa => tarefa.check).length;
    
    tarefasCriadas.textContent = totalTarefas;
    tarefasConcluidas.textContent = `${tarefasConcluidasCount} de ${totalTarefas}`;
}

function clipboard() {
    let task = inputNovaTarefa.value;
    if (task !== ' ')
        imgClipboard.style.display = 'none';
}

function salvarListaNoLocalStorage() {
    localStorage.setItem('listaTarefas', JSON.stringify(lista));
}

function carregarListaDoLocalStorage() {
    const tarefas = JSON.parse(localStorage.getItem('listaTarefas'));
    if (tarefas) {
        lista = tarefas;
        mostraTarefas();
    }
}



