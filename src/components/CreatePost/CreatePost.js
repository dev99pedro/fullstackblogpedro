import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import '../../Style/CreatePost.scss'
const CreatePost = () => {

    const [inputPost, setInputPost] = useState({
        title: '',
        text: ''
    })
    const [error, setError] = useState('')

    const navigate = useNavigate()






    const handleChange = (e) => {
        const { name, value } = e.target
        setInputPost((prev) => {
            const newValue = { ...prev, [name]: value }
            return newValue
        })
    }





    const createPost = () => {
        if (inputPost.title.length > 5 && inputPost.text.length > 5) {
            navigate('/')
            axios.post('http://localhost:3001/post/createpost', { title: inputPost.title, text: inputPost.text, img: 'https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png' }, {
                headers: {
                    token: sessionStorage.getItem('key')
                }
            }).then((res) => {
                return res
            }).catch((error) => {
                console.log(error)
            })
        } else {
            setError('O post precisa ter o mínimo de 5 caracteres no texto e título')
        }

    }



    return (
        <div className="container-createpost">
            <div className="createpost">
                <h3>Create your post</h3>
                <label className="title">Title of the post</label>
                <input value={inputPost.title} name="title" onChange={handleChange} style={{ height: '30px' }} type="text"></input>
                <label className="text">Text of the post</label>
                <input value={inputPost.text} name="text" onChange={handleChange} style={{ height: '30px' }} type="text"></input>
                <p style={{ color: ' #ffffff', textAlign: 'center', marginTop: ' 20px' }}>{error}</p>
                <button className="btn-createpost" onClick={() => createPost()}>Create a Post</button>
            </div>
        </div>
    )
}

export default CreatePost