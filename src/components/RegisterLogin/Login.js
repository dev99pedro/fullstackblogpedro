import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { Context } from "../../Context/Context"
import '../../Style/Login.scss'
const Login = () => {


    const { setAuth, setNameLogged,nameLogged } = useContext(Context)

    console.log(nameLogged)

    const navigate = useNavigate()



    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    })
    const [invalidUser, setInvalidUser] = useState()

    const handleChange = (e) => {
        const { value, name } = e.target

        setInputs((prev) => {
            const newValue = { ...prev, [name]: value }

            return newValue
        })
    }

    

    const Login = () => {
        axios.post('http://localhost:3001/user/login', { username: inputs.username, password: inputs.password }).then((res) => {
            if (!res.data.error) {
                navigate('/')
                sessionStorage.setItem('key', res.data.token)
                setAuth(true)
                setNameLogged(res.data.data[0].username)
            } else {
                setInvalidUser(res.data.error)
            }
        }).catch((res) => {
            console.log(res)
        })
    }

    return (
        <div className="login">
            <div className="login-form">
                <h1>Login</h1>
                <input onChange={handleChange} value={inputs.username} placeholder="Username" name="username" type="text"></input>
                <input onChange={handleChange} value={inputs.password} name="password" placeholder="Password" type="password"></input>
                <button onClick={Login}>Login</button>
                <p style={{marginTop:'15px'}}>{invalidUser}</p>
            </div>
        </div>
    )
}

export default Login