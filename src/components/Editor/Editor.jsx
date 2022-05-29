import React, { useEffect, useRef } from 'react'
import './Editor.scss';
import codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/dracula.css'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets';
import ACTIONS from '../../actions';
const Editor = ({socketRef,roomId, onCodeChange}) => {


    const editorRef = useRef(null);
    useEffect(()=>{

            async function init(){

                editorRef.current = codemirror.fromTextArea(document.getElementById('realtimeEditor'),{
                    mode:{name:'javascript',json:true},
                    theme:'dracula',
                    autoCloseTags:true,
                    autoCloseBrackets:true,
                    lineNumbers:true
                })

                editorRef.current.on('change', (instance,changes) => {
                 
                  var code = instance.getValue();
                  onCodeChange(code);
                  if(changes.origin !== 'setValue'){
                    
                 
                    socketRef.current.emit(ACTIONS.CODE_CHANGE,{
                      code:code,
                      roomId
                    })
                  }
                });


                


            }

            init();
    },[])


useEffect(()=> {
  
  if(socketRef.current){
    socketRef.current.on(ACTIONS.CODE_CHANGE,({code}) => {
     if(code !== null){
        editorRef.current.setValue(code);
      }
    })
  }

  return ()=> {
    socketRef.current.off(ACTIONS.CODE_CHANGE);
  }
},[socketRef.current])



  return (
    <div className='editor'>
        <textarea  id="realtimeEditor" ></textarea>
    </div>
  )
}

export default Editor