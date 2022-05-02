function camposCorrectos({ titulo, director, genero, protagonistas }) {
    if (titulo == "" || titulo.trim() == ""){
      Swal.fire({
        title: "Error!",
        text: "El campo 'título' no puede quedar vacío",
        imageUrl: "./assets/error.png",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image"
      });
      return false;
    }
    if (director == "" || director.trim() == ""){
      Swal.fire({
        title: "Error!",
        text: "El campo 'director' no puede quedar vacío",
        imageUrl: "./assets/error.png",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image"
      });
      return false;
    }
    if (genero == "" || genero.trim() == ""){
      Swal.fire({
        title: "Error!",
        text: "El campo 'género' no puede quedar vacío",
        imageUrl: "./assets/error.png",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image"
      });
      return false;
    }
    if (protagonistas == "" || protagonistas.trim() == ""){
      Swal.fire({
        title: "Error!",
        text: "El campo 'protagonistas' no puede quedar vacío",
        imageUrl: "./assets/error.png",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image"
      });
      return false;
    }
    return true;
  }