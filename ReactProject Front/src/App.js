import './styles/App.css';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from '../src/components/Navbar/Navbar';
import Home from '../src/components/Home/Home';
import Listado from '../src/components/Listado/Listado'
import Paginacion from '../src/components/Paginacion/Paginacion'
import Login from '../src/components/Login/Login'
import Juego from './components/Juego/Juego';
import Favoritos from './components/Favoritos/Favoritos';
import Detalle from './components/Detalle/Detalle';
import AuthRoute from './components/AuthRoute/AuthRoute';

function App() {
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  //formData es lo que ya llenado el usuario en el formulario de login
  const loginUser = async (formData) => {
    // este bloque de código se sustituira por una  peticion al servidor post para hacer el login
    // console.log(formData);

    let responseStatus = 0;

    const data = {email: formData.email, password:formData.password};
    const url = `${process.env.REACT_APP_BACK_URL}/user/login`

    // Opciones por defecto estan marcadas con un *
    await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    .then (response => {
        responseStatus = response.status;
        return response.json() 
    })
    .catch((error) => {
        console.log(' error petición Fetch:' + error.message)}
    )
    .then(auxdata => {
      if (responseStatus === 200)
       {
         console.log(auxdata)
         localStorage.setItem('paisestoken', auxdata.token);
         localStorage.setItem('paisesuser', auxdata.user._id);

         setLoginError('');
         navigate('/');
       }  
      else
      {
        setLoginError('Usuario o contaseña incorrecta');
      }
    })
  .catch(error => {
     console.log('Hubo un problema con la petición Fetch:' + error.message)
    }
  );
  };

//formData es lo que ya llenado el usuario en el formulario de login
const registerUser = async (formData) => {
  // este bloque de código se sustituira por una  peticion al servidor post para hacer el login
  // console.log(formData);

  let responseStatus = 0;

  const data = {email: formData.email, password:formData.password};
  const url = `${process.env.REACT_APP_BACK_URL}/user/register`

  await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  })
  .then (response => {
    responseStatus = response.status;
    return response.json() 
  })
  .catch((error) => {
    console.log(' error petición Fetch:' + error.message)}
  )
  .then(auxdata => {
    if (responseStatus === 201)
     {
       loginUser(formData);
     }  
    else
     {
      setLoginError('Error al registrar al usuario');
     }
  })
  .catch(error => {
     console.log('Hubo un problema con la petición Fetch:' + error.message)
  });
};

  return (
    <div className="App">
     <NavBar />
     <Routes>
       <Route path= '/' element = {<Home />} />
       <Route path= '/listadoTotal' element = {
              <AuthRoute component={<Listado />} />
           } />
       <Route path= '/listadoPaginado' element = {
              <AuthRoute component={<Paginacion />} />
          } />
       <Route path= '/detalle/:idPais' element={<Detalle/>} />
          
       <Route path= '/favoritos' element = {
              <AuthRoute component={<Favoritos />} />
          } />
       <Route path= '/juego' element = {<Juego />} />
       <Route path= '/login' element = {<Login loginUser={loginUser} loginError={loginError} registerUser={registerUser}/>} />
     </Routes>

    </div>
  );
}

export default App;
