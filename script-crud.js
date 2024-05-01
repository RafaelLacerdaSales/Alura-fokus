const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const formAdicionarTarefa = document.querySelector('.app__form-add-task')
const Textarea = document.querySelector('.app__form-textarea')
const ulTarefas = document.querySelector('.app__section-task-list')
const btnCancelar = document.querySelector('.app__form-footer__button--cancel')
const paragafoDescicaoTarefa = document.querySelector('.app__section-active-task-description')
const btnDeletar = document.querySelector('.app__form-footer__button--delete')

const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas')
const btnremoverTodas = document.querySelector('#btn-remover-todas')

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
let tarefaSelecionada = null
let LitarefaSelecionada = null


function atualizarTarefas () {
    localStorage.setItem('tarefas' , JSON.stringify(tarefas))
}

function criarElementoTarefa(tarefa){
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
    <li class="app__section-task-list-item">
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `
    const paragafo = document.createElement('P')
    paragafo.textContent = tarefa.descricao
    paragafo.classList.add('app__section-task-list-item-description')


    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')

   
const limparFormulario = () => {
    Textarea.value = ''
    formAdicionarTarefa.classList.add('hidden'); 
}

btnCancelar.addEventListener('click', limparFormulario)


botao.onclick = () => {
    const novaDescricao = prompt("Qual é o novo nome da tarefa?")
    if (novaDescricao) {
        paragafo.textContent = novaDescricao
        tarefa.descricao = novaDescricao
        atualizarTarefas()
    }

    botao.onclick = () => {
        const novaDescricao = prompt("Qual é o novo nome da tarefa?")
        if (novaDescricao) {
            paragafo.textContent = novaDescricao
            tarefa.descricao = novaDescricao
            atualizarTarefas()
        }
}
    }

    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src','/imagens/edit.png')
    botao.append(imagemBotao)

    li.append(svg)
    li.append(paragafo)
    li.append(botao)

    if (tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete')
        botao.setAttribute('disabled' , 'true')
    } else{
        li.onclick = () =>{
            document.querySelectorAll('.app__section-task-list-item-active')
            .forEach(elemento => {
            elemento.classList.remove('app__section-task-list-item-active')
            })
           if (tarefaSelecionada == tarefa){
            paragafoDescicaoTarefa.textContent = ''
            tarefaSelecionada = null
            LitarefaSelecionada = null
            return
           }
           tarefaSelecionada = tarefa
           LitarefaSelecionada = li
            paragafoDescicaoTarefa.textContent = tarefa.descricao
         
            li.classList.add('app__section-task-list-item-active')
    
        }

    }


    return(li)
}

btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden')
})

formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: Textarea.value
    }
    tarefas.push(tarefa)
    const elemaentoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elemaentoTarefa)
    atualizarTarefas()
    Textarea.value = ''
    formAdicionarTarefa.classList.add('hidden')
})

tarefas.forEach(tarefa => {
   const elementoTarefa = criarElementoTarefa(tarefa)
   ulTarefas.append(elementoTarefa)
});

document.addEventListener('focoFinalizado' , () => {
    if (tarefaSelecionada && LitarefaSelecionada ) {
        LitarefaSelecionada.classList.remove('app__section-task-list-item-active')
        LitarefaSelecionada.classList.add('app__section-task-list-item-complete')
        LitarefaSelecionada.querySelector('button').setAttribute('disabled' , 'true')
        tarefaSelecionada.completa = 'true' 
        atualizarTarefas()
    }
})

const removerTarefas = (somenteCompletas) => {
    const seletor = somenteCompletas ? ".app__section-task-list-item-complete" : ".app__section-task-list-item"
    document.querySelectorAll(seletor).forEach(elemento =>{
        elemento.remove()
    })
    tarefas = somenteCompletas ? tarefas.filter(tarefa => !tarefa.completa) : []
    atualizarTarefas()
}

btnRemoverConcluidas.onclick = () => removerTarefas(true)
btnremoverTodas.onclick = () => removerTarefas(false)