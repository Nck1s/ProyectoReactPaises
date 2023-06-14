import { Navigate } from "react-router-dom"

const AuthRoute = ({ component }) => {
console.log('token', localStorage.getItem('paisestoken'))

    if (localStorage.getItem('paisestoken')) 
       return component;

    if (!localStorage.getItem('paisestoken'))
      return <Navigate to="/login" />
}

export default AuthRoute