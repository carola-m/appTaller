const mongoose = require("mongoose");

const Coche = require ("../api/models/coche.model");

const arrayCoches=[
    {
        matricula: "1234FFF",
        marca: "Audi",
        modelo: "S3",
        año: 2011,
        notas: "nota de ejemplo",
        servicios: ["6479c1444f4cdf7097930ded","6479c1444f4cdf7097930def"],
        imagen: ""
    },
    {
        matricula: "5678FFF",
        marca: "Seat",
        modelo: "Panda",
        año: 1980,
        servicios: ["6479c1444f4cdf7097930df0"]
    },
    {
        matricula: "5555FFF",
        marca: "Peugeot",
        modelo: "406",
        año: 2000,
        servicios: ["6479c1444f4cdf7097930df0","6479c1444f4cdf7097930df1"]
    },
    {
        matricula: "1234AAA",
        marca: "Volkswagen",
        modelo: "Golf GTI",
        año: 1999,
        servicios: ["6479c1444f4cdf7097930df2"]
    },
    {
        matricula: "1111ZZZ",
        marca: "Tesla",
        modelo: "S",
        año: 2023,
        servicios: ["6479c1444f4cdf7097930df0"]
    },
    {
        matricula: "2522FTF",
        marca: "Toyota",
        modelo: "Corolla",
        año: 2000,
        servicios: ["6479c1444f4cdf7097930df1"]
    },
    {
        matricula: "5555FDS",
        marca: "Ford",
        modelo: "Fiesta",
        año: 2006,
        servicios: ["6479c1444f4cdf7097930df5","6479c1444f4cdf7097930df4"]
    },
    {
        matricula: "9999ZZZ",
        marca: "Hiunday",
        modelo: "i30",
        año: 2015,
        servicios: ["6479c1444f4cdf7097930df2"]
    },


]
mongoose.connect("mongodb+srv://root:root@cluster0.8phs6yk.mongodb.net/tallerMecanico?retryWrites=true&w=majority")

.then(async () => {
    const allCoches = await Coche.find();
    if(allCoches.length > 0){
        await Coche.collection.drop();
        console.log("Coches borrados");
    }
})
.catch((error) => console.log("error borrando coches", error))
.then(async () => {
    const cochesMap = arrayCoches.map((coche) => new Coche(coche));
    await Coche.insertMany(cochesMap);
    console.log("Coches insertados");
})
.finally(() => mongoose.disconnect());