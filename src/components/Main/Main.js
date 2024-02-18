import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import '../../Style/Main.scss'
import heart from '../../img/heart.png'
import heart2 from '../../img/heart-2.png'
const Main = () => {

    const navigate = useNavigate()
    const [listPost, setListPost] = useState([])
    const [likedPost, setLikedPost] = useState([])

    const fetchData = () => {
        axios.get('http://localhost:3001/post').then((res) => {
            setListPost(res.data)

        }).catch((error) => {
            console.log(error)
        })


        axios.get('http://localhost:3001/like', {
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

        axios.post('http://localhost:3001/like', { postid: postid }, {
            headers: {
                token: sessionStorage.getItem('key')
            }
        }).then((response) => {
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
            {listPost.map((element, index) => {
                console.log(element.likes)
                return (
                    <div className="main-page" key={index}>
                        <div className="container-img">
                            <img className="img"  onClick={() => navigatePost(element.id)} src={element.img}></img>
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