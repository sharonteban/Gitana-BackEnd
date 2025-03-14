var cervezasModel = require("../modelos/cervezasModel.js").cervezasModel
var cervezasController = {}

cervezasController.guardar = function(request, response){
    var post = {
        codigo:request.body.codigo,
        nombre:request.body.nombre
    }

if(post.codigo == undefined || post.codigo == null || post.codigo == ''){
    response.json({state:false, mensaje:"el campo codigo es obligatirio"})
    return false
}
if(post.nombre == undefined || post.nombre == null || post.nombre == ''){
    response.json({state:false, mensaje:"el campo nombre es obligatirio"})
    return false
}

cervezasModel.validarCodigo(post, function(respuesta){
    if(respuesta.length == 0){
        cervezasModel.guardar(post, function(respuesta2){            
            if(respuesta2.state == true){
                response.json({state:true, mensaje:"elemento guardado correctamente"})
            }
            else{
                response.json({state:false, mensaje:"error al guardar el elemento"})
            }
        })
    }
    else{
        response.json({state:false, mensaje:"el codigo de este elemento ya existe"})
    }
})


}

cervezasController.update = function(request, response){

    var post = {
        _id:request.body._id,        
        nombre:request.body.nombre
    }

if(post._id == undefined || post._id == null || post._id == ''){
    response.json({state:false, mensaje:"el campo _id es obligatirio"})
    return false
}
if(post.nombre == undefined || post.nombre == null || post.nombre == ''){
    response.json({state:false, mensaje:"el campo nombre es obligatirio"})
    return false
}

    
        cervezasModel.update(post, function(respuesta2){            
            if(respuesta2.state == true){
                response.json({state:true, mensaje:"Elemento actualizado correctamente"})
            }
            else{
                response.json({state:false, mensaje:"Error al actualizar el elemento"})
            }
        })
    
    

    
}

cervezasController.delete = function(request, response){
    var post = {
        _id:request.body._id,        
        
    }

if(post._id == undefined || post._id == null || post._id == ''){
    response.json({state:false, mensaje:"el campo _id es obligatirio"})
    return false
}




        cervezasModel.delete(post, function(respuesta2){            
            if(respuesta2.state == true){
                response.json({state:true, mensaje:"Elemento eliminado correctamente"})
            }
            else{
                response.json({state:false, mensaje:"Error al eliminar el elemento"})
            }
        })
    
}

cervezasController.listar = function(request, response){

    cervezasModel.listar(null, function(respuesta){
        response.json(respuesta)
    })
    
}

cervezasController.listarID = function(request, response){
    var post = {
        _id:request.body._id        
    }

if(post._id == undefined || post._id == null || post._id == ''){
    response.json({state:false, mensaje:"el campo _id es obligatirio"})
    return false
    
}
    cervezasModel.listarID(post, function(respuesta){
        response.json(respuesta) 
    })

}


module.exports.cervezasController = cervezasController