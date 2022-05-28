import React, { useState } from 'react';
import './Home.scss';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'
const Home = () => {

  const [roomId,setRoomId] = useState("");
  const [username,setUserName] = useState("");
  const navigate = useNavigate();

  const createNewRoom = (e)=> {
    e.preventDefault();
    toast.success('New Room Created');
    const id = uuidv4();
    setRoomId(id);
  }

  const joinRoom = (e) => {
    e.preventDefault();
    if(!roomId || !username){
      toast.error('Room ID and Username is required')
      return ;
    }
    else{
      navigate(`/editor/${roomId}`,
      {
        state:{
          username
        }
      })
    }
  }
// const handleInputEnter = (e)=>{
//   if(e.code === "Enter"){
//     joinRoom(e);
//   }
// }

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
                  value={roomId}
                  //  onKeyUp={handleInputEnter}
                  />

                  <input type="text" placeholder='USERNAME'
                  onChange={(e)=> setUserName(e.target.value)}
                  value={username}
                  // onKeyUp={handleInputEnter}
                  />
                  
                  <button type='submit' 
                  onClick={ (e) => {joinRoom(e)} } > Join</button>
                </form>
              </div>
            </div>
            <div className="bottom">
              <h4> If you don't have an invite then create &nbsp; 
                <span onClick={(e)=> createNewRoom(e)}>new room</span> </h4>
            </div>
        </div>
    </div>
  )
}

export default Home