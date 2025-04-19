var usuariosModel = {}
const mongoose = require("mongoose") 

var schema = mongoose.Schema

var usuariosschema = new schema({
    email:String,
    nombre:String,
    apellido:String,
    password:String,
    estado:String,
    codigo:String,
    perfil:String
}) 

const Mymodel = mongoose.model("usuarios", usuariosschema)


usuariosModel.save = function(post, callback){
    const instancia = new Mymodel
    instancia.email = post.email
    instancia.nombre = post.nombre
    instancia.apellido = post.apellido
    instancia.password = post.password
    instancia.estado = post.estado
    instancia.codigo = post.codigo
    instancia.perfil = 'cliente'

    instancia.save().then((respuesta) => {
        return callback({state:true,})
    }).catch((error) => {
        console.log(error)
        return callback({state:false,})
    })
}

usuariosModel.buscarEmail = function(post, callback){
    Mymodel.findOne({email:post.email}).then((respuesta) => {
        return callback(respuesta)
    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })
}

usuariosModel.update = function(post, callback){
   Mymodel.findOneAndUpdate({email:post.email},{
    nombre: post.nombre,
    apellido: post.apellido,
    perfil: post.perfil,
    estado: post.estado
}).then((respuesta) => {
    return callback({state:true})
}).catch((error) => {
    console.log(error)
    return callback({state:false})
})
}

usuariosModel.delete = function(post, callback){

    Mymodel.deleteOne({email:post.email}).then((respuesta) => {
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })
}   

usuariosModel.listar = function(post, callback){
    Mymodel.find({},{password:0,codigo:0}).then((respuesta) => {
        return callback(respuesta)
        
    }).catch((error) => {
        console.log(error)
        return callback({})
    })   
}

usuariosModel.login = function(post, callback){
    Mymodel.find({email:post.email,password:post.password},{_id:1,nombre:1,apellido:1,estado:1, perfil:1}).then((respuesta) => {
        return callback(respuesta)
    }).catch((error) => {
        console.log(error)
        return callback({})
    })   
}

usuariosModel.listarEmail = function(post, callback){
    Mymodel.find({email:post.email},{password:0,codigo:0}).then((respuesta) => {
        return callback(respuesta)
    }).catch((error) => {
        console.log(error)
        return callback({})
    })  /// 
}

usuariosModel.activar = function(post, callback){
    Mymodel.updateOne({email:post.email, codigo:post.codigo},{
    estado:"activo"
 }).then((respuesta) => {
     return callback(respuesta)
 }).catch((error) => {
     console.log(error)
     return callback({state:false})
 })
 }

 usuariosModel.Mymodel = Mymodel
module.exports.usuariosModel = usuariosModel