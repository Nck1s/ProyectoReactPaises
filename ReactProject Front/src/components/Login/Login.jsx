import {useState} from 'react'
import "./Login.css"

const initial_state = {
    email: "",
    password: ""
}

const Login = ({ loginUser, loginError, registerUser }) => {
    const [formData, setFormdata] = useState(initial_state)
    const handleSubmitForm = (ev) => {
        loginUser(formData);
    }

    const handleRegistro = (ev) => {
      registerUser(formData);
    } 

    const handleInput = (ev) => {
        const { name, value } = ev.target
        setFormdata({ ...formData, [name]: value })
    }
    
    return (
           <div className="login-box">
            <form onSubmit={(ev) => ev.preventDefault()}>

                <label htmlFor="email"><h2 className='login-h'>Email</h2></label>
                <input type="text" id="email" placeholder='  Insert your email...' name="email" onChange={handleInput} value={formData.email} className='login-input'/>
                <br />
                <label htmlFor="password"><h2 className='login-h'>Password</h2></label>
                <input type="password" id="password" name="password" placeholder='  Insert your password...' onChange={handleInput} value={formData.password} className='login-input'/>
                <br />
                <input type="submit" value="Iniciar sesion" onClick={handleSubmitForm} className='login-button'/>

                <input type="submit" value="Registrarse" onClick={handleRegistro} className='login-button'/>
            </form>
            {loginError ? <p style={{ color: "red" }}>{loginError}</p> : null}
        </div > 
    )
}

export default Login