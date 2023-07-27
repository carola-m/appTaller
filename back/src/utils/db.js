const mongoose = require ("mongoose");
const DB_URL = process.env.DB_URL;

const connect= async()=>{
    try{
        const db = await mongoose.connect(DB_URL);
        const {name,host} =  db.connection;
        console.log(`conectado a ${name} DB en host ${host}`);
    }
    catch(error){
        console.log("Hemos tenido un error al conectar a la BBDD", error);
    }

}
module.exports={connect}

// conexion a BBDD . Error de conexion controlado