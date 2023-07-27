const mongoose = require("mongoose");

const Servicio = require ("../api/models/servicio.model");

const arrayServicios=[
    {
        tipo: "cambio de aceite",
        kms: "100000",
        fecha: "11-11-2011",
        notas: ""
    },
    {
        tipo: "cambio de filtro",
        kms: "90000",
        fecha: "22-11-2011",
        notas: ""
    },
    {
        tipo: "cambio de pastillas de freno",
        kms: "50000",
        fecha: "11-5-2011",
        notas: "cambiar neumaticos en unos 2000 Km."
    },
    {
        tipo: "lavado de auto",
        kms: "35000",
        fecha: "11-11-2015",
        notas: ""
    },
    {
        tipo: "revision pre itv",
        kms: "150000",
        fecha: "11-1-2014",
        notas: ""
    },
    {
        tipo: "correa distribucion",
        kms: "110000",
        fecha: "10-11-2010",
        notas: "correa del alternador dañada"
    },
    {
        tipo: "cambio neumaticos",
        kms: "180000",
        fecha: "15-11-2018",
        notas: ""
    },
    {
        tipo: "control de niveles",
        kms: "105000",
        fecha: "11-11-2018",
        notas: ""
    },
    {
        tipo: "varios",
        kms: "80000",
        fecha: "11-5-2018",
        notas: ""
    }
]
    
mongoose.connect("mongodb+srv://root:root@cluster0.8phs6yk.mongodb.net/tallerMecanico?retryWrites=true&w=majority")

.then(async () => {
    const allServicios = await Servicio.find();
    if(allServicios.length > 0){
        await Servicio.collection.drop();
        console.log("Servicios borrados");
    }
})
.catch((error) => console.log("error borrando servicios", error))
.then(async () => {
    const serviciosMap = arrayServicios.map((servicio) => new Servicio(servicio));
    await Servicio.insertMany(serviciosMap);
    console.log("Servicios insertados");
})
.finally(() => mongoose.disconnect());