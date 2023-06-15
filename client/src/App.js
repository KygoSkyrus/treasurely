/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import './App.css';
import Card from './Card'
import Modal from './Modal';
import UserPromptPopUp from './TrashUrl';
import Login from './Login';
import AddUrl from './AddUrl';
import TrashUrl from './TrashUrl';

function App() {

  const [urlState, setUrlState] = useState('');//for setting url on input change
  const [urls, setUrls] = useState();//has all urls
  const [deleteUrl, setDeleteUrl] = useState({ url: "", id: "" })//keeping url to be  deleted
  const [userPrompt, setUserPrompt] = useState(undefined)//true or false by user

  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalName) => {
    console.log('mn', modalName)
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  //to get url details via API
  //function getLinkDetails(){
  // let url='https://blog.kiprosh.com/using-url-previews-in-your-web-apps-using-javascript/'
  // fetch(`http://api.linkpreview.net/?key=${process.env.REACT_APP_LINK_PREVIEW_KEY}&fields=icon&q=${url}`)
  // .then(response=>response.json())
  // .then(data=>console.log('d',data))
  // }


  useEffect(() => {
    fetch('/api/get_url', {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log('get data', data.response)
        setUrls(data.response)
      })
  }, [])




  const handleCloseModal = (val) => {
    document.getElementById(val).style.display = 'none'
    document.getElementById('modal-overlay').style.display = 'none'
    if (val === 'modal') {
      setUrlState('')
    } else if (document.querySelector(`[data-card="${deleteUrl.id}"]`)) {
      document.querySelector(`[data-card="${deleteUrl.id}"]`).style.backgroundColor = '#f1f1f1'
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log('dd', urlState, process.env.REACT_APP_AUTH_TOKEN)

    if (urlState !== "") {
      fetch('/api/add_url', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
        },
        body: JSON.stringify({ url: urlState })
      })
        .then(res => res.json())
        .then(data => {
          console.log('ii', data)
          if (data) {
            setUrlState('')
            closeModal()
            //show toast
          } else {
            //throw error show toast
          }
        })
        .catch(error => console.log(error))
    } else {
      alert('url field cannot be empty')
    }
  }

  async function trashUrl(param, theSelected) {
    console.log('prm', param)

    fetch('/api/trash_url', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
      },
      body: JSON.stringify({ param })
    })
      .then(res => res.json())
      .then(data => {
        console.log('ii---', data)
        if (data.isTrashed) {
          theSelected?.remove()
          closeModal()
          setUserPrompt(undefined)
        } else {
          console.log(data) 
          //throw error show toast
        }
      })
      .catch(error => console.log(error))
  }

  //allowing drop event
  const handleDragOver = (e,) => {
    e.preventDefault();
  }

  const handleDrop = (e) => {
    e.preventDefault();
    setActiveModal('trashurl');
    console.log('dddddd==', e.dataTransfer)

    let id = e.dataTransfer.getData("text");
    const draggableElement = document.querySelector(`[data-card="${id}"]`);
    // console.log('DRAGEBLE EKEM', draggableElement)
    // console.log('userprompt---',userPrompt)
    setDeleteUrl({ ...deleteUrl, url: draggableElement.dataset.url, id: id })
    e.dataTransfer.clearData();
  }


  useEffect(() => {
    console.log('usserprompt', userPrompt, deleteUrl.id)
    const theSelected = document.querySelector(`[data-card="${deleteUrl.id}"]`);
    console.log('tsss',theSelected)
    if (userPrompt) {
      trashUrl(deleteUrl, theSelected)//deleting from db
    } else if (theSelected) {
      console.log('rrrr')
      theSelected.style.backgroundColor = '#f1f1f1'
      closeModal()
      setUserPrompt(undefined)
      setDeleteUrl({ ...deleteUrl, url: '', id: '' })
    }
  }, [userPrompt])


  const renderModalContent = () => {
    switch (activeModal) {
      case 'addurl':
        return (
          <AddUrl
            handleFormSubmit={handleFormSubmit}
            urlState={urlState}
            setUrlState={setUrlState}
          />
        );
      case 'trashurl':
        return (
          <TrashUrl 
          deleteUrl={deleteUrl} 
          setDeleteUrl={setDeleteUrl}
          userPrompt={userPrompt}//needed in modal comp
          setUserPrompt={setUserPrompt}//for trashUrl comp
          />
        );
      case 'login':
        return (
          <Login />
        );
      default:
        return null;
    }
  };


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

        <div className='add-url'
          // onClick={handleShowModal('addurl')}
          onClick={() => openModal('addurl')}>
          <i className='fa-solid fa-plus'></i>
        </div>

        <div className='delete-url' id='deleteURL'
          onDragOver={e => handleDragOver(e)}
          onDrop={e => handleDrop(e)}
          title="Drag 'n' drop the card over me to delete the url" >
          <i className='fa-solid fa-trash'></i>
        </div>

      </div>

      {activeModal && (
        <Modal
          isOpen={true} onClose={closeModal}
          content={renderModalContent()}//or you can directly pass the component here
        />
      )}

    </>
  );
}


export default App;
