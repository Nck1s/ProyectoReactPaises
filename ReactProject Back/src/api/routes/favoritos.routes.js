const express = require("express");
const favoritosRouter = express.Router();

const {getFavoritos, postFavoritos, deleteFavoritos} = require ('../controllers/favoritos.controllers')

favoritosRouter.get("/:id", getFavoritos)
favoritosRouter.post("/", postFavoritos)
favoritosRouter.delete("/:id",  deleteFavoritos)

module.exports = favoritosRouter