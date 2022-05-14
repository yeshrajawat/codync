import React, { useState } from 'react'
import Client from '../../components/clientcom/Client';
import Editor from '../../components/Editor/Editor';
import './EditorPage.scss'
const EditorPage = () => {

  const [clientList,setClientList] = useState([
    {socketId:1,username:'Yesh Rajawat'},
    {socketId:2,username:'Nish Rajawat'}
  ]);


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
            <button className='copyId'>Copy ROOM ID</button>
            <button className='leave'>Leave</button>
          </div>
      </div>
      <div className="rightWrapper">
              <div className="editor">
                <Editor/>
              </div>
      </div>


    </div>
  )
}

export default EditorPage