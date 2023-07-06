import React from 'react'

const AddUrl = (props) => {

  const { handleFormSubmit, urlState, setUrlState } = props

  return (
    <>
      <div className='form'>
        <input type='text' placeholder='enter url' style={{width:"300px"}} value={urlState} onChange={e => setUrlState(e.target.value)} onKeyUp={(e)=>{
          if(e.key==="Enter") handleFormSubmit()
        }}  />
        <button className=' btn' onClick={() => handleFormSubmit()} >Add URL</button>
      </div>
    </>
  )
}

export default AddUrl