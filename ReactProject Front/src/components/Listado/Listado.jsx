import { useEffect, useState } from "react";

import axios from "axios";
// import { API } from "../../services/api";

import { Link } from "react-router-dom"
import "./Listado.css"

const Listado = () => {

  const [filtroContinente, setfiltroContinente] = useState('');
  const [filtroBusqueda, setfiltroBusqueda] = useState('');
  const [paises, setPaises] = useState([]);
  const [paisesContinente, setPaisesContinente] = useState([]);
  const [filtroPaises, setFiltroPaises] = useState([]);
  

  const addFavorite = async (id) => {
    let responseStatus = 0;

    localStorage.getItem('paisesuser');

    const data = {userfav: localStorage.getItem('paisesuser'), paisfav:id};
    const url = `${process.env.REACT_APP_BACK_URL}/favoritos`
  
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
       }  
    })
    .catch(error => {
       console.log('Hubo un problema con la petición Fetch:' + error.message)
    });
  }

  const handleFiltro = (ev) =>
  {
    let paisesFiltrados = [];

    if (filtroContinente)
     {
       paisesFiltrados = paisesContinente.filter( (eachPais) =>
         (eachPais.namecommon.toLowerCase().includes(ev.target.value.toLowerCase()))
        )  
     }  
    else
     {
       paisesFiltrados = paises.filter( (eachPais) =>
          (eachPais.namecommon.toLowerCase().includes(ev.target.value.toLowerCase()))
        )  
     }
     setfiltroBusqueda(ev.target.value);
     setFiltroPaises ([...paisesFiltrados]     )  
 } 

  useEffect(() => {
    const getPaises = async () => {
      
      // axios.interceptors.request.use(config => {
      //   const token = localStorage.getItem("paisestoken");
      //   config.headers["Authorization"] = `Bearer ${token}`;
      //   return config;
      // });

        await axios.get(`${process.env.REACT_APP_BACK_URL}/paises`).then(
          (resp) => {
            setPaises(resp.data);
            setPaisesContinente(resp.data);
            setFiltroPaises(resp.data);
          },
          (error) => {
            console.log(error);
          }
        ) 
        // await API.get("/paises")
        // .then((res) => {
        //     console.log(res.data)
        // })  
    };

    getPaises();
  }, []);

  const handleContinente = (event) => {
      setfiltroContinente (event.target.value);

      const paisesFiltrados = paises.filter( (eachPais) =>
          (
            eachPais.continente[0].toLowerCase().includes(event.target.value.toLowerCase())
          )
       )  
      setPaisesContinente ([...paisesFiltrados]     )  
      setFiltroPaises ([...paisesFiltrados]     )  
  }

  return (
    <>
      <div >
        <div className="filter-div">
        <label htmlFor="filtro"> 
        <h3 className="filter-h">Filtro por Pais </h3></label>
        <input type="text" id="filtro" name="filtro" placeholder="Nombre del pais..." onChange={handleFiltro} className="countriesfilter"/>

        <select onChange={handleContinente} className="continentes">
          <option value="">Seleccione Continente</option>
          <option value="Europe">Europa </option>
          <option value="Asia">Asia</option>
          <option value="Africa">Africa</option>
          <option value="North America">America del Norte</option>
          <option value="South America">America del Sur</option>
          <option value="Oceania">Oceania</option>
          <option value="Antarctica">Antarctica</option>
        </select>
        </div>
      
        <br />
      </div>
      <div>
      {filtroPaises.length ? (
        <>
        <ul className="container">
          {filtroPaises.map((character, i) => (
            <li key={i} className="flagcard">
                 <div className="flagcard-image_box">
                 <img src={character.flags.svg} alt='{character.namecommon}' className="flagcard-image"/> 
                 </div>
                 <h2 className="flagcard-h2">{character.namecommon}</h2>
                 <p className="flagcard-p"> {character.region} </p>
                 
                 <div className="flagcard-div_buttons">
                  <Link to={`/detalle/${character._id}`} className="flagcard-hiper">Detalle</Link>
                  
                  <button onClick={() => {addFavorite(character._id)}} className="flagcard-button">Añadir Favorito</button>
                 </div>
                 
            </li>
          ))}
        </ul>
        </>
      ) : (
        <>
        { filtroBusqueda ? 
          <div className="charge">
             <h1 className="filter-h1">No existen países con el patrón informado</h1>
           </div>
          :
          <div className="charge">
           <img src="./GIF_Mundo_Banderas.gif"alt='loading' className="chargegif"/>
           <h1>Buscando tus países</h1>
        </div>
        }
        </>
       
      )}
    </div>
    </>
  )
}

export default Listado