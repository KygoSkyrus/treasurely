import React from 'react'
import dummy from './dummy.jpg'
const Card = (props) => {
  const {url}=props;

  return (
    <a className='card' href={url.url} target='_blank' rel='noreferrer' >
      <img src={dummy} alt='' />
      <div className='url-details'>
        <section className='title'>title</section>
        <section className='description'>description</section>
        <section className='url'>{url.url}</section>
      </div>
    </a>
  )
}

export default Card