    const inputTitulo = document.querySelector('#titulo_nota');
    const inputNota = document.querySelector('#descripcion_nota');
    const buttoNota = document.querySelector('#añadir_nota')
    let notas_generadas = document.querySelector('.notas_generadas')
    let notas = []

    document.addEventListener("DOMContentLoaded", () => {
        Configuracion();
    });
    buttoNota.addEventListener('click', pagina)
    function pagina (){
    if (!inputNota.value.trim() && !inputTitulo.value.trim()) return; 
    let nota = {    
        id: Date.now(),
        titulo: inputTitulo.value,
        descripcion: inputNota.value,
        fecha: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
        importante: false 
    }
    notas.push(nota);
    inputTitulo.value = "";
    inputNota.value = "";
    
    local_storage();
    Notas_renderizadas();
}

    function Notas_renderizadas (){
        notas_generadas.innerHTML = ""
        notas.forEach((nota)=>{
            const contenedor = document.createElement("article");
            const titulo = document.createElement("h3");
            titulo.innerText = nota.titulo;
            if (nota.importante) {
                contenedor.style.borderLeftColor = "#f59e0b";
                contenedor.style.backgroundColor = "#fffbeb";
            }
            const texto = document.createElement("p");
            texto.innerText = nota.descripcion;
            const fecha = document.createElement("small");
            fecha.innerText = nota.fecha;
            const botonImportante = document.createElement("button");
            botonImportante.innerText = nota.importante ? "Marcar Importante" : "Importante: Si";
            const botonEliminar = document.createElement("button");
            botonEliminar.innerText = "Eliminar";
            
            botonImportante.addEventListener('click', () =>{
                nota.importante = !nota.importante
                local_storage();
                Notas_renderizadas();
                
            });
            botonEliminar.addEventListener('click', () =>{
                notas = notas.filter(item => item.id !== nota.id)
                local_storage();
                Notas_renderizadas();
            });
            contenedor.appendChild(titulo);
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

    function Configuracion (){
        const notasGuardadas = localStorage.getItem('mis_notas');
        if (notasGuardadas) {
            notas = JSON.parse(notasGuardadas);
            Notas_renderizadas();
        }
    }