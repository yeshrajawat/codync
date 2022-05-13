import React, { useState } from 'react';
import './Home.scss';
import { v4 as uuidv4 } from 'uuid';
const Home = () => {

  const [roomId,setRoomId] = useState("");
  const [username,setUserName] = useState("");
  const createNewRoom = (e)=> {
    e.preventDefault();

    const id = uuidv4();
    setRoomId(id);
    console.log(id);
  }


  return (
    <div className='homePageWrapper' >
        <div className="formWrapper">

            <div className="top">
          
              <img src="/codync_with_text.png" alt="" />              
          
            </div>

            <div className="middle">
              <div className="form">
                <form action="">
                  <input type="text" placeholder='ROOM ID' 
                  onChange={(e)=> setRoomId(e.target.value)}
                  value={roomId}/>

                  <input type="text" placeholder='USERNAME'
                  onChange={(e)=> setUserName(e.target.value)}
                  value={username}/>
                  
                  <button type='submit' >Join</button>
                </form>
              </div>
            </div>
            <div className="bottom">
              <h4> If you don't have an invite then create 
                <span onClick={(e)=> createNewRoom(e)}> &nbsp;new room</span> </h4>
            </div>
        </div>
    </div>
  )
}

export default Home