import { useEffect, useState } from 'react';
import './App.css';
import Card from './Card'


function App() {

  const [urlState, setUrlState] = useState('');
  const [urls, setUrls] = useState();
  //function xyz(){
  // let url='https://blog.kiprosh.com/using-url-previews-in-your-web-apps-using-javascript/'
  // fetch(`http://api.linkpreview.net/?key=${process.env.REACT_APP_LINK_PREVIEW_KEY}&fields=icon&q=${url}`)
  // .then(response=>response.json())
  // .then(data=>console.log('d',data))
  // }

  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

  useEffect(() => {
    fetch('/api/get_url')
      .then(res => res.json())
      .then(data => {
        console.log('get data', data.response)
        setUrls(data.response)
      })
  }, [])


  const handleShowModal = () => {
    document.getElementById('modal').style.display = 'flex'
    document.getElementById('modal-overlay').style.display = 'block'
  }
  const handleCloseModal = () => {
    document.getElementById('modal').style.display = 'none'
    document.getElementById('modal-overlay').style.display = 'none'

  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log('dd', urlState)

    fetch('/api/add_url', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: urlState })
    })
      .then(res => res.json())
      .then(data => {
        console.log('ii', data)
        if (data) {
          setUrlState('')
          handleCloseModal()
          //show toast
        } else {
          //throw error show toast
        }
      })
      .catch(error => console.log(error))

  }

  const handleDragOver=(e)=>{
    e.preventDefault();
    console.log(e.target)
  }

  const handleDrop=(e)=>{
    
    console.log('dddddd==',e.dataTransfer)
      let id = e.dataTransfer.getData("text");
    
      const draggableElement = document.getElementById(id);
      const clone = draggableElement.cloneNode(true);
    
      const remove = document.createElement("div");
      remove.classList.add("comp-remove");
      remove.innerHTML = "X";
      clone.appendChild(remove);
    
      document.getElementById('deleteURL').appendChild(clone);
    
      e.dataTransfer.clearData();
    
    
  }

  return (
    <>
      <div className='app'>
        <div className='all_cards'>
          {urls?.map(x => {
            return (
              <Card key={x._id} url={x} />
            )
          })}
        </div>

        <div className='add-url' onClick={handleShowModal}>
          <i className='fa-solid fa-plus'></i>
        </div>

        <div className='delete-url' id='deleteURL' onDragOver={e=>handleDragOver(e)} onDrop={e=>handleDrop(e)} >
          <i className='fa-solid fa-trash'></i>
        </div>

      </div>

      <Modal handleFormSubmit={handleFormSubmit} urlState={urlState} setUrlState={setUrlState} />
    </>
  );
}


const Modal = (props) => {

  const { handleFormSubmit, handleCloseModal, urlState, setUrlState } = props



  return (
    <>
      <div id='modal'>
        <section className='modal-close-btn' onClick={handleCloseModal}>x</section>
        <form onSubmit={e => handleFormSubmit(e)}>
          <input type='text' placeholder='enter url' value={urlState} onChange={e => setUrlState(e.target.value)} />
          <input type='submit' value='Add Url' />
        </form>
      </div>
      <div id='modal-overlay'></div>
    </>
  )
}

export default App;
