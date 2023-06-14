import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import "./Detalle.css"

const Detalle = () => {
  const { idPais } = useParams()
  const [pais, setPais] = useState({});
  const [arrayLeng, setArrayLeng] = useState([]);
  let arrayLenguajes = [];

  useEffect(() => {
    const getPaisbyId = async () => {

    await axios.get(`${process.env.REACT_APP_BACK_URL}/paises/pais/${idPais}`).then(
          (resp) => {
            // console.log(resp)
            setPais(resp.data)
            
            for (const key in resp.data.languages) {
              // console.log('lenguaje rec:',resp.data.languages[key])
              arrayLenguajes.push(resp.data.languages[key]);
              // console.log('lenguaje tot:', arrayLenguajes)
            }

            setArrayLeng(arrayLenguajes);
          },
          (resp) => {
            // console.log(resp.response.data);
          }
        ) 
    };

    getPaisbyId()
  }, []);

  return (
    <div>
      {pais.namecommon ? (
        <div className="detalle">
        {console.log(pais)}
        <div className="tittle-div"><h2 className="detalles-h"> Detalles del pais </h2> </div>
        <ul className="container-detalles">
            <li key={pais._id} className="bigcard">
                <h2 className="bigcard-h2">{pais.namecommon}</h2>
                <div className="bigcard-image_box">
                <img src={pais.flags.svg} height = '40px' widht = '40px' alt='{character.namecommon}' className="bigcard-image"/> 
                </div>
                <h2 className="bigcard-h2">Nombre Oficial: {pais.nameofficial} </h2>
                <p className="bigcard-p">Capital: {pais.capital} </p>
                <p className="bigcard-p">Continente: {pais.continente}</p>
                <p className="bigcard-p">Region: {pais.region} ({pais.subregion}) </p>
                <p className="bigcard-p">Poblacion: {pais.population}</p>
                <p className="bigcard-p">Independiente: {pais.independent ? 'Si' : 'No'}</p>
                <p className="bigcard-p">Fronteras con: {pais.borders.map((eachborder) => eachborder + ' ' )  }</p>
                <p className="bigcard-p">lenguajes oficiales: {arrayLeng.map((eachLang) => eachLang + ' ' ) }</p>

            </li>
        </ul>
        </div>
      ) : (
        <div className="charge">
           <img src="./GIF_Mundo_Banderas.gif"alt='loading' className="chargegif"/>
           <h1>Buscando tus países</h1>
        </div>
        )
    }
    </div>
  )
}


export default Detalle