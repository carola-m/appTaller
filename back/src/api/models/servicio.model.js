const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// en esta tabla almacenamos los datos del servicio hechos a un coche (como si fuera tabla historial)
const servicioSchema = new Schema(
    {
        
        tipo: {type:String, required:true},// nombre del tipo del servicio que va a realizar al coche
        kms: {type:Number, required:true}, // kms del coche
        fecha: {type:String,required:true}, // formato fecha dd-mm-YYYY
        notas:{type:String, required:false}// notas aclaratorias sobre el servicio
    },
    {
        versionKey: false 
        }
)

const Servicio = mongoose.model("servicio", servicioSchema);
module.exports = Servicio;