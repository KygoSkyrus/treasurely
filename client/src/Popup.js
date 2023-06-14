import React from 'react';

const PopUp =(props)=>{

    const {deleteUrl,setUserPrompt,handleCloseModal}=props
  
   
    return(
      <>
       {/* <div id='popup'>
          <section className='popup-close-btn' onClick={e=>handleCloseModal('popup')} >
          <i className="fa fa-xl fa-window-close"></i>
          </section> */}
          <div >
            <section style={{font:"12px grey",padding:'6px 0',textDecoration:"underline"}} >{deleteUrl?.url}</section>
            <section>Do you want to delete this url?</section>
            <div className='promptBtn'>
              <button onClick={e=>setUserPrompt(true)}>yes</button>
              <button onClick={e=>setUserPrompt(false)}>no</button>
            </div>
          </div>
        {/* </div> */}
      </>
    )
  }

  export default PopUp