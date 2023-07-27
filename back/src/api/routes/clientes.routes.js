const express = require("express")
const {getClientes,getAllClientes,getClientesById,postCliente,putCliente,deleteCliente,loginCliente} = require("../controllers/clientes.controllers")

const clientesRoutes = express.Router();
clientesRoutes.get("/",getClientes);
clientesRoutes.get("/all",getAllClientes);
clientesRoutes.get("/id/:id",getClientesById);
clientesRoutes.post("/login",loginCliente);
clientesRoutes.post("/register",postCliente);

clientesRoutes.post("/",postCliente);
clientesRoutes.put("/:id",putCliente);
clientesRoutes.delete("/:id",deleteCliente);

module.exports = clientesRoutes

