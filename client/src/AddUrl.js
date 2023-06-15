import React, { useState } from 'react'

const AddUrl = (props) => {

    const {handleFormSubmit,urlState,setUrlState}=props

  return (
    <>
    <form onSubmit={e => handleFormSubmit(e)}>
            <input type='text' placeholder='enter url' value={urlState} onChange={e => setUrlState(e.target.value)} />
            <input type='submit' value='Add Url' />
          </form> 
    </>
  )
}

export default AddUrl