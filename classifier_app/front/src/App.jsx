import { useState } from 'react'
import './App.css'

function App() {
const [textInput, setTextInput] = useState(null);
const [imgSrc, setImgSrc] = useState(null);

async function classify(){
  console.log(textInput);
  setImgSrc(textInput);

  const response = await fetch("http://127.0.0.1:3000/classify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({method: "knn", imgPath: textInput})
  });

  console.log(await response.json());
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
