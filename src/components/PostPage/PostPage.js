import React, { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import '../../Style/PostPage.scss'
import { useContext } from "react"
import { Context } from "../../Context/Context"
import Trash from '../../img/trash.png'
import { useNavigate } from "react-router-dom"
import ModalNeedToLogin from "../ModalNeedToLogin/ModalNeedToLogin"

const PostPage = () => {

    const [post, setPost] = useState([])
    const [commentList, setCommentList] = useState([])
    const [input, setInput] = useState('')
    const [emptyComment, setEmptyComment] = useState()
    const [showModal, setShowModal] = useState(false)
    const { nameLogged } = useContext(Context)
    const navigate = useNavigate()





    const { id } = useParams()




    const fechData = () => {
        axios.get(`https://pedrofullstackblog-ec342730c6c5.herokuapp.com/comment/${id}`).then((res) => {
            setCommentList(res.data)

        }).catch((error) => {
            console.log(error)
        })


        axios.get(`https://pedrofullstackblog-ec342730c6c5.herokuapp.com/comment/${id}`).then((res) => {
            if (res.data.length === 0) {
                setEmptyComment(true)
            } else {
                setEmptyComment(false)
            }
        })

    }


    useEffect(() => {
        axios.get(`https://pedrofullstackblog-ec342730c6c5.herokuapp.com/post/${id}`)
            .then((res) => {
                setPost(res.data);

            })
            .catch((error) => {
                console.log(error);
            });




        fechData();
    }, []);





    const handleComment = () => {
        axios.post('https://pedrofullstackblog-ec342730c6c5.herokuapp.com/comment', { commentBody: input, postid: id }, {
            headers: {
                token: sessionStorage.getItem('key')
            }
        }).then((res) => {
            if (res.data.error) {
                setShowModal(true)
            }
            fechData()
        }).catch((error) => {
            console.log(error)
        })
    }



    const deletePost = (id) => {
        axios.delete(`https://pedrofullstackblog-ec342730c6c5.herokuapp.com/post/delete/${id}`).then((res) => {
            navigate('/')
        }).catch((error) => {
            console.log(error)
        })
    }

    const deleteComment = (id) => {
        axios.delete(`https://pedrofullstackblog-ec342730c6c5.herokuapp.com/comment/delete/${id}`, {
            headers: {
                token: sessionStorage.getItem('key')
            }
        }).then((res) => {
            fechData()
            console.log(res)
        }).catch((error) => {
            console.log(error)
        })
    }



    return (
        <div >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {showModal && <ModalNeedToLogin openCloseModal={setShowModal}></ModalNeedToLogin>}
            </div>
            <div className={showModal ? 'post-page  modal-overlay' : 'post-page'}>
                <div className="container-post-page">
                    {post.map((element, index) => {
                        return (

                            <div key={index}>
                                <div className="container-img">
                                    <img className="img" src={element.img}></img>
                                </div>
                                <div className="container-infos">
                                    <p className="postpage-username">{element.username}</p>
                                    <p className="postpage-title">{element.title}</p>
                                    <p className="postpage-text">{element.text}</p>
                                    <div className="delete-post">
                                        {nameLogged === element.username && <img style={{ cursor: 'pointer' }} onClick={() => deletePost(element.id)} src={Trash} width="30" height="auto" />}
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>




                <div className="container-comment-session">
                    <div className="comment-session">
                        {emptyComment ? <p style={{ fontSize: '20px' }}>No comments on this post. Be the first to comment!</p> :
                            commentList.map((element, index) => {
                                return (
                                    <div key={index} className="user-comment-container">
                                        <div >
                                            <p className="username-comment">{element.username}</p>
                                        </div>
                                        <div >
                                            <p className="comment">{element.commentBody}</p>
                                        </div>
                                        {nameLogged === element.username && <img style={{ cursor: 'pointer', marginTop:'15px' }}  className="trasher" onClick={() => deleteComment(element.id)} src={Trash} width="20" height="auto" />}
                                    </div>
                                )
                            })
                        }
                    </div>


                    <div className="container-comment">
                        <label className="text-submit-comment">Submmit a Comment</label>
                        <input value={input} style={{backgroundColor: showModal ? 'unset' : ''}}  onChange={(e) => setInput(e.target.value)} type="text"></input>
                        <div className="container-btn-comment">
                            <button className="btn-submit-comment" onClick={handleComment}>Comment</button>
                        </div>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default PostPage