const { deleteFile } = require('../../middlewares/delete.file');
const Coche = require("../models/coche.model");

const getCoches = async (req, res)=>{
    try {
        let {page, limit} = req.query;
        const numCoches = await Coche.countDocuments();
        limit = limit ? parseInt(limit) || 4 : 4;
        let numPages = numCoches%limit > 0 ? numCoches/limit + 1 : numCoches/limit;
        numPages=parseInt(numPages);
        page = page > numPages ? numPages : page < 1 ? 1 :  parseInt(page) || 1;
        // if(page > numPages){
        //     page = numPages;
        // }else if(page < 1){
        //     page = 1
        // }else{
        //     page = page
        // }

        const skip = (page - 1) * limit;

        const allCoches = await Coche.find().populate("servicios", "tipo kms fecha notas").skip(skip).limit(limit);
        const response = {
            info: {
                numCoches: numCoches,
                page: page,
                limit: limit,
                maxpages: numPages,
                nextPage: numPages >= page + 1 ? `/coches?page=${page + 1}&limit=${limit}` : null,
                previousPage: page != 1 ? `/libros?page=${page - 1}&limit=${limit}` : null
            },
            results: allCoches
        }
        //const allCoches = await Coche.find().populate("servicios", "tipo kms fecha notas");
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json(error);
    }
}
const getAllCoches = async (req, res)=>{
    try {
        
        const allcoches = await Coche.find();
        return res.status(200).json(allcoches)
    } catch (error) {
        return res.status(500).json(error);
    }
}
const getCochesById = async (req, res)=>{
    try {
        const {id}=req.params;
        const cocheById = await Coche.findById(id);
        return res.status(200).json(cocheById)
    } catch (error) {
        return res.status(500).json(error);
    }
}

const postCoche = async (req, res)=>{
    try {
        console.log(req.body )
        const newCoche= new Coche(req.body);
        if(req.file){
            newCoche.imagen = req.file.path;
        }

        const createdCoche = await newCoche.save();
        return res.status(201).json(createdCoche);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const putCoche = async (req, res) => {
    try {
        const {id}=req.params;
        const putCoche = new Coche(req.body);
        putCoche._id=id;
        if(req.file){
            
            putCoche.imagen = req.file.path;
        }
        const updatedCoche = await Coche.findByIdAndUpdate(id,putCoche);
        if(!updatedCoche){
            return res.status(404).json({message: 'No tenemos coche con ese ID'}); 
         }
         //console.log("updatedCocheimagen: "+updatedCoche.imagen+"putcoche imagen: "+putCoche.imagen)
         if(updatedCoche.imagen !== putCoche.imagen){
            deleteFile(updatedCoche.imagen);
        }

        return res.status(200).json(updatedCoche);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const deleteCoche = async (req, res) => {
    try {
        console.log(req.params)
        const {id}=req.params;
        const deleteCoche = await Coche.findByIdAndDelete(id);
        if(!deleteCoche){
            return res.status(404).json({message: 'No tenemos coche con ese ID'}); 
         }
        return res.status(200).json(deleteCoche);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports={getCoches,getAllCoches,getCochesById,postCoche,putCoche,deleteCoche}