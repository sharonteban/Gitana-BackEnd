
var usuariosModel = require("../modelos/usuariosModel.js").usuariosModel
var config = require("../../config.js").config
var usuariosController ={}
var nodemailer = require("nodemailer")

usuariosController.save = function(request, response){
    var post ={
        email:request.body.email,
        nombre:request.body.nombre,
        apellido:request.body.apellido,
        password:request.body.password,
    }

    if(post.email == "" || post.email == undefined || post.email == null){       //verificacion de campo obligatorio 
        response.json({mensaje:"El campo Email es obligatorio", state:false})
        return false
    }

    if(post.nombre == "" || post.nombre == undefined || post.nombre == null){
        response.json({mensaje:"El campo nombre es obligatorio", state:false})
        return false
    }

    if(post.apellido == "" || post.apellido == undefined || post.apellido == null){
        response.json({mensaje:"El campo apellido es obligatorio", state:false})
        return false
    }

    if(post.password == "" || post.password == undefined || post.password == null){
        response.json({mensaje:"El campo password es obligatorio", state:false})
        return false
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;         //verificacion de valides de Email
    if(regex.test(post.email) == false){
        response.json({mensaje:"verifica la escritura del correo e intenta de nuevo", state:false})
        return false
    }

    if(post.nombre.length < 3){
        response.json({mensaje:"no es un nombre valido, demaciado corto", state:false})
        return false
    }

    if(post.nombre.length > 20){
        response.json({mensaje:"no es un nombre valido, demaciado largo", state:false})
        return false
    }

    post.password = sha256(post.password + config.secret)

    var letras = ["Z", "F", "P", "Y", "D"]
    var posicionAleatoria = Math.ceil(Math.random() * (3 - 0) + 0)
    var miCodigo = letras[posicionAleatoria] + "-" + Math.ceil(Math.random() * (99999 - 10000) + 10000)
    post.codigo = miCodigo
    post.estado = "inactivo"


    usuariosModel.buscarEmail(post,function(existe){
        if(existe == null){

            //envio de correo
            const transporter = nodemailer.createTransport({
                host:config.email.host,
                port:config.email.port,
                secure:false, 
                requireTLS:true,
                auth:{
                    user:config.email.user,
                    pass:config.email.pass 
                }
            })

            var mailOptions = {
                from:config.email.user,
                to:post.email,
                subject:"activar cuenta" + post.codigo,
                html:`<body style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                        <h2 style="color: #333;">Activación de Cuenta</h2>
                        <form action="activar.php" method="POST" style="display: inline-block; text-align: left; background: #f9f9f9; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                            <label for="email" style="display: block; margin-bottom: 8px; font-weight: bold;"></label>
                            <div id="email" name="email" style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px; background: white;">${post.email}</div>
                            
                            <label for="codigo" style="display: block; margin-bottom: 8px; font-weight: bold;">Código de Activación:</label>
                            <div id="codigo" name="codigo" style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px; background: white;">${post.codigo}</div>
                            
                            <a href="${config.urlreal}/activar/${post.email}/${post.codigo}" style="display: block; width: 100%; text-align: center; background: #007bff; color: white; padding: 10px; border-radius: 4px; text-decoration: none;">Activar Cuenta</a>
                            </form>
                    </body>`
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if(error){
                   // console.log(error)
                }
                else{
                    //console.log(info)
                }
            })

            usuariosModel.save(post,function(respuesta){
                if(respuesta.state == true){
                    response.json({state:true, mensaje:"usuario guardado con exito"})
                }
                else{
                    response.json({state:false, mensaje:"se presento un error al guardar el usuario"})
                }
            })
        }
        else{
            response.json({state:false, mensaje:"este correo ya esta registrado"})
        }
        

    })

}

usuariosController.login = function(request, response){
    var post = {
        email:request.body.email,
        password:request.body.password,
    }

    if(post.email == "" || post.email == undefined || post.email == null){       //verificacion de campo obligatorio 
        response.json({mensaje:"El campo Email es obligatorio", state:false})
        return false
    }

    if(post.password == "" || post.password == undefined || post.password == null){
        response.json({mensaje:"El campo password es obligatorio", state:false})
        return false
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;         //verificacion de valides de Email
    if(regex.test(post.email) == false){
        response.json({mensaje:"verifica la escritura del correo e intenta de nuevo", state:false})
        return false
    }

    post.password = sha256(post.password + config.secret)

    usuariosModel.login(post,function(respuesta){
        if(respuesta.length == 0){
            response.json({state:false,mensaje:"email o contraseña son incorrectos"})
        }
        else{
            if(respuesta[0].estado == 'inactivo'){
               response.json({state:false,mensaje:"Por favor active la cuenta con el codigo de su email"})
            }
            else{                
                request.session.nombre = respuesta[0].nombre + "  " + respuesta[0].apellido
                request.session._id = respuesta[0]._id
                request.session.perfil = respuesta[0].perfil

                response.json({state:true,mensaje:"Bienvenido:" + respuesta[0].nombre + "  " + respuesta[0].apellido})
            }

        }
    })

}

usuariosController.activar = function(request, response){

    var post ={
        email:request.body.email,
        codigo:request.body.codigo,
        
    }

    if(post.email == "" || post.email == undefined || post.email == null){       //verificacion de campo obligatorio 
        response.json({mensaje:"El campo Email es obligatorio", state:false})
        return false
    }

    if(post.codigo == "" || post.codigo == undefined || post.codigo == null){
        response.json({mensaje:"El campo codigo es obligatorio", state:false})
        return false
    }

    usuariosModel.activar(post, function(callback){
        if(callback.modifiedCount == 0){
            response.json({state:false, mensaje:"no se pudo activar la cuenta"})
        }
        else{
           response.json({state:true, mensaje:"cuenta activada correctamente"})
        }   
        
    })
}

usuariosController.update = function(request, response){
    var post ={
        email:request.body.email,
        nombre:request.body.nombre,
        apellido:request.body.apellido,
        perfil:request.body.perfil,
        estado:request.body.estado
    }

    if(post.email == "" || post.email == undefined || post.email == null){       //verificacion de campo obligatorio 
        response.json({mensaje:"El campo Email es obligatorio", state:false})
        return false
    }

    if(post.nombre == "" || post.nombre == undefined || post.nombre == null){
        response.json({mensaje:"El campo nombre es obligatorio", state:false})
        return false
    }

    if(post.apellido == "" || post.apellido == undefined || post.apellido == null){
        response.json({mensaje:"El campo apellido es obligatorio", state:false})
        return false
    }

    if(post.perfil == "" || post.perfil == undefined || post.perfil == null){
        response.json({mensaje:"El campo Perfil es obligatorio", state:false})
        return false
    }

    if(post.estado == "" || post.estado == undefined || post.estado == null){
        response.json({mensaje:"El campo Estado es obligatorio", state:false})
        return false
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;         //verificacion de valides de Email
    if(regex.test(post.email) == false){
        response.json({mensaje:"verifica la escritura del correo e intenta de nuevo", state:false})
        return false
    } 

    if(post.nombre.length < 3){
        response.json({mensaje:"no es un nombre valido, demaciado corto", state:false})
        return false
    }

    if(post.nombre.length > 20){
        response.json({mensaje:"no es un nombre valido, demaciado largo", state:false})
        return false
    }
    

    usuariosModel.buscarEmail(post, function(callback){
        if(callback == null){
            response.json({mensaje:"el email no existe", state:false})
            return false
        }
        else{
            
            usuariosModel.update(post, function(callback){
                if(callback.state == true){
                    
                    response.json({mensaje:"usuario actualizado correctamente", state:true})
                }
                else{
                    response.json({mensaje:"se presento un error al actualizar", state:false})
                }
            })
        }
    })


}

usuariosController.delete = function(request, response){
    var post ={
        email:request.body.email,
    }

    if(post.email == "" || post.email == undefined || post.email == null){       //verificacion de campo obligatorio 
        response.json({mensaje:"El campo Email es obligatorio", state:false})
        return false
    }


    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;         //verificacion de valides de Email
    if(regex.test(post.email) == false){
        response.json({mensaje:"verifica la escritura del correo e intenta de nuevo", state:false})
        return false
    }    

    usuariosModel.buscarEmail(post, function(callback){
        if(callback == null){
            response.json({mensaje:"el email no existe", state:false})
            return false
        }
        else{
            usuariosModel.delete(post, function(callback){
                response.json({mensaje:"usuario eliminado correctamente", state:true})
        })        
        }
    })   
}

usuariosController.listar = function(request, response){
    usuariosModel.listar(null, function(callback){
        response.json({callback})        
    })
}

usuariosController.listarEmail = function(request, response){
    var post ={
        email:request.body.email,
    }

    if(post.email == "" || post.email == undefined || post.email == null){       //verificacion de campo obligatorio 
        response.json({mensaje:"El campo Email es obligatorio", state:false})
        return false
    }


    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;         //verificacion de valides de Email
    if(regex.test(post.email) == false){
        response.json({mensaje:"verifica la escritura del correo e intenta de nuevo", state:false})
        return false
    }    
    
    usuariosModel.buscarEmail(post, function(callback){
        if(callback == null){
            response.json({mensaje:"el email no existe", state:false})
            return false
        } 
        else{
            usuariosModel.listarEmail(post, function(callback){
                response.json(callback)
            })
        }
    })

    
}




module.exports.usuariosController = usuariosController 