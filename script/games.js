/*Récupération des élèments html*/

let menu = document.getElementById("menu")
let zone = document.getElementById("gameZone")

/*définit les functions*/

function menuChange() {
    switch(menu.value) {
        case '1':
            fairNumber()
            break
        default : 
            reset()
            break
    }  
}

function reset() {
    zone.innerHTML = ""
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
    let userNumber = null
    let message = ""

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

    zone.appendChild(inputLabel)
    zone.appendChild(playerInput)
    zone.appendChild(submitButton)

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
        }

        let newMessage = document.createElement('p')
        newMessage.innerHTML = message
        zone.appendChild(newMessage)
        
    }

}
/*on configure les évènements*/

menu.addEventListener("change", menuChange)
