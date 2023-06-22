import React from "react";

const Modal = (props) => {

  const { isOpen, onClose, content, disableClose } = props
  const handleClose = () => {
    onClose();
    //check if the props has userpromt state,,bcz only trash url has that and add url doesnt
    if (!content.props.userPrompt && content.props.hasOwnProperty('userPrompt')) {
      document.querySelector(`[data-card="${content.props.deleteUrl.id}"]`).style.backgroundColor = '#f1f1f1'
      //setting the bg color of the card when user prompts no to delete url
      content.props.setDeleteUrl({ ...content.props.deleteUrl, url: '', id: '' })//setting the to be delete url to null
    }
  };

  return (
    <>
      <div
        className={`modal ${isOpen ? 'open' : ''}`}>
        <section className='modal-close-btn' style={{cursor: disableClose && "no-drop"}}
          onClick={() => {
            if (!disableClose)
              handleClose()
          }
          }>
          <i className="fa fa-xl fa-window-close"></i>
        </section>
        {content}
      </div>
      <div className={`modal-overlay ${isOpen ? 'open' : ''}`} 
      onClick={() => {
        if (!disableClose)
          handleClose()
      }
      } ></div>
    </>
  )
}

export default Modal