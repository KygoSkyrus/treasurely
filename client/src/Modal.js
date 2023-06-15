import React from "react";

const Modal = (props) => {

  const { handleFormSubmit, handleCloseModal, urlState, setUrlState, isOpen, onClose, content } = props
  const handleClose = () => {
    onClose();
  };
  console.log('xx,',content.props.xx)//thats how props can be passed whihc the whole component,,teh component itself is a  props
  return (
    <>
      <div
        // id='modal' 
        className={`modal ${isOpen ? 'open' : ''}`}>
        <section className='modal-close-btn'
          // onClick={e=>handleCloseModal("modal")}
          onClick={handleClose}
        >
          <i className="fa fa-xl fa-window-close"></i>
          {/* <i className="fa fa-times"></i> */}
        </section>

        {content}


      </div>
      <div 
      //id='modal-overlay' 
      className={`modal-overlay ${isOpen ? 'open' : ''}`} ></div>
    </>
  )
}

export default Modal