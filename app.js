    const inputNota = document.querySelector('#descripcion_nota')
    const buttoNota = document.querySelector('#añadir_nota')
    let notas_generadas = document.querySelector('.notas_generadas')
    let notas = []

    document.addEventListener("DOMContentLoaded", () => {
        Configuracion();
    });
    buttoNota.addEventListener('click', pagina)
    function pagina (){
        if (!inputNota.value.trim()) return;
        let nota = {    
            id: Date.now(),
            descripcion: inputNota.value,
            fecha: new Date().toLocaleDateString(),
            importante: true
        }
        notas.push(nota)
        inputNota.value = ""
        local_storage();
        Notas_renderizadas()
    }

    function Notas_renderizadas (){
        notas_generadas.innerHTML = ""
        notas.forEach((nota)=>{
            const contenedor = document.createElement("article");
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