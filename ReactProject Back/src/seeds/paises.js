const mongoose = require('mongoose');
const pais = require("../api/models/paises.models");
const dotenv = require("dotenv");
dotenv.config();

// Esta funcion se encarga de guardar el array con nuestros 
// datos, en la BBDd.
// Contiene la logica normal de las semillas.
// Miro si hay datos. Si los hubiera los borro.
// Inserto mi array de datos que he construido previamente.
const grabarPaises = (arrayPais) => {
   mongoose.connect(process.env.DB_URL)
   .then(async () => {
       const allPais = await pais.find();
       if (allPais.length > 0){
          await pais.collection.drop();
          console.log('Paises borrados')
       }   
    } )
   .catch ( (error) => console.log("error borrando paises", error))
   .then ( async () => {
       const paisMap = arrayPais.map((itemPais) => new pais(itemPais));
       await pais.insertMany(paisMap);
       console.log ('Paises insertados');
    })
   .catch( (error) => console.log("error insertando paises", error))
   .finally ( () => mongoose.disconnect())
}

// Funcion para construin nuestro conjunto de datos.
const mapearPaises = (myJson) => {
    // creamos un array vacio, donde iremos guardando
    // los datos que vamos construyendo.
    const arrayPais = [];

    // recorremos el json devuelto por la api.

    for (const iterator of myJson) {
       // creo un nuevo objeto que tendra la estructura
       //  que queramos guardar.
       const newPais1 = {};
      //  iterator = myJson[0];
      //  console.log(iterator.name)
      //  console.log(iterator.name.common)

       // guardo los datos en mi objeto, con destructuring
       // del objeto devuelto por la API
       // En esta parte, se podria añadir nueva informacion
       // En este caso, filtramos para quedarnos con parte
       // de la informacion total
       newPais1.namecommon = iterator.name.common;
       newPais1.nameofficial = iterator.name.official;
       
       ({independent :  newPais1.independent,
         currencies : newPais1.currencies,
         capital : newPais1.capital,
         region : newPais1.region,
         subregion : newPais1.subregion,
         languages : newPais1.languages,
         borders : newPais1.borders,
         area : newPais1.cleaarea,
         population : newPais1.population,
         continents :  newPais1.continente,
         flags :newPais1.flags
       } = iterator)

       // console.log(newPais1);

       // metemos el objeto en el array.
       arrayPais.push(newPais1);
    }

    // llamamos a una funcion para guardar el array
    // en base de datos.
    grabarPaises(arrayPais);
}

// funcion para realizar el fetch al api que queramos.
// nos retorna el json y se lo pasamos a una funcion,
// para mapear el json devuelto, segun nuestras 
//   necesidades.
const recuperarPaises = () => {
    fetch ('https://restcountries.com/v3.1/all')
    .then (res => res.json())
    .then ( myJson => {mapearPaises(myJson)}
    );
}

// Inicio del programa. Invoco a una funcion para hacer
// el fetch a una api publica
recuperarPaises();