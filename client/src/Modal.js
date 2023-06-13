import React from "react";

const Modal = (props) => {

    const { handleFormSubmit, handleCloseModal, urlState, setUrlState } = props
  
    return (
      <>
        <div id='modal'>
          <section className='modal-close-btn' onClick={e=>handleCloseModal("modal")}>
            <i className="fa fa-xl fa-window-close"></i>
            </section>
          {/* <i className="fa fa-times"></i> */}
          <form onSubmit={e => handleFormSubmit(e)}>
            <input type='text' placeholder='enter url' value={urlState} onChange={e => setUrlState(e.target.value)} />
            <input type='submit' value='Add Url' />
          </form>
        </div>
        
      </>
    )
  }

  export default Modal