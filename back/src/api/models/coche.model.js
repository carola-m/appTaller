const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cocheSchema = new Schema(
    {
        matricula: {type:String, required:true},
        marca: {type:String, required:true},
        modelo: {type:String, required:true},
        year: {type:Number,required:true},
        notas:{type:String,required:false},
        servicios: [{type: Schema.Types.ObjectId, ref:"servicio"}],
        imagen:{type:String}
    },
    {
        versionKey: false 
        }
)

const Coche = mongoose.model("coche", cocheSchema);
module.exports = Coche;