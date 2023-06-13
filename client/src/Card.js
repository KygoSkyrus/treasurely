import React from 'react'

const Card = (props) => {
  const { url, deleteUrl } = props;



  function handleDragStart(event) {
    event.dataTransfer.setData("text/plain", event.currentTarget.dataset.card);
    event.currentTarget.style.backgroundColor = "#414141bd";//when drag is started
  }

  function handleDragEnd(event) {
    if (deleteUrl.url) {
      console.log('th8is', deleteUrl.url)
      event.currentTarget.style.backgroundColor = "#ff2600cc";//when drag ends the color will be
    } else {
      console.log('that')

      event.currentTarget.style.backgroundColor = '#f1f1f1'
    }
  }




  return (
    <>
      <div
        className='card'
        data-card={url?._id}
        data-url={url?.url}
        draggable
        onTouchStart={e => handleDragStart(e)}
        onTouchEnd={e => handleDragEnd(e)}
        onDragStart={e => handleDragStart(e)}
        onDragEnd={e => handleDragEnd(e)} >
        <i className='fa-solid fa-image image-icon'></i>
        {/* <img src='' alt=''/> */}
        <div className='url-details'>
          {/* <section className='title'>title</section>
          <section className='description'>description</section> */}
          <section className='url'>
            <a href={url?.url}
            target='_blank'
            rel='noreferrer' >
              <i className='fa-solid fa-link url-icon'>&nbsp;</i>
              {url?.url}
              </a>
              </section>
        </div>
      </div>
    </>
  )
}

export default Card