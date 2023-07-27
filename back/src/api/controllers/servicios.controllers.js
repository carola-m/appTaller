const Servicio = require("../models/servicio.model");

const getServicios = async (req, res)=>{
    try {
        let {page, limit} = req.query;
        const numServicios = await Servicio.countDocuments();
        limit = limit ? parseInt(limit) || 4 : 4;
        let numPages = numServicios%limit > 0 ? numServicios/limit + 1 : numServicios/limit;
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

    const allServicios = await Servicio.find().skip(skip).limit(limit);
    const response = {
        info: {
            numServicios: numServicios,
            page: page,
            limit: limit,
            maxpages: numPages,
            nextPage: numPages >= page + 1 ? `/servicios?page=${page + 1}&limit=${limit}` : null,
            previousPage: page != 1 ? `/libros?page=${page - 1}&limit=${limit}` : null
        },
        results: allServicios
    }
    
    return res.status(200).json(response)
        return res.status(200).json(allServicios)
    } catch (error) {
        return res.status(500).json(error);
    }
}
const getServiciosById = async (req, res)=>{
    try {
        const {id}=req.params;
        const servicioById = await Servicio.findById(id);
        return res.status(200).json(servicioById)
    } catch (error) {
        return res.status(500).json(error);
    }
}

const postServicio = async (req, res)=>{
    try {
        const newServicio= new Servicio(req.body);
        const createdServicio = await newServicio.save();
        return res.status(201).json(createdServicio);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const putServicio = async (req, res) => {
    try {
        const {id}=req.params;
        const putServicio = new Servicio(req.body);
        putServicio._id=id;
        const updatedServicio = await Servicio.findByIdAndUpdate(id,putServicio,{new:true});
        if(!updatedServicio){
            return res.status(404).json({message: 'No tenemos servicio con ese ID'}); 
         }
        return res.status(200).json(updatedServicio);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const deleteServicio = async (req, res) => {
    try {
        const {id}=req.params;
        const deleteServicio = await Servicio.findByIdAndDelete(id);
        if(!deleteServicio){
            return res.status(404).json({message: 'No tenemos servicio con ese ID'}); 
         }
        return res.status(200).json(deleteServicio);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports={getServicios,getServiciosById,postServicio,putServicio,deleteServicio}