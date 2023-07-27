const cliente = require("../api/models/cliente.model");

// validacion con expresion regular de la sintaxis del email
const validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(String(email).toLowerCase());
}

// validacion con regex de password (minimo una mayuscula, un numero, un caracter especial y entre 6 y 16 caracteres)
const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/; // password valida Abcd123$

    return regex.test(String(password));
}

// comprueba su email existe en BBDD en coleccion clientes
const usedEmail = async(email) => {
    const clientes = await cliente.find({ email: email });
    console.log(cliente.length)
    return clientes.length;
}

module.exports = { validatePassword, validateEmail, usedEmail }