const cerveceriasController = require("./cerveceriasController").cerveceriasController
var mongoose = require("mongoose")
var cerveceriasModel = require("../../API/modelos/cerveceriasModel.js").cerveceriasModel
var config = require("../../config.js").config

describe("POST: /cervecerias/guardar", () => {
    let request, response;

    beforeAll((done) => {
        //conexion a la base de datos. 
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest).then((respuesta) => {
                    //console.log("conexion correcta a mongo")
                }).catch((error) => {
                    //console.log(error)
                })                

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
        cerveceriasController.guardar(request, response)
        
        expect(response.json).toHaveBeenCalledWith({state: false,mensaje: "el campo codigo es obligatirio"})
        done()
    })

    test("debe guardar el elemento",(done) => {
        //configuracion de request
        request.body = {codigo:"100", nombre:"chispero", descripcion:"tipo IPA", imagen:"imagen", precio:"12345"}
        cerveceriasController.guardar(request, response)
        
        setTimeout(()=> {
            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"elemento guardado correctamente"})
            done()
        },200)
        
    })

    test("debe fallar cuando el nombre no esta presente",(done) => {
        //configuracion de request
        request.body = {codigo:"100"}
        cerveceriasController.guardar(request, response)
        
        expect(response.json).toHaveBeenCalledWith({state: false,mensaje: "el campo nombre es obligatirio"})
        done()
    })

    

    test("debe fallar cuando la Descripcion no esta presente",(done) => {
        //configuracion de request
        request.body = {codigo:"100", nombre:"chispero"}
        cerveceriasController.guardar(request, response)
        
        expect(response.json).toHaveBeenCalledWith({state: false,mensaje: "el campo Descripcion es obligatirio"})
        done()
    })

    test("debe fallar cuando la Imagen no esta presente",(done) => {
        //configuracion de request
        request.body = {codigo:"100", nombre:"chispero", descripcion:"tipo IPA"}
        cerveceriasController.guardar(request, response)
        
        expect(response.json).toHaveBeenCalledWith({state: false,mensaje: "el campo Imagen es obligatirio"})
        done()
    })

    test("debe fallar cuando el precio no esta presente",(done) => {
        //configuracion de request
        request.body = {codigo:"100", nombre:"chispero", descripcion:"tipo IPA", imagen:"imagen"}
        cerveceriasController.guardar(request, response)
        
        expect(response.json).toHaveBeenCalledWith({state: false,mensaje: "el campo Precio es obligatirio"})
        done()
    })

    

    test("debe fallar cuando el codigo ya existe",(done) => {
        //configuracion de request
        request.body = {codigo:"100", nombre:"chispero", descripcion:"tipo IPA", imagen:"imagen", precio:"12345"}
        cerveceriasController.guardar(request, response)
        
        setTimeout(()=> {
            expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"el codigo de este elemento ya existe"})
            done()
        },200)
        
    })

    

    afterAll(()=> {
        //borrado de la colleccion 
        cerveceriasModel.Mymodel.deleteMany({}).then((res)=> {})
    })

    
})

describe("POST: /cervecerias/update", () => {
    let request, response;

    beforeAll((done) => {
        //conexion a la base de datos. 
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest).then((respuesta) => {
                    //console.log("conexion correcta a mongo")
                }).catch((error) => {
                    //console.log(error)
                })                

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
        cerveceriasController.update(request, response)
        
        expect(response.json).toHaveBeenCalledWith({state: false,mensaje: "el campo _id es obligatirio"})
        done()
    })

    test("debe guardar el elemento",(done) => {
        //configuracion de request
        request.body = {codigo:"200", nombre:"chispero", descripcion:"tipo IPA", precio:"12345", imagen:"imagen"}
        cerveceriasController.guardar(request, response)
        
        setTimeout(()=> {
            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"elemento guardado correctamente"})
            done()
        },200)
        
    })

    test("debe fallar cuando el nombre no esta presente",(done) => {
        //configuracion de request
        cerveceriasModel.Mymodel.find({nombre:"chispero"}).then((res)=> {
            request.body = {_id:res[0]._id}
        cerveceriasController.update(request, response)
        
        expect(response.json).toHaveBeenCalledWith({state: false,mensaje: "el campo nombre es obligatirio"})
        done()

        })
        
    })

    test("debe fallar cuando la Descripcion no esta presente",(done) => {
        //configuracion de request
        cerveceriasModel.Mymodel.find({nombre:"chispero"}).then((res)=> {
            request.body = {_id:res[0]._id, nombre:"chispero"}
        cerveceriasController.update(request, response)
        
        expect(response.json).toHaveBeenCalledWith({state: false,mensaje: "el campo Descripcion es obligatirio"})
        done()

        })
        
    })

    test("debe fallar cuando el precio no esta presente",(done) => {
        //configuracion de request
        cerveceriasModel.Mymodel.find({nombre:"chispero"}).then((res)=> {
            request.body = {_id:res[0]._id, nombre:"chispero", descripcion:"tipo IPA"}
        cerveceriasController.update(request, response)
        
        expect(response.json).toHaveBeenCalledWith({state: false,mensaje: "el campo precio es obligatirio"})
        done()

        })
        
    })

    test("debe actualizar el elemento",(done) => {
        //configuracion de request
        cerveceriasModel.Mymodel.find({nombre:"chispero"}).then((res)=> {
            request.body = {_id:res[0]._id, nombre:"chispero", descripcion:"tipo porter", precio:"12345"}
        cerveceriasController.update(request, response)
        
        setTimeout(()=> {
        expect(response.json).toHaveBeenCalledWith({state: true,mensaje: "Elemento actualizado correctamente"})
        done()
        },200)
        })
        
    })

    


    

    afterAll(()=> {
        //borrado de la colleccion 
        cerveceriasModel.Mymodel.deleteMany({}).then((res)=> {})
    })

    
})

describe("POST: /cervecerias/delete", () => {
    let request, response;

    beforeAll((done) => {
        //conexion a la base de datos. 
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest).then((respuesta) => {
                    //console.log("conexion correcta a mongo")
                }).catch((error) => {
                    //console.log(error)
                })                

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
        cerveceriasController.delete(request, response)
        
        expect(response.json).toHaveBeenCalledWith({state: false,mensaje: "el campo _id es obligatirio"})
        done()
    })

    test("debe guardar el elemento",(done) => {
        //configuracion de request
        request.body = {codigo:"300", nombre:"chispero", descripcion:"tipo IPA", precio:"12345", imagen:"imagen"}
        cerveceriasController.guardar(request, response)
        
        setTimeout(()=> {
            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"elemento guardado correctamente"})
            done()
        },200)
        
    })

    test("debe eliminar el elemento",(done) => {
        //configuracion de request
        cerveceriasModel.Mymodel.find({nombre:"chispero"}).then((res)=> {
            request.body = {_id:res[0]._id, codigo:"300", nombre:"chispero", descripcion:"tipo IPA", precio:"12345", imagen:"imagen"}
        cerveceriasController.delete(request, response)
        
        setTimeout(()=> {
        expect(response.json).toHaveBeenCalledWith({state: true,mensaje: "Elemento eliminado correctamente"})
        done()
         },200)
        })
        
    })

        

    afterAll(()=> {
        //borrado de la colleccion 
        cerveceriasModel.Mymodel.deleteMany({}).then((res)=> {})
    })

    
})

describe("POST: /cervecerias/listar", () => {
    let request, response;

    beforeAll((done) => {
        //conexion a la base de datos. 
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest).then((respuesta) => {
                    //console.log("conexion correcta a mongo")
                }).catch((error) => {
                    //console.log(error)
                })                

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
        request.body = {codigo:"300", nombre:"chispero", descripcion:"tipo IPA", precio:"12345", imagen:"imagen"}
        cerveceriasController.guardar(request, response)
        
        setTimeout(()=> {
            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"elemento guardado correctamente"})
            done()
        },200)
        
    })


    test("debe listar los elementos ",(done) => {
        //configuracion de request
        request.body = {}
        cerveceriasController.listar(request, response)
        
        

        setTimeout(()=> {
            var respuesta = response.json.mock.calls[0][0]
       
        expect(respuesta.length).toBe(1)
        done()
        },200)
    })

    describe("POST: /cervecerias/listarID", () => {
        let request, response;
    
        beforeAll((done) => {
            //conexion a la base de datos. 
            mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest).then((respuesta) => {
                        //console.log("conexion correcta a mongo")
                    }).catch((error) => {
                        //console.log(error)
                    })                
    
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
            cerveceriasController.listarID(request, response)
            
            expect(response.json).toHaveBeenCalledWith({state: false,mensaje: "el campo _id es obligatirio"})
            done()
        })
    
        test("debe guardar el elemento",(done) => {
            //configuracion de request
            request.body = {codigo:"200", nombre:"chispero", descripcion:"tipo IPA", precio:"12345", imagen:"imagen"}
            cerveceriasController.guardar(request, response)
            
            setTimeout(()=> {
                expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"elemento guardado correctamente"})
                done()
            },100)
            
        })
    
        test("debe listar los elementos ",(done) => {
            //configuracion de request
            cerveceriasModel.Mymodel.find({nombre:"chispero"}).then((res)=> {
                request.body = {_id:res[0]._id}
                cerveceriasController.listarID(request, response)
                    
                setTimeout(()=> {
                var respuesta = response.json.mock.calls[0][0]
                
                expect(respuesta.length).toBe(1)
                done()
                 },100)
            
            })
            
        })
    
        
        
    })
        

    afterAll(()=> {
        //borrado de la colleccion 
        cerveceriasModel.Mymodel.deleteMany({}).then((res)=> {})
    })

    
})

