const cervezasController = require("./cervezasController").cervezasController
var mongoose = require("mongoose")
var cervezasModel = require("../../API/modelos/cervezasModel.js").cervezasModel
var config = require("../../config.js").config

describe("POST: /cervezas/guardar", () => {
    let request, response;

    beforeAll((done) => {
        //conexion a la base de datos. 
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest).then((respuesta) => {
                            //console.log("conexion correcta a mongo")
                        })//.catch((error) => {
                            //console.log(error)
                       // })      
        done()
    })

    beforeEach(()=> {
        request = {body:{}}
        response = {
            json: jest.fn()
        }
    })
    test("debe fallar cuando el codigo no esta presente",(done) => {
        //configuracion de request
        request.body = {}
        cervezasController.guardar(request, response)
        
        expect(response.json).toHaveBeenCalledWith({state: false,mensaje: "el campo codigo es obligatirio"})
        done()
    })

    test("debe fallar cuando el nombre no esta presente",(done) => {
        //configuracion de request
        request.body = {codigo:"600"}
        cervezasController.guardar(request, response)
        
        expect(response.json).toHaveBeenCalledWith({state: false,mensaje: "el campo nombre es obligatirio"})
        done()
    })

    test("debe guardar el elemento",(done) => {
        //configuracion de request
        request.body = {codigo:"600", nombre:"licania"}
        cervezasController.guardar(request, response)
        
        setTimeout(()=> {
        expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"elemento guardado correctamente"})
        done()
        },200)
    })

    test("debe fallar cuando el codigo ya existe",(done) => {
        //configuracion de request
        request.body = {codigo:"600", nombre:"licania"}
        cervezasController.guardar(request, response)
        
        setTimeout(()=> {
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"el codigo de este elemento ya existe"})
        done()
        },200)
    })

    afterAll(()=> {
        //borrado de la colleccion 
        cervezasModel.Mymodel.deleteMany({}).then((res)=> {})
    })

})

describe("POST: /cervezas/update", () => {
    let request, response;

    beforeAll((done) => {
        //conexion a la base de datos. 
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest).then((respuesta) => {
                            //console.log("conexion correcta a mongo")
                        })//.catch((error) => {
                            //console.log(error)
                       // })      
        done()
    })

    beforeEach(()=> {
        request = {body:{}}
        response = {
            json: jest.fn()
        }
    })
    test("debe fallar cuando el _id no esta presente",(done) => {
        //configuracion de request
        request.body = {}
        cervezasController.update(request, response)
        
        expect(response.json).toHaveBeenCalledWith({state: false,mensaje: "el campo _id es obligatirio"})
        done()
    })

    test("debe guardar el elemento",(done) => {
        //configuracion de request
        request.body = {codigo:"700", nombre:"brujeria"}
        cervezasController.guardar(request, response)
        
        setTimeout(()=> {
        expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"elemento guardado correctamente"})
        done()
        },100)
    })

    test("debe fallar cuando el nombre no esta presente", (done) => {
        cervezasModel.update({ _id: "123" }, (response) => {
            expect(response).toEqual({ state: false });
            done(); // Finaliza el test correctamente
        });
    });   
    
    test("debe actualizar el elemento",(done) => {
        //configuracion de request
        cervezasModel.Mymodel.find({nombre:"brujeria"}).then((res)=> {
            request.body = {_id:res[0]._id, nombre:"brujeria"}
        cervezasController.update(request, response)
        
        setTimeout(()=> {
        expect(response.json).toHaveBeenCalledWith({state: true,mensaje: "Elemento actualizado correctamente"})
        done()
        },50)
        })
        
    })

    
    test("debe fallar cuando hay un error al actualizar",(done) => {
        //configuracion de request
        cervezasModel.Mymodel.find({nombre:"brujeria"}).then((res)=> {
            request.body = {_id:"res._id", nombre:"brujeria"}
        cervezasController.update(request, response)
        
        setTimeout(()=> {
        expect(response.json).toHaveBeenCalledWith({state: false,mensaje: "Error al actualizar el elemento"})
        done()
        },50)
        })
        
    })

    

    

    

    afterAll(()=> {
        //borrado de la colleccion 
        cervezasModel.Mymodel.deleteMany({}).then((res)=> {})
    })

})

describe("POST: /cervezas/delete", () => {
    let request, response;

    beforeAll((done) => {
        //conexion a la base de datos. 
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest).then((respuesta) => {
                            //console.log("conexion correcta a mongo")
                        })//.catch((error) => {
                            //console.log(error)
                       // })      
        done()
    })

    beforeEach(()=> {
        request = {body:{}}
        response = {
            json: jest.fn()
        }
    })
    test("debe fallar cuando el _id no esta presente",(done) => {
        //configuracion de request
        request.body = {}
        cervezasController.delete(request, response)
        
        expect(response.json).toHaveBeenCalledWith({state: false,mensaje: "el campo _id es obligatirio"})
        done()
    })

    test("debe guardar el elemento",(done) => {
        //configuracion de request
        request.body = {codigo:"750", nombre:"brujeria"}
        cervezasController.guardar(request, response)
        
        setTimeout(()=> {
        expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"elemento guardado correctamente"})
        done()
        },100)
    })

    
    test("debe eliminar el elemento",(done) => {
        //configuracion de request
        cervezasModel.Mymodel.find({nombre:"brujeria"}).then((res)=> {
            request.body = {_id:res[0]._id, nombre:"brujeria"}
        cervezasController.delete(request, response)
        
        setTimeout(()=> {
        expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Elemento eliminado correctamente"})
        done()
        },50)
        })
        
    })

    
    test("debe fallar cuando hay un error al eliminar",(done) => {
        //configuracion de request
        cervezasModel.Mymodel.find({nombre:"brujeria"}).then((res)=> {
            request.body = {_id:"res._id", nombre:"brujeria"}
        cervezasController.delete(request, response)
        
        setTimeout(()=> {
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"Error al eliminar el elemento"})
        done()
        },50)
        })
        
    })

    

    

    

    afterAll(()=> {
        //borrado de la colleccion 
        cervezasModel.Mymodel.deleteMany({}).then((res)=> {})
    })

})

describe("POST: /cervezas/listar", () => {
    let request, response;

    beforeAll((done) => {
        //conexion a la base de datos. 
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest).then((respuesta) => {
                            //console.log("conexion correcta a mongo")
                        })//.catch((error) => {
                            //console.log(error)
                       // })      
        done()
    })

    beforeEach(()=> {
        request = {body:{}}
        response = {
            json: jest.fn()
        }
    })
    

    test("debe guardar el elemento",(done) => {
        //configuracion de request
        request.body = {codigo:"750", nombre:"brujeria"}
        cervezasController.guardar(request, response)
        
        setTimeout(()=> {
        expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"elemento guardado correctamente"})
        done()
        },100)
    })

    
    test("debe listar los elementos ",(done) => {
        //configuracion de request
        request.body = {}
        cervezasController.listar(request, response)
        
        

        setTimeout(()=> {
            var respuesta = response.json.mock.calls[0][0]
       
        expect(respuesta.length).toBe(1)
        done()
        },200)
    })
   

    

    afterAll(()=> {
        //borrado de la colleccion 
        cervezasModel.Mymodel.deleteMany({}).then((res)=> {})
    })

})