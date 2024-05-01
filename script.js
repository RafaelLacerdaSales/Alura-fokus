const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPausebt = document.querySelector('#start-pause')
const iniciarouPausarbt = document.querySelector('#start-pause span')
const tempoTela = document.querySelector('#timer')
const iniciarouPausarbtIconi = document.querySelector('.app__card-primary-butto-icon')

const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const Sombeep = new Audio('/sons/beep.mp3')
const SomPause = new Audio('/sons/pause.mp3')
const SomPlay = new Audio('/sons/play.wav')

let tempoDecorridoEmsegundos = 1500 
let intervaloId = null

musica.loop = true

musicaFocoInput.addEventListener('change', () =>{
    if(musica.paused){
        musica.play()
    } else{
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmsegundos = 1
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmsegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmsegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostraTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            ` 
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}


const contagemRegressiva = () =>{
    if (tempoDecorridoEmsegundos <= 0 ){
        Sombeep.play()
        alert('Tempo finalizado!')
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const evento = new CustomEvent('focoFinalizado')
            document.dispatchEvent(evento)
        }
        zerar()
        return
    }
    tempoDecorridoEmsegundos -= 1
    mostraTempo()
}

startPausebt.addEventListener('click', iniciarouPausar)


function iniciarouPausar(){
    if(intervaloId){
        SomPause.play()
        zerar()
        return
    }
    SomPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarouPausarbtIconi.setAttribute('src' , '/imagens/pause.png')
    iniciarouPausarbt.textContent = "Pausar"
}

function zerar(){
    clearInterval(intervaloId)
    iniciarouPausarbt.textContent = "Começar"
    iniciarouPausarbtIconi.setAttribute('src' , '/imagens/play_arrow.png')
    intervaloId = null
}

function mostraTempo() {
    const tempo = new Date(tempoDecorridoEmsegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br',{ minute: '2-digit', second: '2-digit'} )
    tempoTela.innerHTML = `${tempoFormatado}`

}
mostraTempo()