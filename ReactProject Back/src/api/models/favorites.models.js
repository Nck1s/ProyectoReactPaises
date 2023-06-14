const mongoose = require("mongoose");
const Schema = mongoose.Schema 

const favoritoSchema = new Schema(
  {
      userfav: {type: Schema.Types.ObjectId, ref:"user"},
      paisfav: {type: Schema.Types.ObjectId, ref:"paises"}
  },{
       timestamps: true 
  })

const favorito = mongoose.model("favoritos", favoritoSchema);

module.exports = favorito;
