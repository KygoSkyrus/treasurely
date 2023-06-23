import React from 'react';

const TrashUrl = (props) => {

  const { deleteUrl, setUserPrompt } = props

  return (
    <>
      <div style={{ minWidth: "300px"}} >
        <section style={{ fontWeight: "300", padding: '6px 0' }} >{deleteUrl?.url}</section>
        <section>Do you want to delete this url?</section>
        <div className='promptBtn'>
          <button onClick={e => setUserPrompt(true)} className='btn'>yes</button>
          <button onClick={e => setUserPrompt(false)} className='btn'>no</button>
        </div>
      </div>
    </>
  )
}

export default TrashUrl