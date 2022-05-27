const gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

let editedPlayer = 0
let activePlayer = 0
let currentRound = 1
let gameIsOver = false

const players = [
    {
        name: '',
        symbol: 'X'
    },
    {
        name: '',
        symbol: 'O'
    }
]

const playerOverlay = document.getElementById('config-overlay')
const backdropElement = document.getElementById('backdrop')

const formElement = document.querySelector('form')
const errorElement= document.getElementById('config-error')

const editPlayer1 = document.getElementById('edit-p1')
const editPlayer2 = document.getElementById('edit-p2')
const activePlayerName = document.getElementById('active-player-name')
const gameOverElement = document.getElementById('game-over')

const cancelConfig  = document.getElementById('cancel-config-btn')
const startGame = document.getElementById('startgame')
const gameArea = document.getElementById('active-game')
const gameFieldElements = document.querySelectorAll('#game-board li')
// or--> const gameBoardElement = document.getElementById('game-board')
const gameBoardElement = document.getElementById('game-board')

editPlayer1.addEventListener('click', openPlayerConfig)
editPlayer2.addEventListener('click', openPlayerConfig)

cancelConfig.addEventListener('click', closePlayerConfig)
backdropElement.addEventListener('click', closePlayerConfig)

formElement.addEventListener('submit', savePlayerConfig)

startGame.addEventListener('click', startNewGame)

for (const gameFieldElement of gameFieldElements) {
    gameFieldElement.addEventListener('click', selectGameField)
}
// or--> gameBoardElement.addEventListener('click', selectGameField)