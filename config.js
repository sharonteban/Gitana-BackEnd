var config = {
    email:{},
    sesiones:{}
}

config.urlreal = "http://localhost:3000"

config.puertoExpress = 3000
config.bd = "BackendBit" //nombre bd mongo
config.bdUser = "adminBit"
config.bdPass = "admin123"
config.bdIp = "161.35.234.193"
config.bdPort = "27017"


config.secret = "a,sbfjsndfjks.fsjdfn=)$(%/#$lKDNFLDJFS/##$&/°°!#&/%&/()(/&&&/()*[]____ÑÑ[[" 

config.email.host = "smtp.gmail.com"
config.email.port = 587
config.email.user = "sharonteban@gmail.com"
config.email.pass = "ligdlhzocaffdtta"

config. sesiones.secret = "jkbdfkjasdkjfpaisjdaloshjd546453646___@vasdfasdfñññsññ"
config. sesiones.expiracion = 60000 * 5

config.listablanca = [
    "http://localhost:4200",
    "http://localhost:9876",
    "http://localhost:3000"
]

module.exports.config = config 