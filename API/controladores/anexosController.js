var anexosController = {}
var multer = require("multer")

anexosController.upload = function(request, response){
var upload = multer({
    storage:multer.diskStorage({
        destination:(req, file, cb) => {
            cb(null, appRoot + '/imagenes/')
        },
        filename:(req, file, cb) => {
            cb(null,req.params.nombrearchivo + '.png')
        }
    }),
    fileFilter: (request, file, cb) => {
        var ext = path.extname(file.originalname)
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.tif' && ext !== '.jpeg' && ext !== '.JPG' && ext !== '.jfif'){
           
            cb('solo aceptamos formatos de imagen',null) 
        }
        else{
           cb(null,true) 
        }
        cb(null, true)
    }
}).single('file')

upload(request, response, function(err) {
    if(err){
        console.log(err)
        response.json({state:false, mensaje:err})
    }
    else{
        response.json({state:true, mensaje:"archivo cargado"})
    }
})

}

anexosController.Avatar = function(request, response){
    var upload = multer({
        storage:multer.diskStorage({
            destination:(req, file, cb) => {
                cb(null, appRoot + '/Avatar/')
            },
            filename:(req, file, cb) => {
                cb(null,req.params.nombrearchivo + '.png')
            }
        }),
        fileFilter: (request, file, cb) => {
            var ext = path.extname(file.originalname)
            if(ext !== '.png' && ext !== '.jpg' && ext !== '.tif' && ext !== '.jpeg' && ext !== '.JPG' && ext !== '.jfif'){
               
                cb('solo aceptamos formatos de imagen',null) 
            }
            else{
               cb(null,true) 
            }
            cb(null, true)
        }
    }).single('file')
    
    upload(request, response, function(err) {
        if(err){
            console.log(err)
            response.json({state:false, mensaje:err})
        }
        else{
            response.json({state:true, mensaje:"archivo cargado"})
        }
    })
    
    }
module.exports.anexosController = anexosController