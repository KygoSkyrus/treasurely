import { useEffect, useState } from 'react';
import './App.css';
import Card from './Card'
import Modal from './Modal';
import UserPromptPopUp from './Popup';

function App() {

  const [urlState, setUrlState] = useState('');//for setting url on input change
  const [urls, setUrls] = useState();//has all urls
  const [deleteUrl,setDeleteUrl]=useState({url:"",id:""})//keeping url to be  deleted
  const [userPrompt,setUserPrompt]=useState(undefined)//true or false by user


  //to get url details via API
  //function getLinkDetails(){
  // let url='https://blog.kiprosh.com/using-url-previews-in-your-web-apps-using-javascript/'
  // fetch(`http://api.linkpreview.net/?key=${process.env.REACT_APP_LINK_PREVIEW_KEY}&fields=icon&q=${url}`)
  // .then(response=>response.json())
  // .then(data=>console.log('d',data))
  // }


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
  
  const handleCloseModal = (val) => {
    document.getElementById(val).style.display = 'none'
    document.getElementById('modal-overlay').style.display = 'none'
if(val==='modal'){
  setUrlState('')
} else if(document.querySelector(`[data-card="${deleteUrl.id}"]`)){
  document.querySelector(`[data-card="${deleteUrl.id}"]`).style.backgroundColor='#f1f1f1'
}
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log('dd', urlState)

    if(urlState!==""){
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
    }else{
      alert('url field cannot be empty')
    }
  }

  //allowing drop event
  const handleDragOver = (e) => {
    //e.target.style.background = "red";
    e.preventDefault();
  }

  const handleDrop = (e) => {
    e.preventDefault();

    console.log('dddddd==', e.dataTransfer)

    let id = e.dataTransfer.getData("text");

    const draggableElement = document.querySelector(`[data-card="${id}"]`);
    console.log('DRAGEBLE EKEM',draggableElement)

    // const clone = draggableElement.cloneNode(true);
    // const remove = document.createElement("div");
    // remove.classList.add("comp-remove");
    // remove.innerHTML = "X";
    // clone.appendChild(remove);
    // document.getElementById('deleteURL').appendChild(clone);

    document.getElementById('popup').style.display="flex"
    document.getElementById('modal-overlay').style.display = 'block'
    
    setDeleteUrl({ ...deleteUrl, url: draggableElement?.href, id: id })

    e.dataTransfer.clearData();


  }


  useEffect(()=>{
    console.log('usserprompt',userPrompt,deleteUrl.id)
    const theSelected=document.querySelector(`[data-card="${deleteUrl.id}"]`);
    if(userPrompt){
      theSelected?.remove()
      handleCloseModal('popup')
      setUserPrompt(undefined)
    }else if(theSelected){
      console.log('rrrr')
      theSelected.style.backgroundColor='#f1f1f1'
      handleCloseModal('popup')
      setUserPrompt(undefined)
      setDeleteUrl({ ...deleteUrl, url: '', id: '' })
    }
  },[userPrompt])

 

  return (
    <>
      <div className='app'>
        <div className='all_cards'>
          {urls?.map(x => {
            return (
              <Card key={x._id} url={x} deleteUrl={deleteUrl} />
            )
          })}
        </div>

        <div className='add-url' onClick={handleShowModal}>
          <i className='fa-solid fa-plus'></i>
        </div>

        <div className='delete-url' id='deleteURL' onDragOver={e => handleDragOver(e)} onDrop={e => handleDrop(e)} >
          <i className='fa-solid fa-trash'></i>
        </div>

      </div>

      <Modal handleFormSubmit={handleFormSubmit} handleCloseModal={handleCloseModal} urlState={urlState} setUrlState={setUrlState} />
      <UserPromptPopUp deleteUrl={deleteUrl} setUserPrompt={setUserPrompt} handleCloseModal={handleCloseModal} />
      <div id='modal-overlay' ></div>
      {/* overlay not working */}
    </>
  );
}


export default App;
