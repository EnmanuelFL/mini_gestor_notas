const inputNota = document.querySelector('#descripcion_nota')
const buttoNota = document.querySelector('#añadir_nota')
let notas_generadas = document.querySelector('.notas_generadas')
let notas = []

document.addEventListener("DOMContentLoaded", () => {
    ConfiguracionInicial();
});
buttoNota.addEventListener('click', pagina)
function pagina (){
    if (!inputNota.value.trim()) return;
    let nota = {    
        id: Date.now(),
        descripcion: inputNota.value,
        fecha: new Date(),
        importante: true
    }
    notas.push(nota)
    inputNota.value = ""
    Notas_renderizadas()
}

function Notas_renderizadas (){
    notas_generadas.innerHTML = ""
    notas.forEach((nota)=>{
        const contenedor = document.createElement("article");
        const texto = document.createElement("p");
        texto.innerText = nota.descripcion;
        const fecha = document.createElement("small");
        fecha.innerText = nota.fecha.toLocaleDateString();
        const botonImportante = document.createElement("button");
        botonImportante.innerText = nota.importante ? "Importante: Sí" : "Marcar importante";
        const botonEliminar = document.createElement("button");
        botonEliminar.innerText = "Eliminar";
        
        contenedor.appendChild(texto);
        contenedor.appendChild(fecha);
        contenedor.appendChild(botonImportante);
        contenedor.appendChild(botonEliminar);
        notas_generadas.appendChild(contenedor);
    });
}

function local_storage () {
    localStorage.setItem('mis_notas', JSON.stringify(notas));
}