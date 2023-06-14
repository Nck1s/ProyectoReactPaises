const Pais = require('../models/paises.models');

const getPaises = async (req, res) => {
   try {
      const allPaises = await Pais.find();
            if (allPaises.length == 0)
         return res.status(404).json({message:"No hay paises informados."});   
    
      return res.status(200).json(allPaises);   
   } catch (error) {
    console.log(error);
     return res.status(500).json(error);
   }
}

//GET PAGINADO
const getPaisPaginado = async(req,res) => {
    try {
        //Recoger querys de numero de pagina(page) y limite por pagina(limit)
        let {page, limit} = req.query;
        
        //Contar el numero de elementos en mi coleccion
        const numPaises = await Pais.countDocuments();
        
        //Si no está seteado seteo el limite a 5
        limit = limit ? parseInt(limit) || 20 : 20;

        //Comprobar el numero máximo de paginas dependiendo de mi limite
        let numPages = numPaises%limit > 0 ? numPaises/limit + 1 : numPaises/limit;

        //Si no está seteado seteo el numero de pagina a 1
        page = page > numPages ? numPages : page < 1 ? 1 :  parseInt(page) || 1;
        // if(page > numPages){
        //     page = numPages;
        // }else if(page < 1){
        //     page = 1
        // }else{
        //     page = page
        // }

        // Calculo el salto(skip) que tengo que dar a mi find para empezar a partir del elemento que quiero
        const skip = (page - 1) * limit;

        const allPaises = await Pais.find().skip(skip).limit(limit);

        const response = {
            info: {
                numPaises: numPaises,
                page: page,
                limit: limit,
                nextPage: numPages >= page + 1 ? `/paginacion?page=${page + 1}&limit=${limit}` : null,
                previusPage: page != 1 ? `/paginacion?page=${page - 1}&limit=${limit}` : null
            },
            results: allPaises
        }
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getPaisesbyId = async (req, res) => {
    try {
        const {id} = req.params;
        const findPais = await Pais.findById(id);
        if (!findPais)
           return res.status(404).json({message:"No hay pais con el id indicado"});
  
        return res.status(200).json(findPais);
     } catch (error) {
       return res.status(500).json(error);
     }
  }
 
const postPaises = async (req, res) => {
   try {
      const newPais = new Pais(req.body);

      if (req.file)
      {
         newPais.imagen = req.file.path;
      }
      
      //el metodo save nos sirve para guardar un elemento en BBDD
      const createdPais = await newPais.save();  

      return res.status(201).json(createdPais);

   } catch (error) {
       return res.status(500).json(error);
   }
}; 

const putPaises = async (req, res) =>  {
   try {
       const {id} = req.params;
       const putPais = new Pais(req.body);
       putPais._id = id;

       const updatedPais = await Pais.findByIdAndUpdate(id, putPais, {new: true});
       if(!updatedPais){
           return res.status(404).json({message: 'No tenemos peliculas con ese ID'}); 
        }
       return res.status(200).json(updatedPais);
   } catch (error) {
       return res.status(500).json(error);
   }
};

const deletePaises = async (req, res) =>  {
   try {
       const {id} = req.params;
       const deletePais = await Pais.findByIdAndDelete(id);

       if(!deletePais){
           return res.status(404).json({message: 'No tenemos peliculas con ese ID'}); 
        }

        return res.status(200).json(deletePais);
   } catch (error) {
       return res.status(500).json(error);
   }
};

module.exports = {getPaises, getPaisesbyId, getPaisPaginado,
    postPaises, putPaises, deletePaises}