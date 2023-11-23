/*on récupérère les éléments*/

let nav = document.getElementById("navBar")
let navButton = document.getElementById("navTrigger")
let main = document.getElementById('javaMain')

/*on crée de variables utiles*/

let isHidden = true

/*on définit les fonctions*/

function moveNav() {
    if(isHidden) {
        nav.style.transform ="translateX(20vw)"
        main.style.width = "80vw"
        main.style.left = "20vw"
        isHidden = false
    } else {
        nav.style.transform ="translateX(-20vw)"
        main.style.width = "100vw"
        main.style.left = "0"
        isHidden = true
    }
    
}

//on règle les évènements déclaencheur

navButton.addEventListener('click', moveNav)