const inputNovaTarefa = document.getElementById('input')
const btnCriaTarefa = document.getElementById('btnCriaTarefa')
const hrlinha = document.getElementById('linha')
const ullistaTarefas = document.getElementById('listadeTarefas')
const btnDelete = document.getElementsByClassName('btnDelete')
const imgClipboard = document.getElementById('clipboard-img')
const divTexto1 = document.getElementById("texto1")
const divTexto2 = document.getElementById("texto2")
const tarefasCriadas = document.getElementById('tarefasCriadas');
const tarefasConcluidas = document.getElementById('tarefasConcluídas');


let lista = [];
let checks = [];
ullistaTarefas.textContent = ' ';

btnCriaTarefa.addEventListener('click', function(){

    if (inputNovaTarefa.value.trim() === '') {
        alert('Por favor, digite uma task');
        return;
    }

    
    lista.push(inputNovaTarefa.value.trim()) //adiciona um novo elemento no meu array
    
    checks.push("circle"+inputNovaTarefa.value.trim())
    mostraTarefas()
    divTexto1.textContent = " "
    divTexto2.textContent = " "
    hrlinha.parentNode.removeChild(linha) //localiza o pai do elemento linha e remove o elemento linha
    clipboard()


    
})

inputNovaTarefa.addEventListener('click', function(){
    inputNovaTarefa.value = ' ';
})

function mostraTarefas() {
    let novalista = []
    let x = 0;
    
    lista.forEach(tarefa => { //passa por cada item do array
        let a = 'circle'
        if ((checks[x]).includes('check')) {
            a = 'check'
        }
        novalista = novalista + `
        <li class="task" id="`+tarefa+`">
            <div>
                <button class="btnAcao" onclick="uncheck('`+tarefa+`')">
                    <i class="material-icons" id="check`+tarefa+`">`+a+`</i>
                </button>
            </div>
            <div class="nomeTarefaCriada" id='index`+tarefa+`'>${tarefa}</div>
            <div>
                <button class="btnDelete" onclick="apagarTarefa('`+tarefa+`')">
                    <i class="material-icons">delete_forever</i>
                </button>
            </div>
        </li> 
        `
        x++;
    })

    ullistaTarefas.innerHTML = novalista

    checks.forEach(check =>{
        let index = checks.indexOf(check)
        var tarefa = lista[index]
        let sublinhado = document.getElementById(('index'+ tarefa))
        if (check.includes("check")) {
            sublinhado.style.cssText = 'color: grey;' + 'text-decoration: line-through;'
        } else{
            sublinhado.style.cssText = 'color: white;' + 'text-decoration: none;'
        }
    })
    
    atualizarContagem()
}

    

function apagarTarefa(tarefa){
    var elemento = document.getElementById(tarefa)
    elemento.parentNode.removeChild(elemento);

    var index = lista.indexOf(tarefa)
    lista.splice(index, 1)
    checks.splice(index, 1);

    mostraTarefas();
    
}

function uncheck(tarefa){
    var elemento = document.getElementById(('check'+ tarefa))
    if (elemento.innerHTML == 'circle') {
        elemento.innerHTML = 'check'
        let index = lista.indexOf(tarefa)
        checks[index] = 'check'+tarefa
        let sublinhado = document.getElementById(('index'+ tarefa))
        sublinhado.style.cssText = 'color: grey;' + 'text-decoration: line-through;'

    } else{
        elemento.innerHTML = 'circle'
        let index = lista.indexOf(tarefa)
        checks[index] = 'circle'+tarefa
        let sublinhado = document.getElementById(('index'+ tarefa))
        sublinhado.style.cssText = 'color: white;' + 'text-decoration: none;'
    }

}


function atualizarContagem() {
    const totalTarefas = lista.length;
    const tarefasConcluidasCount = checks.filter(check => check.startsWith('check')).length;
    
    tarefasCriadas.textContent = totalTarefas;
    tarefasConcluidas.textContent = `${tarefasConcluidasCount} de ${totalTarefas}`;
}

function clipboard(){
    let task = inputNovaTarefa.value;
    if ( task !== ' ')
    imgClipboard.style.display = 'none'

}

