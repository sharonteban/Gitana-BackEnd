var cerveceriasModel = require("../modelos/cerveceriasModel.js").cerveceriasModel
var cerveceriasController = {}

cerveceriasController.guardar = function(request, response){
    var post = {
        codigo:request.body.codigo,
        nombre:request.body.nombre,
        descripcion:request.body.descripcion,
        imagen:request.body.imagen,
        precio:request.body.precio
    }

if(post.codigo == undefined || post.codigo == null || post.codigo == ''){
    response.json({state:false, mensaje:"el campo codigo es obligatirio"})
    return false
}
if(post.nombre == undefined || post.nombre == null || post.nombre == ''){
    response.json({state:false, mensaje:"el campo nombre es obligatirio"})
    return false
}

if(post.descripcion == undefined || post.descripcion == null || post.descripcion == ''){
    response.json({state:false, mensaje:"el campo Descripcion es obligatirio"})
    return false
}

if(post.imagen == undefined || post.imagen == null || post.imagen == ''){
    response.json({state:false, mensaje:"el campo Imagen es obligatirio"})
    return false
}

if(post.precio == undefined || post.precio == null || post.precio == ''){
    response.json({state:false, mensaje:"el campo Precio es obligatirio"})
    return false
}

cerveceriasModel.validarCodigo(post, function(respuesta){
    if(respuesta.length == 0){
        cerveceriasModel.guardar(post, function(respuesta2){            
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

cerveceriasController.update = function(request, response){

    var post = {
        _id:request.body._id,        
        nombre:request.body.nombre,
        descripcion:request.body.descripcion,
        imagen:request.body.imagen,
        precio:request.body.precio
    }

if(post._id == undefined || post._id == null || post._id == ''){
    response.json({state:false, mensaje:"el campo _id es obligatirio"})
    return false
}
if(post.nombre == undefined || post.nombre == null || post.nombre == ''){
    response.json({state:false, mensaje:"el campo nombre es obligatirio"})
    return false
}

if(post.descripcion == undefined || post.descripcion == null || post.descripcion == ''){
    response.json({state:false, mensaje:"el campo Descripcion es obligatirio"})
    return false
}

if(post.precio == undefined || post.precio == null || post.precio == ''){
    response.json({state:false, mensaje:"el campo precio es obligatirio"})
    return false
}

    
        cerveceriasModel.update(post, function(respuesta2){            
            if(respuesta2.state == true){
                response.json({state:true, mensaje:"Elemento actualizado correctamente"})
            }
            else{
                response.json({state:false, mensaje:"Error al actualizar el elemento"})
            }
        })
    
    

    
}

cerveceriasController.delete = function(request, response){
    var post = {
        _id:request.body._id,        
        
    }

if(post._id == undefined || post._id == null || post._id == ''){
    response.json({state:false, mensaje:"el campo _id es obligatirio"})
    return false
}




        cerveceriasModel.delete(post, function(respuesta2){            
            if(respuesta2.state == true){
                response.json({state:true, mensaje:"Elemento eliminado correctamente"})
            }
            else{
                response.json({state:false, mensaje:"Error al eliminar el elemento"})
            }
        })
    
}

cerveceriasController.listar = function(request, response){

    cerveceriasModel.listar(null, function(respuesta){
        response.json(respuesta)
    })
    
}

cerveceriasController.listarID = function(request, response){
    var post = {
        _id:request.body._id        
    }

if(post._id == undefined || post._id == null || post._id == ''){
    response.json({state:false, mensaje:"el campo _id es obligatirio"})
    return false
    
}
    cerveceriasModel.listarID(post, function(respuesta){
        response.json(respuesta) 
    })

}


module.exports.cerveceriasController = cerveceriasController