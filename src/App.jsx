import React from 'react'
import "./App.css"
import va from "./assets/ai.png";
import { CiMicrophoneOn } from "react-icons/ci"; 
import { useContext } from 'react'
import { dataContext } from './context/userContext.jsx'
import { useState } from 'react'
import speakimg from "./assets/speak.gif"
import aigif from "./assets/aiVoice.gif"


const App = () => {
  let {recognition,speaking,setSpeaking,prompt,setPrompt,gemresponse,setgemResponse}=useContext(dataContext)
  return (
    <div className='main'>
      <img src={va} id="lumi"/>
      <span>Hello, I'm Lumi! Your Advanced Virtual Assistant</span> 
      {!speaking? (
      <button onClick={()=>{
        setPrompt("listening...")
        setSpeaking(true)
        setgemResponse(false)
        recognition.start();
      }}>Click here to speak <CiMicrophoneOn />
      </button>)
      :(
        <div className='speak'>
          {!gemresponse?(
             <img src={speakimg} id="speakimg"/>
          ):(
             <img src={aigif} id="aigif"/>
        )}

          <p>{prompt}</p>
        </div>
      )}
    </div>
  )
}


export default App
