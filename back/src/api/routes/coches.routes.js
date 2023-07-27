const express = require("express")
const {getCoches,getAllCoches,getCochesById,postCoche,putCoche,deleteCoche} = require("../controllers/coches.controllers")
const { isAuth} = require("../../middlewares/auth");
const upload = require("../../middlewares/upload.file");
const cochesRoutes = express.Router();


cochesRoutes.get("/",getCoches);
cochesRoutes.get("/all",getAllCoches);
cochesRoutes.get("/id/:id",getCochesById);

cochesRoutes.post("/",isAuth, upload.single("imagen"),postCoche);
cochesRoutes.put("/:id",isAuth, upload.single("imagen"),putCoche);
cochesRoutes.delete("/:id",deleteCoche);

module.exports = cochesRoutes