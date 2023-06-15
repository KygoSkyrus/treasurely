import React from "react";

const Modal = (props) => {

  const { isOpen, onClose, content } = props
  const handleClose = () => {
    onClose();
    console.log('isuserpromptthere',content.props.userPrompt)
    //eroor here hwen add url is clicked bca userprompt is not there 
    if(!content.props.userPrompt){
      document.querySelector(`[data-card="${content.props.deleteUrl.id}"]`).style.backgroundColor = '#f1f1f1'
      //setting the bg color of the card when user prompts no to delete url
      content.props.setDeleteUrl({ ...content.props.deleteUrl, url: '', id: '' })//setting the to be delete url to null
    }
  };

  return (
    <>
      <div
        className={`modal ${isOpen ? 'open' : ''}`}>
        <section className='modal-close-btn'
          onClick={handleClose}>
          <i className="fa fa-xl fa-window-close"></i>
        </section>
        {content}
      </div>
      <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={handleClose} ></div>
    </>
  )
}

export default Modal