const { generateSign } = require("../../utils/jwt");
const { validateEmail, validatePassword, usedEmail } = require("../../utils/validators");
const cliente = require("../models/cliente.model");
const bcrypt = require("bcrypt");

const login = async(req, res) => {
    try {
        const clienteInfo = await cliente.findOne({email: req.body.email});
        console.log(clienteInfo)
        if(!clienteInfo){
            return res.status(404).json({message: 'Email is not registered'});
        }
        if(!bcrypt.compareSync(req.body.password, clienteInfo.password)){
            return res.status(404).json({message: 'Password is incorrect'});
        }
        const token = generateSign(clienteInfo._id, clienteInfo.email);
        return res.status(200).json({user:clienteInfo, token:token});
    } catch (error) {
        return res.status(500).json(error); 
    }
};


const register = async(req, res) => {
    try {
        const newCliente = new cliente(req.body);
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
};


module.exports = { login,register}