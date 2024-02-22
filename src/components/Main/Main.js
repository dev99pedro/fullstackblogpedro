import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import '../../Style/Main.scss'
import heart from '../../img/heart.png'
import heart2 from '../../img/heart-2.png'
import ModalNeedToLogin from "../ModalNeedToLogin/ModalNeedToLogin"

const Main = () => {

    const navigate = useNavigate()
    const [listPost, setListPost] = useState([])
    const [likedPost, setLikedPost] = useState([])
    const [showModal, setShowModal] = useState(false)

    const fetchData = () => {
        axios.get('https://fullstacksever-e5f01fa1c438.herokuapp.com/post').then((res) => {
            setListPost(res.data)

        }).catch((error) => {
            console.log(error)
        })


        axios.get('https://fullstacksever-e5f01fa1c438.herokuapp.com/like', {
            headers: {
                token: sessionStorage.getItem('key')
            }
        }).then((res) => {
            setLikedPost(res.data.map((like) => {
                return like.postid
            }))

        }).catch((error) => {
            console.log(error)
        })

    }

    useEffect(() => {
        fetchData()
    }, [])

    const navigatePost = (id) => {
        navigate(`/post/${id}`)
    }


    const handleLike = (postid, likes) => {

        axios.post('https://fullstacksever-e5f01fa1c438.herokuapp.com/like', { postid: postid }, {
            headers: {
                token: sessionStorage.getItem('key')
            }
        }).then((response) => {
            if (response.data.error) {
                setShowModal(true)
            }
            setListPost((res) => {
                const newList = res.map((element) => {
                    return { ...element, likes: element.likes }
                })

                fetchData()

                return newList
            })




        }).catch((error) => {
            console.log(error)
        })
    }



    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {showModal && <ModalNeedToLogin openCloseModal={setShowModal}></ModalNeedToLogin>}
            </div>
            {listPost.map((element, index) => {
                console.log(element.likes)
                return (
                    <div className="main-page" key={index} >
                        <div className="container-img">
                            <img className="img"  src={element.img}></img>
                            <div className="container-btn">
                                <button onClick={() => navigatePost(element.id)}>Check  Post</button>
                            </div>
                        </div>

                        <div className="container-infos">
                            <div>
                                <p className="main-username" onClick={() => navigate(`userpage/${element.username}`)}>{element.username}</p>
                                <p className="main-title">{element.title}</p>
                                <p className="main-text">{element.text}</p>
                            </div>
                            <div className="container-likes">
                                {likedPost.includes(element.id) ? <img width="30" className="like-btn" onClick={() => handleLike(element.id, element)} src={heart2} /> : <img width="30" className="like-btn" onClick={() => handleLike(element.id, element)} src={heart} />}

                                {element.likes > 0 && <label>{element.likes}</label>}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Main