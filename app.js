const inputTitulo = document.querySelector('#titulo_nota');
const inputNota = document.querySelector('#descripcion_nota');
const botonAñadir = document.querySelector('#añadir_nota');
const contenedorNotas = document.querySelector('.notas_generadas');

let notas = [];
document.addEventListener("DOMContentLoaded", () => {
    cargarFromLocalStorage();
});

botonAñadir.addEventListener('click', crearNuevaNota);

function crearNuevaNota() {
    const titulo = inputTitulo.value.trim();
    const descripcion = inputNota.value.trim();

    if (!titulo && !descripcion) return; 

    const nota = {
        id: Date.now(),
        titulo: titulo,
        descripcion: descripcion,
        fecha: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
        importante: false 
    }

    notas.push(nota);
    inputTitulo.value = "";
    inputNota.value = "";
    actualizarApp();
}

function renderizarNotas() {
    contenedorNotas.innerHTML = "";

    notas.forEach((nota) => {
        const contenedor = document.createElement("article");
        
        if (nota.importante) {
            contenedor.classList.add('importante');
        }

        const h3Titulo = document.createElement("h3");
        h3Titulo.innerText = nota.titulo || "Sin título";

        const pDescripcion = document.createElement("p");
        pDescripcion.innerText = nota.descripcion;
        pDescripcion.title = "Haz clic para expandir o contraer"; 

        pDescripcion.addEventListener('click', () => {
            contenedor.classList.toggle('expandida');
        });

        const smallFecha = document.createElement("small");
        smallFecha.innerText = nota.fecha;

        const btnImportante = document.createElement("button");
        btnImportante.innerText = nota.importante ? "Quitar Importante" : "Marcar Importante";
        
        const btnEliminar = document.createElement("button");
        btnEliminar.innerText = "Eliminar";

        btnImportante.addEventListener('click', () => {
            toggleImportante(nota.id);
        });

        btnEliminar.addEventListener('click', () => {
            eliminarNota(nota.id);
        });

        if (nota.titulo) contenedor.appendChild(h3Titulo); 
        contenedor.appendChild(pDescripcion);
        contenedor.appendChild(smallFecha);
        contenedor.appendChild(btnImportante);
        contenedor.appendChild(btnEliminar);

        contenedorNotas.appendChild(contenedor);
    });
}

function toggleImportante(id) {
    notas = notas.map(nota => {
        if (nota.id === id) {
            return { ...nota, importante: !nota.importante };
        }
        return nota;
    });
    actualizarApp();
}

function eliminarNota(id) {
    notas = notas.filter(nota => nota.id !== id);
    actualizarApp();
}
function ordenarNotas() {
    notas.sort((a, b) => {
        if (a.importante === b.importante) {
            return b.id - a.id;
        }
        return a.importante ? -1 : 1; 
    });
}

function actualizarApp() {
    ordenarNotas();       
    renderizarNotas();    
    guardarEnLocalStorage(); 
}

function guardarEnLocalStorage() {
    localStorage.setItem('mis_notas_enmanuel', JSON.stringify(notas));
}

function cargarFromLocalStorage() {
    const notasGuardadas = localStorage.getItem('mis_notas_enmanuel');
    if (notasGuardadas) {
        notas = JSON.parse(notasGuardadas);
        actualizarApp();
    }
}