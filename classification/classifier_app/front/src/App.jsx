import { useState } from 'react';
import './App.css';
import CaptionedImage from './components/CaptionedImage';

function App() {
const [textInput, setTextInput] = useState(null);
const [selectValue, setSelectValue] = useState("llm");
const [imgSrc, setImgSrc] = useState(null);
const [method, setMethod] = useState("llm")

function classify(){
  setImgSrc(textInput);
  setMethod(selectValue);
}

  return (
    <>
      <h1>Cat or Dog?</h1>
      <input 
      className="img-path-input" 
      onChange={e => (setTextInput(e.target.value))} />
      Method: <select onChange={e => setSelectValue(e.target.value)}>
        <option value="llm">LLM</option>
        <option value="knn">KNN</option>
      </select>
      <button className="classify-button" onClick={classify}>Classify!</button>
      {
        imgSrc !== null ? <CaptionedImage imgSrc={imgSrc} method={method}></CaptionedImage> : null
      }
    </>
  )
}

export default App
