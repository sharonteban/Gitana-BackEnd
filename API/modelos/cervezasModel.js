var cervezasModel = {}
const mongoose = require("mongoose") 

var schema = mongoose.Schema

var cervezasSchema = new schema({
    
    nombre:String,
    codigo:String
}) 

const Mymodel = mongoose.model("cervezas", cervezasSchema)

cervezasModel.validarCodigo = function(post, callback){
    Mymodel.find({codigo:post.codigo})
    .then((respuesta) => {
        return callback(respuesta)
    }).catch((error) => {
        console.log(error)
              
    })
}

cervezasModel.guardar = function(post, callback){
    const instancia = new Mymodel    
    instancia.nombre = post.nombre    
    instancia.codigo = post.codigo

    instancia.save().then((respuesta) => {
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false,})
    })
}

cervezasModel.update = function(post,callback){
    Mymodel.findOneAndUpdate(
        { _id: post._id },
        { nombre: post.nombre },  // <-- Agregamos los campos a actualizar
        { new: true }             // <-- Esto asegura que devuelve el documento actualizado
    )
        
        .then((respuesta) => {
            return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false,})
    })
}

cervezasModel.delete = function(post,callback){
    Mymodel.findOneAndDelete({_id:post._id},
        {nombre:post.nombre})
        
        .then((respuesta) => {
            return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false,})
    })
}

cervezasModel.listar = function(post, callback){
    Mymodel.find({})
        
        .then((respuesta) => {
            return callback(respuesta)
    }).catch((error) => {
        console.log(error)
        return callback([])
    })
}

cervezasModel.listarID = function(post, callback){
    Mymodel.find({_id:post._id},{})
        .then((respuesta) => {
           
            return callback(respuesta)
    }).catch((error) => {
        console.log(error)
        return callback([])
    })
}

cervezasModel.Mymodel = Mymodel
module.exports.cervezasModel = cervezasModel