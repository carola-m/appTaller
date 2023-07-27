const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clienteSchema = new Schema(
    {
        email: {type:String, required:true},
        password: {type:String, required:true},
        nombre_completo: {type:String, required:true},
        telefono: {type:Number,required:false},
        direccion:{type:String,required:false},
        coches: [{type: Schema.Types.ObjectId, ref:"coche"}]
    },
    {
    versionKey: false 
    }
)

const Cliente = mongoose.model("cliente", clienteSchema);
module.exports = Cliente;