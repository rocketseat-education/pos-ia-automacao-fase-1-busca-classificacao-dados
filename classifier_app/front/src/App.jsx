import { useEffect, useState } from 'react'
import './App.css'

function CaptionedImage({ imgSrc, method }){
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const getCaption = async () => {
      const response = await fetch("http://127.0.0.1:3000/classify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({method: method, imgPath: imgSrc})
      }).then(resp => resp.json());

      setCategory(response["category"]);
    };

    getCaption();
  }, []);

  return <>
    <div style={{display: "flex", flexDirection: "column"}}>
        { category === null ? <h2>It's a ...</h2> : <h2>It's a {category}!!!</h2>}
        <img src={imgSrc} style={{width: "100%", marginTop: "20px", borderRadius: 10}} />
        
      </div>
  </>
}

function App() {
const [textInput, setTextInput] = useState(null);
const [imgSrc, setImgSrc] = useState(null);
const [method, setMethod] = useState("llm")

function classify(){
  setImgSrc(null);
  setImgSrc(textInput);
}

  return (
    <>
      <h1>Cat or Dog?</h1>
      <input onChange={e => (setTextInput(e.target.value))} style={{width: "100%"}} />
      Method: <select onChange={e => setMethod(e.target.value)}>
        <option value="llm">LLM</option>
        <option value="knn">KNN</option>
      </select>
      <button onClick={classify} style={{margin: 10}}>Classify!</button>
      {
        imgSrc !== null ? <CaptionedImage imgSrc={imgSrc} method={method}></CaptionedImage> : null
      }
    </>
  )
}

export default App
