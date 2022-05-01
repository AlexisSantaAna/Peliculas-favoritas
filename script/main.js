//Clase constructora de pelis
class Pelicula {
    constructor(titulo, duracion, imdb, linkTrailer) {
        this.titulo = titulo;
        this.duracion = duracion;
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
    const duracion = formulario.get('duracion')
    const imdb = formulario.get('imdb')
    const linkTrailer = formulario.get('linkTrailer')
    const pelicula = new Pelicula(titulo, duracion, imdb, linkTrailer)
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
        div.className = "col-4"
        div2.className = "card"
        div3.className = "card-body"
        div3.innerHTML = `       
                    <h5 class="card-title">${pelicula.titulo}</h5>
                    <p class="card-text">Duración: ${pelicula.duracion} minutos.</p>
                    <a href="${pelicula.imdb}" target="blank">Link IMDB</a><br>
                    <a href="${pelicula.linkTrailer}" target="blank">Link trailer</a><br>
                `
        const btnBorrar = document.createElement('button')
        btnBorrar.innerText = "Eliminar"
        btnBorrar.classList.add('btn', 'btn-primary')
        btnBorrar.addEventListener('click', () => {
            eliminarPelicula(pelicula)
        })
        div.appendChild(div2)
        div2.appendChild(div3)
        div3.appendChild(btnBorrar)
        listadoDePeliculas.appendChild(div)
    })
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


