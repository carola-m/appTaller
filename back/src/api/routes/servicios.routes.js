const express = require("express")
const {getServicios,getServiciosById,postServicio,putServicio,deleteServicio} = require("../controllers/servicios.controllers")

const serviciosRoutes = express.Router();
serviciosRoutes.get("/",getServicios);
serviciosRoutes.get("/id/:id",getServiciosById);

serviciosRoutes.post("/",postServicio);
serviciosRoutes.put("/:id",putServicio);
serviciosRoutes.delete("/:id",deleteServicio);

module.exports = serviciosRoutes