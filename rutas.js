var usuariosController = require("./API/controladores/usuariosController.js").usuariosController

app.post("/usuarios/save", function(request, response){
    usuariosController.save(request, response)

})

app.get("/usuarios/activar/:email/:codigo", function(request, response){
  usuariosController.activar(request, response)

})

app.post("/usuarios/login", function(request, response){
  usuariosController.login(request, response)

})

app.put("/usuarios/update", function(request, response){    //con los mismos datos de .post se realizo la busqueda, incluyendo unicamente los datos que quiero actualizar. 
    usuariosController.update(request, response)
})

app.delete("/usuarios/delete", function(request, response){    //con los mismos datos de .post se realizo la busqueda, incluyendo unicamente el dato unico "email" 
  usuariosController.delete(request, response) 
})

app.get("/usuarios/listar", function(request, response){
  usuariosController.listar(request, response)  ///
})

app.post("/usuarios/listarEmail", function(request, response){
    usuariosController.listarEmail(request, response)
})

