import { useState } from 'react'
import '../../Style/ModalNeedToLogin.scss'
import Close from '../../img/close.png'

const ModalNeedToLogin = ({ openCloseModal }) => {

    const [closeTheModal, setCloseTheModal] = useState(false)

    const closeModal = () => {
        openCloseModal(closeTheModal)
    }


    return (
        <div className="modal">
            <div onClick={closeModal} className='img-modal'>
                <img src={Close} width="30" height="auto" />
            </div>
            <div>
                <h2>You Need To Login!</h2>
            </div>
            <div onClick={closeModal} className='btn-modal-close'>
                <button>
                    Close
                </button>
            </div>
        </div>
    )
}

export default ModalNeedToLogin