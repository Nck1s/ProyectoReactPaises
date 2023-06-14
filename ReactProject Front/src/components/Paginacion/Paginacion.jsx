import { useEffect, useState } from "react";
import axios from "axios";
import "./Paginacion.css"
import { Link } from "react-router-dom"

const Paginacion = () => {
  const [paisesPag, setPaisesPag] = useState([]);
  const [page, setPage] = useState(null);
  const [pages, setPages] = useState(null);
  const [nextPage, setNextPage] = useState('');
  const [previousPage, setPreviousPage] = useState('');
  const [paginaAct, setPaginaAct] = useState('/Paginacion');

  const addFavorite1 = async (id) => {
      let responseStatus = 0;

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
    };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setPaginaAct(previousPage);
    }
  };
  
  const handleNextPage = () => {
    if (page < pages) {
      setPage(page + 1);
      setPaginaAct(nextPage);
    }
  };
  
  useEffect(() => {
    const getPaisesPag = async () => {
      
      // axios.interceptors.request.use(config => {
      //   const token = localStorage.getItem("paisestoken");
      //   config.headers["Authorization"] = `Bearer ${token}`;
      //   return config;
      // });

      const paisesApi = await axios.get(`${process.env.REACT_APP_BACK_URL}/paises${paginaAct}`)
      setPaisesPag(paisesApi.data.results);
      setPages(Math.floor((paisesApi.data.info.numPaises / paisesApi.data.info.limit)) + 
      (paisesApi.data.info.numPaises % paisesApi.data.info.limit ? 1 : 0));

      setNextPage(paisesApi.data.info.nextPage)
      setPreviousPage(paisesApi.data.info.previusPage)
      setPage(paisesApi.data.info.page)   
    };

    getPaisesPag();
  }, [paginaAct]);


  return (
    <div>
      {paisesPag.length ? (
        <>
        <div className="tittle-div"><h2 className="paises-h"> Todos los países </h2> </div>
        <ul className="container">
          {paisesPag.map((character, i) => (
            <li key={i} className="flagcard">
                <div className="flagcard-image_box">
                 <img src={character.flags.svg} height = '20px' widht = '20px' alt='{character.namecommon}' className="flagcard-image"/>
                </div>
                 <h2 className="flagcard-h2">{character.namecommon}</h2>
                 <p className="flagcard-p"> {character.region} </p>
                 
                 <div className="flagcard-div_buttons">
                  <Link to={`/detalle/${character._id}`} className="flagcard-hiper">Detalle</Link>
                  
                  <button onClick={() => {addFavorite1(character._id)}} className="flagcard-button">Añadir Favorito</button>
                 </div>
            </li>

          ))}
        </ul>
        <div className="pagination">
         <button onClick={() => {
             handlePreviousPage()
           }} className="pagination-button">Previous</button>

        <span className="pagination-span"> Page {page} </span>

        <button onClick={() => {
            handleNextPage()}} className="pagination-button">Next</button> 
        </div>
        
        </>
      ) : (
        <div className="charge">
           <img src="./GIF_Mundo_Banderas.gif"alt='loading' className="chargegif"/>
           <h1>Buscando tus países</h1>
        </div>
      )}
    </div>
  );
};

export default Paginacion