/*Récupération des élèments html*/

let menu = document.getElementById("menu")
let zone = document.getElementById("gameZone")

/*définit les functions*/

function menuChange() {
    switch(menu.value) {
        case '1':
            fairNumber()
            break
        case '2':
            ticTacDoe()
            break
        case '3':
            nimGame()
            break
        default : 
            reset()
            break
    }  
}

function reset() {
    zone.innerHTML = ""
    zone.classList.remove('nimZone', 'ttdZone')
}

/**
 * Cette fonction déclenche le jeu du juste nomnbre
 */
function fairNumber() {
    /*initialiser la zone*/
    reset()
    zone.innerHTML = "<h2>Le jeu du juste nombre</h2>"

    /*on initialise les variables*/
    let randomTarget = Math.floor(Math.random() * 100) +1
    console.log(randomTarget)
    let count = 0
    let isOver = false
    let userNumber = null
    let message = ""

    let inputLine = document.createElement('div')
    inputLine.classList.add('inputLine')
    zone.appendChild(inputLine)

    /*on ajoute des élèments html*/
    let playerInput = document.createElement("input")
    playerInput.setAttribute('type', 'text')
    playerInput.setAttribute('id', 'playerInput')
    playerInput.setAttribute('placeholder', 'Tapez votre proposition')

    let inputLabel = document.createElement("label")
    inputLabel.setAttribute('for', 'playerInput')
    inputLabel.innerHTML = "Devinez un nombre entre 1 et 100"

    let submitButton = document.createElement("button")
    submitButton.innerHTML ="Valider"
    submitButton.addEventListener('click', compareNumber)

    inputLine.appendChild(inputLabel)
    inputLine.appendChild(playerInput)
    inputLine.appendChild(submitButton)

    let messageZone = document.createElement('div')
    zone.appendChild(messageZone)
    /*le fonctionnement du jeu*/
    function compareNumber() {       
        
        count++

        userNumber = parseInt(playerInput.value)
        message = `coup n°${count} - proposition : ${userNumber} - `
      
        if(isNaN(userNumber)){
            message = "il faut entrer un nombre"
        }else if(userNumber > randomTarget) {
            message += "C'est trop grand"
        } else if (userNumber < randomTarget){
            message += "C'est trop petit"
        } else {
            message += `bravo vous avez trouvé`
            isOver = true
        }

        let newMessage = document.createElement('p')
        newMessage.classList.add("fairLine")
        newMessage.innerHTML = message
        messageZone.appendChild(newMessage)

        if(isOver) {
            zone.removeChild(inputLine)
            let resetButton = document.createElement('button')
            resetButton.innerHTML ="Recommencer"
            resetButton.addEventListener('click', fairNumber)

            zone.appendChild(resetButton)
        }
        
    }

}

function ticTacDoe() {
    reset()
    

    /*déclaration des variable*/

    let squares = []
    let isActive = []
    let score = []
    let redPlayer = true;

    /*mise en page de la zone*/
    let infoPanel = document.createElement('div')
    infoPanel.classList.add('infoPanel')

    let grid = document.createElement('div')
    grid.classList.add('grid')

    zone.appendChild(infoPanel)
    zone.appendChild(grid)
    zone.classList.add('ttdZone')

    /*création de la grille*/

    for(let i=0; i<9; i++) {
        let square = document.createElement('div')
        square.classList.add('square')
        grid.appendChild(square)
        squares.push(square)
        isActive.push(true)
        score.push(0)
    }

    for(let i=0; i<9; i++) {
        squares[i].addEventListener('click', squareClick.bind(squares[i], i))
    }

    console.log(squares, isActive, score)

    /*fonctionnement du jeu*/

    /**
     * Déclenchée quand on clique sur un carré de la grille
     */
    function squareClick(squareNumber) {
       
        if(isActive[squareNumber]) {
            if(redPlayer) {
                this.style.backgroundImage = 'url("../assets/rouge.png")'
                score[squareNumber] = 1
            } else {
                this.style.backgroundImage = 'url("../assets/vert.png")'
                score[squareNumber] = 4
            }
            isActive[squareNumber] = false
            redPlayer = !redPlayer
            checkVictory()
            
        }       
    }

    function checkVictory() {
        let lineScore = [
            score[0]+score[1]+score[2],
            score[3]+score[4]+score[5],
            score[6]+score[7]+score[8],
            score[0]+score[3]+score[6],
            score[1]+score[4]+score[7],
            score[2]+score[5]+score[8],
            score[0]+score[4]+score[8],
            score[2]+score[4]+score[6]
        ]
        let endGameMessage = ""
        if(lineScore.includes(3)) {
            endGameMessage = "Victoire Rouge"
            endGame(endGameMessage)
        } else if (lineScore.includes(12)) {
            endGameMessage = "Victoire vert"
            endGame(endGameMessage)
        } else if (!isActive.includes(true)) {
            endGameMessage = "Egalité"
            endGame(endGameMessage)
        }
        
        console.log(lineScore, endGameMessage)
    }

    function endGame(endGameMessage) {
        for(let i = 0; i<8; i++) {
            isActive[i]=false
        }

        let gameOverMessage = document.createElement('h2')
        gameOverMessage.classList.add('gameOver')
        gameOverMessage.innerHTML = endGameMessage

        infoPanel.appendChild(gameOverMessage)

        let restartBut = document.createElement('button')
        restartBut.classList.add('bouton')
        restartBut.innerHTML ="Recommencer"
        restartBut.addEventListener('click', ticTacDoe)

        infoPanel.appendChild(restartBut)
    }
}


/*on configure les évènements*/

function nimGame() {
    reset()
    zone.classList.add('nimZone')

    /* variables*/

    let humanTurn = true
    let randomPlay = 1
    let startingSticks = 14
    let remainingStick = startingSticks
    let chosenSticks = 0
    let sticks = []
    let isGameOver = false

    /* mise en page de la zone */

    let titleBar = document.createElement('div')
    titleBar.classList.add('nimTitle')

    let title = document.createElement('h2')
    title.innerHTML = "Jeu de Nim"
    titleBar.appendChild(title)
    
    let sticksZone = document.createElement('div')
    sticksZone.classList.add('nimSticks')

    for(let i = 0; i < startingSticks; i++) {
        let stick = document.createElement('div')
        stick.classList.add('stick')
        sticksZone.appendChild(stick)
        sticks.push(stick)
        stick.addEventListener('click', stickChoice.bind(stick))
    }

    let submitZone = document.createElement('div')
    submitZone.classList.add('submitZone')
    let submitButton = document.createElement('button')
    submitButton.classList.add('bouton')
    submitButton.innerHTML = "Valider"
    submitButton.addEventListener('click', submitChoice)
    submitZone.appendChild(submitButton)

    zone.appendChild(titleBar)
    zone.appendChild(sticksZone)
    zone.appendChild(submitZone)

    /*fonctionnement*/
    function changeTurn() {
        humanTurn = !humanTurn
        if(humanTurn) {
            submitZone.appendChild(submitButton)
        } else {
            submitZone.removeChild(submitButton)
        }
    }

    function stickChoice() {
        if(humanTurn && !isGameOver) {
            if(this.classList.contains('chosen')) {
                this.classList.remove('chosen')
                chosenSticks--
            } else if(chosenSticks < 3) {
                this.classList.add('chosen')
                chosenSticks++
            }
        }     
        
    }

    function submitChoice() {
        if(chosenSticks!=0) {
            let stickSelected = document.querySelectorAll('.chosen')
            stickSelected.forEach((element)=>{sticksZone.removeChild(element)})
            
            chosenSticks = 0

            checkVictory()
            
            if(!isGameOver) {
                changeTurn()
                antagonistTurn()
            }
            
        }        
    }

    function checkVictory() {
        remainingStick = document.getElementsByClassName('stick').length
        console.log(remainingStick)
        if(remainingStick == 0) {
            let gameOverMessage = ""
            if(humanTurn) {
                gameOverMessage = "Vous avez perdu"
            } else {
                gameOverMessage = "Vous avez gagné"
            }

            let gameOver = document.createElement('div')
            gameOver.classList.add('gameOver')
            gameOver.innerHTML=gameOverMessage
            sticksZone.style.alignItems = "center"
            sticksZone.appendChild(gameOver)
            isGameOver = true
            if(humanTurn) {
                submitZone.removeChild(submitButton)
            }

            let restartButton = document.createElement('button')
            restartButton.classList.add('bouton')
            restartButton.innerHTML = "Recommencer"
            restartButton.addEventListener('click', nimGame)
            submitZone.appendChild(restartButton)

        }
    }

    function antagonistTurn() {
        if(remainingStick == 1) {
            antagonistStickNumber = 1
        } else if(remainingStick<=4) {
            antagonistStickNumber = remainingStick -1
        } else if(randomPlay>0 ||  remainingStick%4 == 1) {
            antagonistStickNumber = Math.floor(Math.random()*3)+1
            randomPlay --
        } else if(remainingStick%4 == 0) {
            antagonistStickNumber = 3
        } else {
            antagonistStickNumber = remainingStick%4 -1
        }

        

        let activeSticks = document.querySelectorAll('.stick')
        let step =0

        function antagonistSubmit() {
            let stickSelected = document.querySelectorAll('.chosen')
            stickSelected.forEach((element)=>{sticksZone.removeChild(element)})

            checkVictory()
            if(!isGameOver) {
                changeTurn()
            }
        }

        function antagonistChoice() {
            activeSticks[step].classList.add('chosen')
            antagonistStickNumber--
            step++
        }

        setTimeout(()=>{
            antagonistChoice()
            setTimeout(()=>{
                if(antagonistStickNumber>0) {
                    antagonistChoice()
                    setTimeout(()=>{
                        if(antagonistStickNumber>0) {
                            antagonistChoice()
                            setTimeout(()=>{
                                antagonistSubmit()
                            }
                            ,1000)
                        } else {
                            antagonistSubmit()
                        }
                    }
                    ,1000)
                } else {
                    antagonistSubmit()
                }
            }
            ,1000)
        },2000)
        
        
    }
 }

menu.addEventListener("change", menuChange)
