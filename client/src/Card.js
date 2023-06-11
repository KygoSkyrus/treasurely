import React from 'react'
import dummy from './dummy.jpg'
const Card = (props) => {
  const { url } = props;

  return (


    <>
      <div class="container">
        <div class="col col-3">
          <div class="comp-holder">
            <div data-table="comp-01" class="comp js-draggable" draggable='true' ondragstart='onDragStart(event);' ondragend="onDragEnd(event);">
              [Header component]
            </div>
            <div data-table="comp-02" class="comp js-draggable" draggable='true' ondragstart='onDragStart(event);' ondragend="onDragEnd(event);">
              [Image component]
            </div>
            <div data-table="comp-03" class="comp js-draggable" draggable='true' ondragstart='onDragStart(event);' ondragend="onDragEnd(event);">
              [Text component]
            </div>

            <div data-table="comp-04" class="comp js-draggable" draggable='true' ondragstart='onDragStart(event);' ondragend="onDragEnd(event);">
              [Footer component]
            </div>
          </div>
        </div>
        <div class="col col-9">
          <h3>Dropzone</h3>
          <div id="dropzone" class="editor-view" ondragover='onDragOver(event);' ondrop='onDrop(event);'>
          </div>
        </div>

        <div class="hidden">
          <header class="actual-comp" id="comp-01">
            <a href="https://daily-dev-tips.com">
              <img src="https://daily-dev-tips.com/images/logo.png" height="50" />
            </a>
            <a href="#">Menu</a>
          </header>
          <div class="actual-comp" id="comp-02">
            <img class="image" src="https://images.unsplash.com/photo-1587588354456-ae376af71a25?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" />
          </div>
          <div class="actual-comp" id="comp-03">
            <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis cursus massa, eget fringilla dolor. Praesent ligula libero, luctus sit amet urna a, semper scelerisque lorem. Curabitur efficitur, tortor in tempor elementum, orci quam mollis quam, nec fermentum lacus mauris eu nisl. Praesent elementum eros et justo faucibus, sed vestibulum mauris tincidunt. Aenean suscipit ultrices tellus, at aliquam diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus non maximus mauris, nec finibus risus. Donec sit amet massa malesuada, mollis mi nec, condimentum justo. Pellentesque velit ligula, feugiat eget nisi quis, mattis eleifend sem. Proin pretium risus ligula, a aliquet elit commodo sit amet.</p>
          </div>
          <footer class="actual-comp" id="comp-04">&copy; Daily Dev Tips 2020</footer>
        </div>
</div>

        <a className='card' href={url.url} target='_blank' rel='noreferrer' >
          <img src={dummy} alt='' />
          <div className='url-details'>
            <section className='title'>title</section>
            <section className='description'>description</section>
            <section className='url'>{url.url}</section>
          </div>
        </a>
      </>
      )
}

      export default Card