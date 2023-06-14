const mongoose = require("mongoose");
const Schema = mongoose.Schema 

const paisSchema = new Schema(
    {
        namecommon: {type: String, require:true},
        nameofficial: {type: String, require:true},
        independent: {type:String, require:true},
        currencies: {type:Object},
        capital: [{type: String}],
        region: {type:String},
        subregion: {type: String},
        languages: {type:Object},
        borders: [{type: String}],
        area:{type:Number},
        population:{type:Number},
        continente: [{type: String}],
        flags:{type:Object}

},{
   timestamps: true 
})

const pais = mongoose.model("paises", paisSchema);

module.exports = pais;

