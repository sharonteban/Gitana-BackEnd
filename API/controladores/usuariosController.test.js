const usuariosController = require("./usuariosController").usuariosController
global.sha256 = require("sha256")
var mongoose = require("mongoose")
var usuariosModel = require("../../API/modelos/usuariosModel.js").usuariosModel
var config = require("../../config.js").config

describe("POST: /usuarios/save", () => {
    let request, response;

    beforeAll((done) => {
        //conexion a la base de datos. 

        
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest).then((respuesta) => {
           // console.log("conexion correcta a mongo")
        }).catch((error) => {
           // console.log(error)
        }) 
        done()
    })

    beforeEach(()=> {
        request = {body:{}}
        response = {
            json: jest.fn()
        }
    })
    test("debe fallar cuando el email no esta presente",(done) => {
        //configuracion de request
        request.body = {}
        usuariosController.save(request, response)
        
        expect(response.json).toHaveBeenCalledWith({mensaje:"El campo Email es obligatorio",state: false})
        done()
    })

    
    test("debe fallar cuando el nombre no esta presente",(done) => {
        //configuracion de request
        request.body = {email:"1.com"}
        usuariosController.save(request, response)
        
        expect(response.json).toHaveBeenCalledWith({mensaje:"El campo nombre es obligatorio",state: false})
        done()
    })

    test("debe fallar cuando el apellido no esta presente",(done) => {
        //configuracion de request
        request.body = {email:"1.com", nombre:"esteban"}
        usuariosController.save(request, response)
        
        expect(response.json).toHaveBeenCalledWith({mensaje:"El campo apellido es obligatorio",state: false})
        done()
    })

    test("debe fallar cuando el password no esta presente",(done) => {
        //configuracion de request
        request.body = {email:"1.com", nombre:"esteban", apellido:"rivera"}
        usuariosController.save(request, response)
        
        expect(response.json).toHaveBeenCalledWith({mensaje:"El campo password es obligatorio",state: false})
        done()
    })

    test("debe fallar cuando el email no es valido",(done) => {
        //configuracion de request
        request.body = {email:"1.com", nombre:"esteban", apellido:"rivera", password:"123456789"}
        usuariosController.save(request, response)
        
        expect(response.json).toHaveBeenCalledWith({mensaje:"verifica la escritura del correo e intenta de nuevo",state: false})
        done()
    })

    test("debe fallar cuando el nombre es muy corto",(done) => {
        //configuracion de request
        request.body = {email:"sharontenban@gmail.com", nombre:"es", apellido:"rivera", password:"123456789", }
        usuariosController.save(request, response)
        
        expect(response.json).toHaveBeenCalledWith({mensaje:"no es un nombre valido, demaciado corto",state: false})
        done()
    })

    test("debe fallar cuando el nombre es muy largo",(done) => {
        //configuracion de request
        request.body = {email:"sharontenban@gmail.com", nombre:"esqwertyuiopasdfghjklzxc", apellido:"rivera", password:"123456789", }
        usuariosController.save(request, response)
        
        expect(response.json).toHaveBeenCalledWith({mensaje:"no es un nombre valido, demaciado largo",state: false})
        done()
    })

    test("debe guardar el usuario",(done) => {
        //configuracion de request
        request.body = {email:"sharontenban@gmail.com", nombre:"esteban", apellido:"rivera", password:"123456789", }
        usuariosController.save(request, response)
        
        setTimeout(()=> {

            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"usuario guardado con exito"})
            done()

        },200)
        
    })

    test("debe fallar cuando el email ya esta registrado",(done) => {
        //configuracion de request
        request.body = {email:"sharontenban@gmail.com", nombre:"esteban", apellido:"rivera", password:"123456789", }
        usuariosController.save(request, response)
        
        setTimeout(()=> {

            expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"este correo ya esta registrado"})
            done()

        },200)
        
    })

    test("debe borrar el datos",(done) => {
        //configuracion de request
        usuariosModel.Mymodel.deleteMany({}).then((res)=> {
            expect("ok").toBe("ok")
            done()
        })

    })

})

describe("POST: /usuarios/login", () => {
    let request, response;

    beforeAll((done) => {
        //conexion a la base de datos. 

        
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.Gitana_test).then((respuesta) => {
           // console.log("conexion correcta a mongo")
        }).catch((error) => {
           // console.log(error)
        }) 
        done()
    })

    beforeEach(()=> {
        request = {body:{},session:{}}
        response = {
            json: jest.fn()
        }
    })

    test("debe fallar cuando el email no esta presente",(done) => {
        //configuracion de request
        request.body = {}
        usuariosController.login(request, response)
        
        expect(response.json).toHaveBeenCalledWith({mensaje:"El campo Email es obligatorio",state: false})
        done()
    })

    test("debe fallar cuando el password no esta presente",(done) => {
        //configuracion de request
        request.body = {email:"sharonteban@gmail.com"}
        usuariosController.login(request, response)
        
        expect(response.json).toHaveBeenCalledWith({mensaje:"El campo password es obligatorio",state: false})
        done()
    })

    test("debe guardar el usuario",(done) => {
        //configuracion de request
        request.body = {email:"sharontenban1@outlook.com", nombre:"esteban", apellido:"rivera", password:"123456789", }
        usuariosController.save(request, response)
        
        setTimeout(()=> {

            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"usuario guardado con exito"})
            done()

        },200)
        
    })

    test("debe fallar cuando la cuenta no esta activada",(done) => {
        //configuracion de request

        request.body = {email:"sharontenban1@outlook.com", password:"123456789"}     


        usuariosController.login(request, response)
        
        setTimeout(()=> {

            expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"Por favor active la cuenta con el codigo de su email"})
            done()

        },220)
        
    })

    test("debe iniciar secion cuando el usuario ya esta activo",(done) => {
        //configuracion de request
        
        usuariosModel.Mymodel.findOneAndUpdate({email:"sharontenban1@outlook.com"},{estado:"activo"}).then((res)=>{
            request.body = {email:"sharontenban1@outlook.com", password:"123456789"}
            usuariosController.login(request, response)
        
        setTimeout(()=> {

            expect(response.json).toHaveBeenCalledWith({state:true,mensaje:"Bienvenido:esteban  rivera"})
            done()

        },200)

        })        
        
    })

    test("debe borrar el usuario",(done) => {
        //configuracion de request
        usuariosModel.Mymodel.deleteMany({}).then((res)=> {
            expect("ok").toBe("ok")
            done()
        })

    })

})

describe("POST: /usuarios/update", () => {
    let request, response;

    beforeAll((done) => {
        //conexion a la base de datos. 

        
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.Gitana_test).then((respuesta) => {
           // console.log("conexion correcta a mongo")
        }).catch((error) => {
           // console.log(error)
        }) 
        done()
    })

    beforeEach(()=> {
        request = {body:{},session:{}}
        response = {
            json: jest.fn()
        }
    })

    test("debe fallar cuando el email no esta presente",(done) => {
        //configuracion de request
        request.body = {}
        usuariosController.update(request, response)
        
        expect(response.json).toHaveBeenCalledWith({mensaje:"El campo Email es obligatorio",state: false})
        done()
    })

    test("debe guardar el usuario",(done) => {
        //configuracion de request
        request.body = {email:"sharontebanf*****@outlook.com", nombre:"esteban", apellido:"rivera", password:"123456789", }
        usuariosController.save(request, response)
        
        setTimeout(()=> {

            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"usuario guardado con exito"})
            done()

        },100)
        
    })

    test("debe fallar cuando el nombre no esta presente",(done) => {
        //configuracion de request
        request.body = {email:"sha.com"}
        usuariosController.update(request, response)
        
        expect(response.json).toHaveBeenCalledWith({mensaje:"El campo nombre es obligatorio",state: false})
        done()
    })

    test("debe fallar cuando el apellido no esta presente",(done) => {
        //configuracion de request
        request.body = {email:"sha.com", nombre:"esteban"}
        usuariosController.update(request, response)
        
        expect(response.json).toHaveBeenCalledWith({mensaje:"El campo apellido es obligatorio",state: false})
        done()
    })

    test("debe fallar cuando el perfil no esta presente",(done) => {
        //configuracion de request
        request.body = {email:"sha.com", nombre:"esteban", apellido:"rivera"}
        usuariosController.update(request, response)
        
        expect(response.json).toHaveBeenCalledWith({mensaje:"El campo Perfil es obligatorio",state: false})
        done()
    })

    test("debe fallar cuando el Estado no esta presente",(done) => {
        //configuracion de request
        request.body = {email:"sha.com", nombre:"esteban", apellido:"rivera", perfil:"cliente"}
        usuariosController.update(request, response)
        
        expect(response.json).toHaveBeenCalledWith({mensaje:"El campo Estado es obligatorio",state: false})
        done()
    })

    test("debe fallar cuando el email no es valido",(done) => {
        //configuracion de request
        request.body = {email:"1.com",  nombre:"esteban", apellido:"rivera", perfil:"cliente", estado:"activo"}
        usuariosController.update(request, response)
        
        expect(response.json).toHaveBeenCalledWith({mensaje:"verifica la escritura del correo e intenta de nuevo",state: false})
        done()

    })

    test("debe fallar cuando el nombre no es valido",(done) => {
        //configuracion de request
        request.body = {email:"sharontebanssdfsadf@outlook.com",  nombre:"es", apellido:"rivera", perfil:"cliente", estado:"activo"}
        usuariosController.update(request, response)
        
        expect(response.json).toHaveBeenCalledWith({mensaje:"no es un nombre valido, demaciado corto",state: false})
        done()

    })

    test("debe fallar cuando el nombre no es valido",(done) => {
        //configuracion de request
        request.body = {email:"sharontebanssdfsadf@outlook.com",  nombre:"esdjshdusjdjdjdjdjdjd", apellido:"rivera", perfil:"cliente", estado:"activo"}
        usuariosController.update(request, response)
        
        expect(response.json).toHaveBeenCalledWith({mensaje:"no es un nombre valido, demaciado largo",state: false})
        done()

    })

    test("debe fallar cuando el email no existe",(done) => {
        //configuracion de request
        request.body = {email:"sharonteban@outlook.com",  nombre:"esteban", apellido:"rivera", perfil:"cliente", estado:"activo" }
        usuariosController.update(request, response)
        
        setTimeout(()=> {

            expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"el email no existe"})
            done()

        },100)
        
    })

    test("debe guardar el usuario",(done) => {
        //configuracion de request
        request.body = {email:"sharontebanssdfsadfkhjgjk@outlook.com", nombre:"esteban", apellido:"rivera", perfil:"cliente", estado:"activo", password:"123456789" }
        usuariosController.save(request, response)
        
        setTimeout(()=> {

            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"usuario guardado con exito"})
            done()

        },100)
        
    })

    test("debe actualizar los datos del usuario",(done) => {
        //configuracion de request
        request.body = {email:"sharontebanssdfsadfkhjgjk@outlook.com",  nombre:"esteban", apellido:"rivera", perfil:"cliente", estado:"activo",  }
        usuariosController.update(request, response)
        
        setTimeout(()=> {

            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"usuario actualizado correctamente"})
            done()

        },100)

    })

    test("debe borrar el usuario",(done) => {
        //configuracion de request
        usuariosModel.Mymodel.deleteMany({}).then((res)=> {
            expect("ok").toBe("ok")
            done()
        })

    })

})

describe("POST: /usuarios/delete", () => {
    let request, response;

    beforeAll((done) => {
        //conexion a la base de datos. 

        
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.Gitana_test).then((respuesta) => {
           // console.log("conexion correcta a mongo")
        }).catch((error) => {
           // console.log(error)
        }) 
        done()
    })

    beforeEach(()=> {
        request = {body:{},session:{}}
        response = {
            json: jest.fn()
        }
    })

    test("debe fallar cuando el email no esta presente",(done) => {
        //configuracion de request
        request.body = {}
        usuariosController.delete(request, response)
        
        expect(response.json).toHaveBeenCalledWith({mensaje:"El campo Email es obligatorio",state: false})
        done()
    })

    test("debe guardar el usuario",(done) => {
        //configuracion de request
        request.body = {email:"sharonteban@outlook.com", nombre:"esteban", apellido:"rivera", password:"123456789", }
        usuariosController.save(request, response)
        
        setTimeout(()=> {

            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"usuario guardado con exito"})
            done()

        },100)
        
    })

    test("debe fallar cuando el email no es valido",(done) => {
        //configuracion de request
        request.body = {email:"1.com",  nombre:"esteban", apellido:"rivera", perfil:"cliente", estado:"activo"}
        usuariosController.delete(request, response)
        
        expect(response.json).toHaveBeenCalledWith({mensaje:"verifica la escritura del correo e intenta de nuevo",state: false})
        done()

    })       

    test("debe fallar cuando el email no existe",(done) => {
        //configuracion de request
        request.body = {email:"sharontebanfgdf@outlook.com",}
        usuariosController.delete(request, response)
        
        setTimeout(()=> {

            expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"el email no existe"})
            done()

        },100)
        
    })

    test("debe eliminar el usuario",(done) => {
        //configuracion de request
        request.body = {email:"sharonteban@outlook.com", nombre:"esteban", apellido:"rivera", perfil:"cliente", estado:"activo", password:"123456789" }
        usuariosController.delete(request, response)
        
        setTimeout(()=> {

            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"usuario eliminado correctamente"})
            done()

        },100)
        
    })

    test("debe borrar el usuario",(done) => {
        //configuracion de request
        usuariosModel.Mymodel.deleteMany({}).then((res)=> {
            expect("ok").toBe("ok")
            done()
        })

    })

}) 

describe("POST: /usuarios/listar", () => {
    let request, response;

    beforeAll((done) => {
        //conexion a la base de datos. 

        
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.Gitana_test).then((respuesta) => {
           // console.log("conexion correcta a mongo")
        }).catch((error) => {
           // console.log(error)
        }) 
        done()
    })

    beforeEach(()=> {
        request = {body:{},session:{}}
        response = {
            json: jest.fn()
        }
    })


    test("debe guardar el usuario",(done) => {
        //configuracion de request
        request.body = {email:"sharontebanssdfjgkfgrst@outlook.com", nombre:"esteban", apellido:"rivera", password:"123456789", }
        usuariosController.save(request, response)
        
        setTimeout(()=> {

            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"usuario guardado con exito"})
            done()

        },100)
        
    })

    test("debe listar los usuarios ",(done) => {
        //configuracion de request
        request.body = {}
        usuariosController.listar(request, response)
        setTimeout(()=> {            
            var respuesta = response.json.mock.calls[0][0].callback
                 
        expect(respuesta.length).toBe(1)
        done()
        },200)
    })

    test("debe borrar el usuario",(done) => {
        //configuracion de request
        usuariosModel.Mymodel.deleteMany({}).then((res)=> {
            expect("ok").toBe("ok")
            done()
        })

    })  
    

})

describe("POST: /usuarios/listarEmail", () => {
    let request, response;

    beforeAll((done) => {
        //conexion a la base de datos. 

        
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.Gitana_test).then((respuesta) => {
           // console.log("conexion correcta a mongo")
        }).catch((error) => {
           // console.log(error)
        }) 
        done()
    })

    beforeEach(()=> {
        request = {body:{},session:{}}
        response = {
            json: jest.fn()
        }
    })

    test("debe fallar cuando el email no esta presente",(done) => {
        //configuracion de request
        request.body = {}
        usuariosController.listarEmail(request, response)
        
        expect(response.json).toHaveBeenCalledWith({mensaje:"El campo Email es obligatorio",state: false})
        done()
    })

    test("debe guardar el usuario",(done) => {
        //configuracion de request
        request.body = {email:"sharonteban@outlook.com", nombre:"esteban", apellido:"rivera", password:"123456789", }
        usuariosController.save(request, response)
        
        setTimeout(()=> {

            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"usuario guardado con exito"})
            done()

        },100)
        
    })

    test("debe fallar cuando el email no es valido",(done) => {
        //configuracion de request
        request.body = {email:"1.com",  nombre:"esteban", apellido:"rivera", perfil:"cliente", estado:"activo"}
        usuariosController.listarEmail(request, response)
        
        expect(response.json).toHaveBeenCalledWith({mensaje:"verifica la escritura del correo e intenta de nuevo",state: false})
        done()

    })       

    test("debe fallar cuando el email no existe",(done) => {
        //configuracion de request
        request.body = {email:"sharontebanfgdf@outlook.com",}
        usuariosController.listarEmail(request, response)
        
        setTimeout(()=> {

            expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"el email no existe"})
            done()

        },100)
        
    })

    test("debe listar los usuarios ",(done) => {
        //configuracion de request
        usuariosModel.Mymodel.find({nombre:"esteban"}).then((res)=> {
            request.body = {email:res[0].email}
            usuariosController.listarEmail(request, response)
                
            setTimeout(()=> {
            var respuesta = response.json.mock.calls[0][0]
            
            expect(respuesta.length).toBe(1)
            done()
             },100)
        
        })
        
    })

    test("debe borrar el usuario",(done) => {
        //configuracion de request
        usuariosModel.Mymodel.deleteMany({}).then((res)=> {
            expect("ok").toBe("ok")
            done()
        })

    })


    
    


}) 

describe("POST: /usuarios/activar", () => {
    let request, response;

    beforeAll((done) => {
        //conexion a la base de datos. 

        
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.Gitana_test).then((respuesta) => {
           // console.log("conexion correcta a mongo")
        }).catch((error) => {
           // console.log(error)
        }) 
        done()
    })

    beforeEach(()=> {
        request = {body:{},session:{}}
        response = {
            json: jest.fn()
        }
    })

    test("debe fallar cuando el email no esta presente",(done) => {
        //configuracion de request
        request.body = {}
        usuariosController.activar(request, response)
        
        expect(response.json).toHaveBeenCalledWith({mensaje:"El campo Email es obligatorio",state: false})
        done()
    })

    test("debe fallar cuando el codigo no esta presente",(done) => {
        //configuracion de request
        request.body = {email:"sharontebanfalso1@outlook.com" }
        usuariosController.activar(request, response)
        
        expect(response.json).toHaveBeenCalledWith({mensaje:"El campo codigo es obligatorio",state: false})
        done()
    })

    test("debe guardar el usuario",(done) => {
        //configuracion de request
        request.body = {email:"sharontebanfalso1@outlook.com", nombre:"esteban", apellido:"rivera", password:"123456789", }
        usuariosController.save(request, response)

        
        setTimeout(()=> {

            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"usuario guardado con exito"})
            done()
            

        },100)
        
    })

    test("debe borrar el usuario",(done) => {
        //configuracion de request
        usuariosModel.Mymodel.deleteMany({}).then((res)=> {
            expect("ok").toBe("ok")
            done()
        })

    })


    // test("debe guardar el usuario",(done) => {
    //     //configuracion de request
    //     usuariosModel.Mymodel.find({email:"sharontebanfalso1@outlook.com"}).then((res) => {
    //     request.body = {email:"sharontebanfalso1@outlook.com"}
    //     console.log(res)

    //     })
    //     request.body = {email:"sharontebanfalso1@outlook.com", nombre:"esteban", apellido:"rivera", password:"123456789", }
    //     usuariosController.save(request, response)

        
    //     setTimeout(()=> {

    //         expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"usuario guardado con exito"})
    //         done()
    //         console.log(response.json)

    //     },100)
        
    // })
    

    // test("debe activar los usuarios ",(done) => {
    //     //configuracion de request
    //     usuariosModel.Mymodel.find({email:"sharontebanf**@outlook.com"}).then((res)=> {            
    //         request.body = {email:"sharontebanf**@outlook.com"}            
    //         usuariosController.activar(request, response)
            
    //         setTimeout(()=> {
    //         var respuesta = response.json.mock.calls[0][0]
    //          console.log(respuesta)
    //         expect(respuesta.length).toBe(1)
    //         done()
    //          },100)
        
    //     })
        
    // })



})

