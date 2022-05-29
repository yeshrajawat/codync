import React, { useEffect, useRef, useState } from 'react'
import Client from '../../components/clientcom/Client';
import Editor from '../../components/Editor/Editor';
import { initSocket } from '../../socket';
import './EditorPage.scss'
import ACTIONS from '../../actions'
// const ACTIONS = require('../../actions');

import { Navigate, useLocation,useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';
const EditorPage = () => {

  const socketRef = useRef(null);
  const location = useLocation();
  const codeRef = useRef(null);
  const reactNavigator = useNavigate();
  const roomId = useParams();

  const [clientList,setClientList] = useState([]);

  useEffect(()=>{

    const init = async() =>{

      socketRef.current = await initSocket();
      socketRef.current.on('connect_error',(err)=> handleErrors(err));
      socketRef.current.on('connect_failed',(err)=> handleErrors(err));
      
      function handleErrors(e){
        console.log('socket error',e);
        toast.error('Socket Connection failed, try again later.');
        reactNavigator('/');
      }
      

        socketRef.current.emit(ACTIONS.JOIN,{
          roomId,
          username:location.state?.username,
        });

        //Listening for joined event

        socketRef.current.on(ACTIONS.JOINED,
          ({clients,username,socketId}) => {
              if(username !== location.state.username){
                toast.success(`${username} has joined the room.`);
              }
              else{
                toast.success('You have joined the room');
              }
              
              setClientList(clients);
              socketRef.current.emit(ACTIONS.SYNC_CODE,{
                code:codeRef.current,
              socketId})
              console.log(clientList);
            })

        //Listening for disconnected User
        socketRef.current.on(ACTIONS.DISCONNECTED,
          ({socketId,username}) => {
            toast.success(`${username} has left the room.`);

            setClientList((prev) => {
                return prev.filter((client) => client.socketId !== socketId)
            })

              
            
          })
      
    }

    init();

    return () => {
      socketRef.current.disconnected();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);

    }
  },[]);

if(!location.state){
  return <Navigate to='/'/>
}
  
  async function copyRoomId() {
  try {
    
    await navigator.clipboard.writeText(roomId.roomId);
    toast.success('Room id copied to clipboard.')

  } catch (error) {
    toast.error('Could not copy room id.')
  }
}


function leaveRoom(){
  reactNavigator('/');
  window.location.reload(true);
}



  return (
    <div className='editorPage'>

      <div className="leftWrapper">
          <div className="logo-container">
             <img src="/codync_with_text.png" alt="codync logo" />
          
          </div>
          <h4>Connected</h4>
          <div className="clientList">
              {clientList.map(client => {
                return <Client key={client.socketId} username={client.username}/>
              })}
          </div>

          <div className="bottom">
            <button className='copyId' onClick={copyRoomId}>Copy ROOM ID</button>
            <button className='leave' onClick={leaveRoom} >Leave</button>
          </div>
      </div>
      <div className="rightWrapper">
              <div className="editor">
               <Editor socketRef = {socketRef} roomId ={roomId} 
               onCodeChange={(code)=>
               { codeRef.current = code}
               } />
              </div>
      </div>


    </div>
  )
}

export default EditorPage