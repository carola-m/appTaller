const Cliente = require("../models/cliente.model");
const { generateSign } = require("../../utils/jwt");
const { validateEmail, validatePassword, usedEmail } = require("../../utils/validators");

const bcrypt = require("bcrypt");

const login = async(req, res) => {
    try {
        const userInfo = await User.findOne({email: req.body.email});
        if(!userInfo){
            return res.status(404).json({message: 'Email is not registered'});
        }
        if(!bcrypt.compareSync(req.body.password, userInfo.password)){
            return res.status(404).json({message: 'Password is incorrect'});
        }
        const token = generateSign(userInfo._id, userInfo.email);
        return res.status(200).json({user:userInfo, token:token});
    } catch (error) {
        return res.status(500).json(error); 
    }
};

const getClientes = async (req, res)=>{
    try {
        let {page, limit} = req.query;
        const numClientes = await Cliente.countDocuments();
        limit = limit ? parseInt(limit) || 4 : 4;
        let numPages = numClientes%limit > 0 ? numClientes/limit + 1 : numClientes/limit;
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

    const allClientes = await Cliente.find().populate("coches", "matricula marca clientes").skip(skip).limit(limit);
    const response = {
        info: {
            numClientes: numClientes,
            page: page,
            limit: limit,
            maxpages: numPages,
            nextPage: numPages >= page + 1 ? `/clientes?page=${page + 1}&limit=${limit}` : null,
            previousPage: page != 1 ? `/libros?page=${page - 1}&limit=${limit}` : null
        },
        results: allClientes
    }
    
        //const allClientes = await Cliente.find().populate("coches", "matricula marca clientes");
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json(error);
    }
}
const getAllClientes = async (req, res)=>{
    try {
        
        const allclientes = await Cliente.find();
        return res.status(200).json(allclientes)
    } catch (error) {
        return res.status(500).json(error);
    }
}
const getClientesById = async (req, res)=>{
    try {
        const {id}=req.params;
        const clienteById = await Cliente.findById(id);
        return res.status(200).json(clienteById)
    } catch (error) {
        return res.status(500).json(error);
    }
}

const loginCliente = async(req, res) => {
    try {
        const clienteInfo = await Cliente.findOne({email: req.body.email});
        if(!clienteInfo){
            return res.status(404).json({message: 'Email is not registered'});
        }
        if(!bcrypt.compareSync(req.body.password, clienteInfo.password)){
            return res.status(404).json({message: 'Password is incorrect'});
        }
        const token = generateSign(clienteInfo._id, clienteInfo.email);
        console.log("token: "+token)
        return res.status(200).json({email:clienteInfo.email, token:token});
    } catch (error) {
        console.log("no token y error: "+token)
        return res.status(500).json(error); 
    }
};


const postCliente = async(req, res)=>{
    try {
        const newCliente = new Cliente(req.body);
        console.log(newCliente)
        //validarEmail
        if(!validateEmail(newCliente.email)){
            return res.status(400).json({message: "Invalid email"})
        }
        //validarPassword
        if(!validatePassword(newCliente.password)){
            return res.status(400).json({message: "Invalid pasword"})
        }

        //validar email usado
        if(await usedEmail(newCliente.email)){
            return res.status(400).json({message: "Email already used"})
        }
        
        //Encriptar Password
        newCliente.password = bcrypt.hashSync(newCliente.password, 10);
        const createdCliente = await newCliente.save();

        return res.status(201).json(createdCliente)
    } catch (error) {
        return res.status(500).json(error); 
    }


    // try { 
        
    //     const newCliente= new Cliente(req.body);
        
    //     const createdCliente =  await newCliente.save();
    //     return res.status(201).json(createdCliente);
    // } catch (error) {
    //     return res.status(500).json(error);
    // }
}

const putCliente = async (req, res) => {
    try {
        const {id}=req.params;
        const putCliente = new Cliente(req.body);
        putCliente._id=id;
        console.log(putCliente)
        const updatedCliente = await Cliente.findByIdAndUpdate(id,putCliente,{new:true});
        if(!updatedCliente){
            return res.status(404).json({message: 'No tenemos cliente con ese ID'}); 
         }
         //console.log(updatedCliente)
        return res.status(200).json(updatedCliente);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const deleteCliente = async (req, res) => {
    try {
        const {id}=req.params;
        const deleteCliente = await Cliente.findByIdAndDelete(id);
        if(!deleteCliente){
            return res.status(404).json({message: 'No tenemos cliente con ese ID'}); 
         }
        return res.status(200).json(deleteCliente);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports={getClientes,getAllClientes,getClientesById,postCliente,putCliente,deleteCliente,loginCliente}