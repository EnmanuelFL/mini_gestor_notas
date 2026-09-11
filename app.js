const inputNota = document.querySelector('#descripcion_nota')
const buttoNota = document.querySelector('#añadir_nota')
let notas_generads = document.querySelector('.notas_generadas')
let notas = []

document.addEventListener("DOMContentLoaded", () => {
    guardarConfiguracionInicial();
});
buttoNota.addEventListener('click', pagina)
function pagina (){
    let nota = {    
        id: Date.now(),
        descripcion: inputNota.value,
        fecha: new Date(),
        importante: false
    }
    notas.push(nota)
    inputNota.value = ""
}
