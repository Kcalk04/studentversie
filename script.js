//vervanger van var
let variable = 5;
//var is verouderd
var getal = 4;
//constante dus niet te veranderen
const getalconst = 6;

console.log(getalconst);

let array = [1, 3, 5]

array.forEach(Element => 
    console.log(Element));

function printGetal() {
    console.log(getal);
}

let arrowFunction = () => 
{
    console.log("Hallo");
}

arrowFunction();

const pElement = document.querySelector('#resultaat');
console.log(pElement);

pElement.innerHTML = "Hallo"