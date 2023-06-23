import React from 'react'

const AddUrl = (props) => {

  const { handleFormSubmit, urlState, setUrlState } = props

  return (
    <>
      <form >
        <input type='text' placeholder='enter url' style={{width:"300px"}} value={urlState} onChange={e => setUrlState(e.target.value)} onKeyUp={(e)=>{
          if(e.key==="Enter") handleFormSubmit()
        }}  />
        <button className=' btn' onClick={() => handleFormSubmit()} >Add URL</button>
      </form>
    </>
  )
}

export default AddUrl