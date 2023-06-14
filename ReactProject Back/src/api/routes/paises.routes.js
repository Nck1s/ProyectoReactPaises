const express = require("express");
const paisesRouter = express.Router();
const {getPaises, getPaisesbyId, getPaisPaginado,
    postPaises, putPaises, deletePaises} = require ('../controllers/paises.controllers')

const {isAuth} = require("../../middlewares/auth")
const upload = require("../../middlewares/upload.file");

// const {getArtist, postArtist, putArtist, deleteArtist} = require("../controllers/artist.controllers");
// const { isAuth, isAdmin} = require("../../middlewares/auth");

paisesRouter.get("/", getPaises)
paisesRouter.get("/pais/:id", getPaisesbyId)
paisesRouter.get("/paginacion", getPaisPaginado)

paisesRouter.post("/", [isAuth], postPaises)
paisesRouter.put("/:id", [isAuth], putPaises)
paisesRouter.delete("/:id", [isAuth], deletePaises)

module.exports = paisesRouter