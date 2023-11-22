/* Notions de bases */

//console.log("Hello world!")

/*let nomUtilisateur
let ageUtilisateur

nomUtilisateur = prompt("comment vous appelez-vous?")
ageUtilisateur = prompt("Quel est votre âge?")*/

/*let a = "Olivier";
let b = "au top";

console.log(a+" "+b)*/

/*alert(`bonjour ${nomUtilisateur}, vous avez ${ageUtilisateur} ans!`)*/

/* Premier script complet*/

let randomTarget = Math.floor(Math.random() * 100) +1
console.log(randomTarget)

let userNumber = null
let count = 0

while(userNumber != randomTarget) {
    count++
    userNumber = prompt("Devinez un nombre entre 1 et 100")

    if(isNaN(userNumber)){
        alert("il faut entrer un nombre")
    }else if(userNumber > randomTarget) {
        alert("C'est trop grand")
    } else if (userNumber < randomTarget){
        alert("C'est trop petit")
    } else {
        alert(`bravo vous avez trouvé en ${count} coups`)
    }
}



