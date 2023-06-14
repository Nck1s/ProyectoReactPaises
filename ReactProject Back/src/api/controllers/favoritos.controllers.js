const favorito = require('../models/favorites.models');

const getFavoritos = async (req, res) => {
   try {
      const {id} = req.params;
      const allFavoritos = await favorito.find({userfav:id}).populate("userfav paisfav");
      if (allFavoritos.length == 0)
         return res.status(404).json({message:"No hay favoritos informados."});   
   
      return res.status(200).json(allFavoritos);   
   } catch (error) {
       console.log(error);
       return res.status(500).json(error);
   }
}

const postFavoritos = async (req, res) => {
   try {
      const newFavorito = new favorito(req.body);

      //el metodo save nos sirve para guardar un elemento en BBDD
      const createdFavorito = await newFavorito.save();  
      return res.status(201).json(createdFavorito);

   } catch (error) {
       return res.status(500).json(error);
   }
}; 

const deleteFavoritos = async (req, res) =>  {
   try {
       const {id} = req.params;
       const deleteFavorito = await favorito.findByIdAndDelete(id);

       if(!deleteFavorito){
           return res.status(404).json({message: 'No tenemos favoritos con ese ID'}); 
        }
       return res.status(200).json(deleteFavorito);
   } catch (error) {
       return res.status(500).json(error);
   }
};

module.exports = {getFavoritos, postFavoritos, deleteFavoritos}