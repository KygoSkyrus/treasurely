import React from 'react';

const TrashUrl =(props)=>{

    const {deleteUrl,setUserPrompt}=props
  
   
    return(
      <>
          <div >
            <section style={{font:"12px grey",padding:'6px 0',textDecoration:"underline"}} >{deleteUrl?.url}</section>
            <section>Do you want to delete this url?</section>
            <div className='promptBtn'>
              <button onClick={e=>setUserPrompt(true)}>yes</button>
              <button onClick={e=>setUserPrompt(false)}>no</button>
            </div>
          </div>
      </>
    )
  }

  export default TrashUrl