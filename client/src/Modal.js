import React from "react";

const Modal = (props) => {

    const { handleFormSubmit, handleCloseModal, urlState, setUrlState, isOpen, onClose,children } = props
    const handleClose = () => {
      onClose();
    };
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

            {children}

          {/* <form onSubmit={e => handleFormSubmit(e)}>
            <input type='text' placeholder='enter url' value={urlState} onChange={e => setUrlState(e.target.value)} />
            <input type='submit' value='Add Url' />
          </form> */}
        </div>
        
      </>
    )
  }

  export default Modal