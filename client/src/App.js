/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import './App.css';
import Card from './Card'
import Modal from './Modal';
import Login from './Login';
import AddUrl from './AddUrl';
import TrashUrl from './TrashUrl';

function App() {

  const [urlState, setUrlState] = useState('');//for setting url on input change
  const [urls, setUrls] = useState();//has all urls
  const [deleteUrl, setDeleteUrl] = useState({ url: "", id: "" })//keeping url to be  deleted
  const [userPrompt, setUserPrompt] = useState(undefined)//true or false by user
  const [passCode, setPassCode] = useState('')
  const [activeModal, setActiveModal] = useState(null);
  const [disableClose, setDisableClose] = useState(false)


  //for MODAL-----------------------
  const openModal = (modalName) => {
    setActiveModal(modalName);
  };
  const closeModal = () => {
    setActiveModal(null);
  };
  //for MODAL-----------------------

  //to get url details via API
  //function getLinkDetails(){
  // let url='https://blog.kiprosh.com/using-url-previews-in-your-web-apps-using-javascript/'
  // fetch(`http://api.linkpreview.net/?key=${process.env.REACT_APP_LINK_PREVIEW_KEY}&fields=icon&q=${url}`)
  // .then(response=>response.json())
  // .then(data=>console.log('d',data))
  // }

  async function handleLogin() {

    fetch('/api/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
      },
      body: JSON.stringify({ passCode })
    })
      .then(res => res.json())
      .then(response => {

        if (response.token) {
          localStorage.setItem('token', response.token);
          setActiveModal(null);
          setDisableClose(false)
          getDataIfLoggedIn()
        } else {
          setPassCode('')
          alert('passcode incorrect')
          //add the toast here
        }
      })


  }

  function handleLogout() {
    localStorage.removeItem("token")
    //add a toast where to tell user that he have beeen logged out , login again messafe
    window.location.reload()
    //setActiveModal('login')
  }


  useEffect(() => {
    getDataIfLoggedIn()
  }, [])


  //to reciprocate with user's prompt
  useEffect(() => {
    const theSelected = document.querySelector(`[data-card="${deleteUrl.id}"]`);
    if (userPrompt) {
      trashUrl(deleteUrl, theSelected)//deleting from db
    } else if (theSelected) {
      theSelected.style.backgroundColor = '#f1f1f1'
      closeModal()
      setUserPrompt(undefined)
      setDeleteUrl({ ...deleteUrl, url: '', id: '' })
    }
  }, [userPrompt])


  function getDataIfLoggedIn() {
    // isUserLoggedIn()
    const token = localStorage.getItem('token');
    if (!token) {
      setActiveModal('login')
      setDisableClose(true)
      // Token is not present, redirect to login page or restrict access
      return;
    }
    // Send a GET request to access protected content
    fetch('/api/get_url', {
      headers: {
        Authorization: token,
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.response) {
          setUrls(data.response)
        } else {
          setActiveModal('login')
          setDisableClose(true)
        }
      })

  }


  const handleFormSubmit = () => {

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
          if (data) {
            setUrlState('')
            closeModal()
            getDataIfLoggedIn()
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
        if (data.isTrashed) {
          theSelected?.remove()
          closeModal()
          setUserPrompt(undefined)
        } else {
          alert('something went wrong, Try again!')
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

    let id = e.dataTransfer.getData("text");
    const draggableElement = document.querySelector(`[data-card="${id}"]`);
    setDeleteUrl({ ...deleteUrl, url: draggableElement.dataset.url, id: id })
    e.dataTransfer.clearData();
  }




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
          <Login
            handleLogin={handleLogin}
            setPassCode={setPassCode}
            passCode={passCode}
          />
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

        {urls ?
          <>
            <div className='add-url'
              onClick={() => openModal('addurl')}>
              <i className='fa-solid fa-plus'></i>
            </div>

            <div className='delete-url' id='deleteURL'
              onDragOver={e => handleDragOver(e)}
              onDrop={e => handleDrop(e)}
              title="Drag 'n' drop the card over me to delete the url" >
              <i className='fa-solid fa-trash'></i>
            </div>
            <label className='logoutBar'>
              <input type='checkbox' />
              <section className='bg'></section>
              <section className='logoutBtn' onClick={() => handleLogout()} >LOGOUT</section>
              <i className="fa-solid fa-chevron-up fa-bounce arrowUp"></i>
            </label>

          </>
          : ""
        }

        <div className='splashScreen'>treasurely</div>
      </div>

      {activeModal && (
        <Modal
          isOpen={true} onClose={closeModal} disableClose={disableClose}
          content={renderModalContent()}//or you can directly pass the component here
        />
      )}


    </>
  );
}


export default App;
