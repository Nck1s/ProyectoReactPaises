// Cargo mi fichero de variables de entorno.
const dotenv = require('dotenv');
dotenv.config();

// importo express para crear el servidor HTTP
const express = require('express')

// recupero las rutas de los paises.
const paisesRouter = require("./src/api/routes/paises.routes");
const userRouter = require("./src/api/routes/user.routes");
const favoritosRouter = require('./src/api/routes/favoritos.routes');

// import para la conexion con bbdd
const {connect} = require("./src/utils/db")

// para validaciones
const {isAuth} = require("./src/middlewares/auth")

// importo cors, para acceso desde front.
const cors = require("cors");

// defino puerto para el servidor http
const PORT = process.env.PORT;

// configuracion de cloudinary
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });

// conexion con BBDD
connect ();

// creo el servidor.
const app = express();

//Configuramos el servidor, para aceptar llamadas desde el front.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Method', 'POST, GET, PUT, DELETE, PATCH'); //Decimos que metodos tenemos permitidos
    res.header('Access-Control-Allow-Credentials', 'true'); //permitimos la conexión con credenciales(Bearer token)
    res.header('Access-Control-Allow-Headers', 'Content-Type'); // permitimos los headers del tipo Content-Type
    res.header('Access-Control-Allow-Origin', '*')
    next();
  })
  
//VAMOS A CONFIGURAR LOS CORS
//CORS --> CORS ORIGIN RESOURCE SHARING --> Intercambio de recursos cruzados -> manera de permitir el compartir recursos enntre distintos origenes
app.use(cors(
    {
      // origin: ["http://localhost:5000", "http://127.0.0.1:5000"],  //si tenemos varios origenes podemos ponerlos en un array
      origin: "*", // permito todas las conexiones
      credentials: true
    }
  ))

// configuro mi servidor con los routes, creados
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/paises', paisesRouter);
app.use("/user", userRouter);
app.use("/favoritos", favoritosRouter);

//activo el servidor.
app.listen(PORT, () => {console.log('Servidor escuchando en:', PORT)})