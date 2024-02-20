import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import '../../Style/UserPage.scss'
const UserPage = () => {
    const [userPageList, setUserPageList] = useState([])
    const { username } = useParams()




    useEffect(() => {
        axios.get(`https://pedrofullstackblog-ec342730c6c5.herokuapp.com/post/username/${username}`).then((res) => {
            setUserPageList(res.data)
        })
    }, [])



    return (
        <div className="userpage">
            <h1 style={{ textAlign: ' center' }}>{username}</h1>
            {userPageList.map((element, index) => {
                return (
                    <div className="container-userpage" key={index}>
                        <img src={element.img}></img>
                        <p className="userpage-title">{element.title}</p>
                        <p className="userpage-text">{element.text}</p>
                        <p className="userpage-username">{element.username}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default UserPage