var cerveceriasModel = {}
const mongoose = require("mongoose") 

var schema = mongoose.Schema

var cerveceriasSchema = new schema({
    
    nombre:String,
    codigo:String,
    imagen:String,
    precio:String,
    descripcion:String
}) 

const Mymodel = mongoose.model("cervecerias", cerveceriasSchema)

cerveceriasModel.validarCodigo = function(post, callback){
    Mymodel.find({codigo:post.codigo})
    .then((respuesta) => {
        return callback(respuesta)
    }).catch((error) => {
        console.log(error)
              
    })
}

cerveceriasModel.guardar = function(post, callback){
    const instancia = new Mymodel    
    instancia.nombre = post.nombre    
    instancia.codigo = post.codigo
    instancia.imagen = post.imagen
    instancia.precio = post.precio
    instancia.descripcion = post.descripcion

    instancia.save().then((respuesta) => {
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false,})
    })
}

cerveceriasModel.update = function(post,callback){
    Mymodel.findOneAndUpdate(
        { _id: post._id },
        { nombre: post.nombre, 
          imagen: post.imagen, 
          precio: post.precio, 
          descripcion: post.descripcion},  // <-- Agregamos los campos a actualizar
        { new: true }                       // <-- Esto asegura que devuelve el documento actualizado
    )
        
        .then((respuesta) => {
            return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false,})
    })
}

cerveceriasModel.delete = function(post,callback){
    Mymodel.findOneAndDelete({_id:post._id},
        {nombre:post.nombre})
        
        .then((respuesta) => {
            return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false,})
    })
}

cerveceriasModel.listar = function(post, callback){
    Mymodel.find({})
        
        .then((respuesta) => {
            return callback(respuesta)
    }).catch((error) => {
        console.log(error)
        return callback([])
    })
}

cerveceriasModel.listarID = function(post, callback){
    Mymodel.find({_id:post._id},{})
        .then((respuesta) => {
           
            return callback(respuesta)
    }).catch((error) => {
        console.log(error)
        return callback([])
    })
}

module.exports.cerveceriasModel = cerveceriasModel