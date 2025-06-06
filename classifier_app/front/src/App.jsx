import { useState } from 'react'
import './App.css'

function App() {
const [textInput, setTextInput] = useState(null);
const [imgSrc, setImgSrc] = useState(null);

function classify(){
  console.log(textInput);
  setImgSrc(textInput);
}

  return (
    <>
      <h1>Cat or Dog?</h1>
      <input onChange={e => (setTextInput(e.target.value))} style={{width: "100%"}} />
      <button onClick={classify}>Classify!</button>
      <div style={{display: "flex", flexDirection: "column"}}>
        <img src={imgSrc} style={{height: "200px", marginTop: "20px"}} />
        <span>Caption</span>
      </div>
    </>
  )
}

export default App
