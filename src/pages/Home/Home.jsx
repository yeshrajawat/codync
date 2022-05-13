import React from 'react';
import './Home.scss';
const Home = () => {
  return (
    <div className='homePageWrapper' >
        <div className="formWrapper">

            <div className="top">
          
              <img src="/codync_with_text.png" alt="" />              
          
            </div>

            <div className="middle">
              <div className="form">
                <form action="">
                  <input type="text" placeholder='ROOM ID'/>
                  <input type="text" placeholder='USERNAME'/>
                  <button type='SUBMIT'>Join</button>
                </form>
              </div>
            </div>
            <div className="bottom">
              <h4> If you don't have an invite then create <span>new room</span> </h4>
            </div>
        </div>
    </div>
  )
}

export default Home