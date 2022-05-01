function camposCorrectos({ titulo, duracion, imdb, linkTrailer }) {
    if (titulo == "" || titulo.trim() == "" || duracion == "" || duracion.trim() == "" || imdb == "" || imdb.trim() == "" || linkTrailer == "" || linkTrailer.trim() == "") {
      Swal.fire({
        title: "Error!",
        text: "No puede haber campos vacíos",
        imageUrl: "./assets/error.png",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image"
      });
      return false;
    }
    return true;
  }