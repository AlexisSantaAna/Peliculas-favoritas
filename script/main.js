//Clase constructora de pelis
class Pelicula {
    constructor(titulo, director, genero, protagonistas, imdb, linkTrailer) {
        this.titulo = titulo;
        this.director = director;
        this.genero = genero;
        this.protagonistas = protagonistas;
        this.imdb = imdb;
        this.linkTrailer = linkTrailer
    }
}

//En caso de haber pelis en localStorage, me las trae a variable. Sino, array vacío.
let peliculas = JSON.parse(localStorage.getItem('peliculas')) ?? []
//Al clickear submit, ejecuta escucha de eventos y función agregarPelicula
document.getElementById('formulario-pelicula').addEventListener('submit', agregarPelicula)


function agregarPelicula(e) {
    e.preventDefault()
    //Obtengo datos del formulario y los guardo en variables
    const formulario = new FormData(e.target)
    const titulo = formulario.get('titulo')
    const director = formulario.get('director')
    const genero = formulario.get('genero')
    const protagonistas = formulario.get('protagonistas')
    const imdb = formulario.get('imdb')
    const linkTrailer = formulario.get('linkTrailer')
    const pelicula = new Pelicula(titulo, director, genero, protagonistas, imdb, linkTrailer)
    //Si la validación da true, se agrega pelicula. Si da false no retorna nada.
    if (camposCorrectos(pelicula)) {
        peliculas.push(pelicula)
        //Crea en localStorage clave: 'peliculas, valor: 'objecto/s del array peliculas' 
        localStorage.setItem('peliculas', JSON.stringify(peliculas))
        //
        mostrarPeliculas()
        e.target.reset()
    }
}

function mostrarPeliculas() {
    let listadoDePeliculas = document.getElementById('listadoDePeliculas')
    listadoDePeliculas.innerHTML = ""

    peliculas.forEach((pelicula) => {
        let div = document.createElement('div')
        let div2 = document.createElement('div')
        let div3 = document.createElement('div')
        div.className = "col-12 col-sm-6 col-md-4 col-lg-3"
        div2.className = "card"
        div3.className = "card-body"
        div3.innerHTML = `       
                    <h5 class="card-title h3 text-center">${pelicula.titulo}</h5>
                    <p class="card-text"><b>Director</b>: ${pelicula.director}</p>
                    <p class="card-text"><b>Género</b>: ${pelicula.genero}</p>
                    <p class="card-text"><b>Protagonistas</b>: ${pelicula.protagonistas}</p>
                `
        if (pelicula.imdb != "") {
            div3.innerHTML += `<p><b>Link IMDB: </b><a href="${pelicula.imdb}" target="blank">Click aquí</a></p>`
        }
        if (pelicula.linkTrailer != "") {            
            div3.innerHTML += `<p><b>Link Trailer: </b><a href="${pelicula.linkTrailer}" target="blank">Click aquí</a></p>`
        }
        const btnBorrar = document.createElement('button')
        btnBorrar.innerText = "Eliminar"
        btnBorrar.classList.add('btn', 'btn-borrar', 'btn-sm', 'btn-rounded', 'mt-3')
        btnBorrar.addEventListener('click', () => {
            eliminarPelicula(pelicula)
        })
        div.appendChild(div2)
        div2.appendChild(div3)
        div3.appendChild(btnBorrar)
        listadoDePeliculas.appendChild(div)
    })

    //Agregar class animation al lastChild
    if (listadoDePeliculas.lastChild) {
        let lastChild = listadoDePeliculas.lastChild
        lastChild.className = "col-12 col-sm-6 col-md-4 col-lg-3 animate__animated animate__zoomIn"
        //Se borra al cargar DOM, para que se ejecute sólo al ser creado lastChild
        window.addEventListener('DOMContentLoaded', () => {
            lastChild.className = "col-12 col-sm-6 col-md-4 col-lg-3";
        });
    }

}

function eliminarPelicula(pelicula) {
    Swal.fire({
        title: `¿Borrar ${pelicula.titulo}?`,
        text: "Esta acción es irreversible",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borrar!"
    }).then((result) => {
        if (result.isConfirmed) {
            peliculas = peliculas.filter((item) => item.titulo != pelicula.titulo);
            localStorage.setItem("peliculas", JSON.stringify(peliculas));
            mostrarPeliculas();
            Swal.fire("Eliminada!", "La película ha sido eliminada", "success");
        }
    });
}

mostrarPeliculas();


