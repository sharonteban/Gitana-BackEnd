var usuariosController = require("./API/controladores/usuariosController.js").usuariosController


var soloAdmin = function(request, response, next){
  if(request.session.perfil == 'admin'){
    next()
  }
  else{
    response.json({state:false, mensaje:"esta API solo la pueden usar los administradores"})
  }
}


app.post("/usuarios/save", function(request, response){
    usuariosController.save(request, response)

})

app.post("/usuarios/activar", function(request, response){
  usuariosController.activar(request, response)

})

app.post("/usuarios/login", function(request, response){
  usuariosController.login(request, response)

})

app.put("/usuarios/update", soloAdmin, function(request, response){    //con los mismos datos de .post se realizo la busqueda, incluyendo unicamente los datos que quiero actualizar. 
    usuariosController.update(request, response)
})

app.post("/usuarios/delete", soloAdmin, function(request, response){    //con los mismos datos de .post se realizo la busqueda, incluyendo unicamente el dato unico "email" 
  usuariosController.delete(request, response) 
})

app.post("/usuarios/listar", soloAdmin, function(request, response){
  usuariosController.listar(request, response)  ///
})

app.post("/usuarios/listarEmail", soloAdmin, function(request, response){
  usuariosController.listarEmail(request, response)
})

app.post("/usuarios/estado", function(request, response){  
   response.json(request.session) 
})

app.post("/usuarios/logout", function(request, response){  
  request.session.destroy()
  response.json({state:true, mensaje:"sesion cerrada"}) 
})



     // cervecerias 
var cerveceriasController = require("./API/controladores/cerveceriasController.js").cerveceriasController

app.post("/cervecerias/guardar", soloAdmin, function(request, response){    //con los mismos datos de .post se realizo la busqueda, incluyendo unicamente los datos que quiero actualizar. 
  cerveceriasController.guardar(request, response)
})

app.post("/cervecerias/update", soloAdmin, function(request, response){    //con los mismos datos de .post se realizo la busqueda, incluyendo unicamente los datos que quiero actualizar. 
  cerveceriasController.update(request, response)
})

app.post("/cervecerias/delete", soloAdmin, function(request, response){    //con los mismos datos de .post se realizo la busqueda, incluyendo unicamente el dato unico "email" 
cerveceriasController.delete(request, response) 
})

app.post("/cervecerias/listar",  function(request, response){
cerveceriasController.listar(request, response)  ///
})

app.post("/cervecerias/listarID", function(request, response){
  cerveceriasController.listarID(request, response)
})

  // cervezas 
  var cervezasController = require("./API/controladores/cervezasController.js").cervezasController

  app.post("/cervezas/guardar", soloAdmin, function(request, response){    //con los mismos datos de .post se realizo la busqueda, incluyendo unicamente los datos que quiero actualizar. 
    cervezasController.guardar(request, response)
  })
  
  app.post("/cervezas/update", soloAdmin, function(request, response){    //con los mismos datos de .post se realizo la busqueda, incluyendo unicamente los datos que quiero actualizar. 
    cervezasController.update(request, response)
  })
  
  app.post("/cervezas/delete", soloAdmin, function(request, response){    //con los mismos datos de .post se realizo la busqueda, incluyendo unicamente el dato unico "email" 
  cervezasController.delete(request, response) 
  })
  
  app.post("/cervezas/listar", function(request, response){
  cervezasController.listar(request, response)  ///
  })
  
  app.post("/cervezas/listarID", function(request, response){
    cervezasController.listarID(request, response)
  })



// anexos (archivos)
  var anexosController = require("./API/controladores/anexosController.js").anexosController


app.post("/upload/:nombrearchivo",function(request, response){
   anexosController.upload(request,response)
})

app.post("/Avatar/:nombrearchivo",function(request, response){
  anexosController.Avatar(request,response)
})