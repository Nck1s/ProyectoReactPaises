import { Link } from "react-router-dom"
import "./Navbar.css"

const Navbar = () => {
  return (
  
   <nav className="navbar">
        <ul className="navul">
          <li className="navbar_item"> <Link to="/"> Home </Link> </li>
          <li className="navbar_item"> <Link to="/listadoTotal"> Países con filtros </Link></li>
          <li className="navbar_item"> <Link to="/listadoPaginado"> Países Paginados </Link></li>
          <li className="navbar_item"> <Link to="/favoritos"> Países Favoritos </Link></li>
          <li className="navbar_item"> <Link to="/juego"> Juego Banderas </Link></li> 
        </ul>
        <div className="navdiv">
        <article className="navbar_item"><Link to="/login"> Login/registro </Link> </article>
        </div>
   </nav>

  )
}

export default Navbar