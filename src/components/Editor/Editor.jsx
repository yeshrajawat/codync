import React, { useEffect, useRef } from 'react'
import './Editor.scss';
import codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/dracula.css'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets';
import ACTIONS from '../../actions';
const Editor = ({socketRef,roomId}) => {


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
                  console.log(changes);
                  if(changes.origin !== 'setValue'){
                    var code = instance.getValue();
                    console.log('code->',code);
                    console.log('roomId->',roomId.roomId);
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
  console.log('useffect')
  if(socketRef.current){
    socketRef.current.on(ACTIONS.CODE_CHANGE,({code}) => {
      console.log('received->',code);
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