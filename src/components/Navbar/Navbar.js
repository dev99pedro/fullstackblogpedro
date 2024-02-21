import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { Context } from "../../Context/Context"
import '../../Style/Navbar.scss'
import person from '../../img/person-login.png'
import axios from "axios"
import logo from '../../img/logo.png'
import LogoMobile from '../../img/mobilelogo.jpg'
const Navbar = () => {


    const { auth, setAuth, nameLogged, setNameLogged } = useContext(Context)

    useEffect(() => {
        if (sessionStorage.getItem('key')) {
            setAuth(true)
        } else {
            setAuth(false)
        }


        axios.get('https://fullstacksever-e5f01fa1c438.herokuapp.com/user', {
            headers: {
                token: sessionStorage.getItem('key')
            }
        }).then((res) => {
            if (auth) {
                setNameLogged(res.data[0].username)
            }
        })
    })

    const Logout = () => {
        sessionStorage.removeItem('key')
        setAuth(false)
        window.location.reload()
    }



    return (
        <div className="navbar-content">
            <div className="logo-header-mobile">
                <Link to="/">
                    <img src={logo} width="100" />
                </Link>
            </div>
            <div className="navbar">
                <div className="logo-header">
                    <Link to="/">
                        <img src={logo} width="120" />
                    </Link>
                </div>

                <div className="login-logout">
                    <Link className="navbar-links" to="/">Home</Link>
                    <Link className="navbar-links" to="/createPost">Create Post</Link>
                    {auth ? (
                        <>
                            <Link className="navbar-links" onClick={Logout}>Logout</Link>
                            <div className="name-logged">
                                <img src={person} width="20"></img>
                                <p>{nameLogged}</p>
                            </div>
                        </>
                    ) : (<>
                        <Link className="navbar-links" to="/login">Login</Link>
                        <Link className="navbar-links" to="/register">Register</Link>
                        </>)}
                </div>

            </div>
            <hr width="98%" style={{ margin: 'auto' }}></hr>
        </div>
    )
}

export default Navbar