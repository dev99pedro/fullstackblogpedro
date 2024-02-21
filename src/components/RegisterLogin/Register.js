import React, { useState } from "react"
import axios from "axios"
import '../../Style/Register.scss'
import { useNavigate } from "react-router-dom"
const Register = () => {

    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    })

    const navigate = useNavigate()
    const [error, setError] = useState(false)

    const handleChange = (e) => {
        const { value, name } = e.target

        setInputs((prev) => {
            const newValue = { ...prev, [name]: value }

            return newValue
        })
    }

    const register = () => {
        if (inputs.username.length > 3 || inputs.password.length > 5) {
            navigate('/')
            axios.post('https://fullstacksever-e5f01fa1c438.herokuapp.com/user', { username: inputs.username, password: inputs.password }).then((res) => {
                console.log(res)
            }).catch((error) => {
                console.log(error)
            })
        } else {
            setError(true)
        }


    }

    return (
        <div className="register" >
            <div className="register-form">
                <h1>SignUp</h1>
                <input onChange={handleChange} value={inputs.username} placeholder="Username" name="username" type="text"></input>

                <input onChange={handleChange} value={inputs.password} placeholder="Password" name="password" type="password"></input>
                <button onClick={register}>SignUp</button>
                {error && <p style={{ color: 'red', marginTop: '30px', textAlign: 'center', fontSize: '14px' }}>The username and password must have at least 5 characters and the password must contain at least one number</p>}
            </div>
        </div>
    )
}

export default Register