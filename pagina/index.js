var datos = []
var cargarTodo = function(){

  var data = "";

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    datos = JSON.parse(this.responseText).datos

    var misDatos = document.getElementById("misDatos")
    misDatos.innerHTML = ""
    for (let a = 0; a < datos.length; a++) {
        misDatos.innerHTML += `<tr>
                                  <td>${datos[a].nombre}</td>
                                  <td>${datos[a].apellido}</td>
                                  <td>${datos[a].email}</td>
                                  <td>${datos[a].password}</td>
                                </tr>`
        
    }
  }
});

xhr.open("GET", "http://localhost:3000/usuarios/listar");

xhr.send(data);

}

var abrirmodal = function(){
    $('#exampleModal').modal('show')
}

var guardar = function(){
    var nombre = document.getElementById("nombre").value
    var apellido = document.getElementById("apellido").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    
    var data = `email=${email}&nombre=${nombre}&apellido=${apellido}&password=${password}`;

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      var miRespuesta = JSON.parse(this.responseText);
      if(miRespuesta.state == false){
        Swal.fire({
          title: 'Error!',
          text: miRespuesta.mensaje,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
      else{
        Swal.fire({
          title: 'Que Bien',
          text: miRespuesta.mensaje,
          icon: 'success',
          confirmButtonText: 'Cool'
        })
        $('#exampleModal').modal('hide')
        cargarTodo()
      }
    }
  });

  xhr.open("POST", "http://localhost:3000/usuarios/save");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.send(data);

}

cargarTodo()