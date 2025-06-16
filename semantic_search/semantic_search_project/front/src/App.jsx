import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Movie Recommender</h1>
      <div style={{display: "flex", flexDirection: "column"}}>
        <textarea></textarea>
        <button>Submit</button>
      </div>
      <div class="movie-list" style={{margin: "15px"}}>
        <div class="movie-card" style={{border: "1px solid lightgrey", margin: "10px", width: "100%", height: "100px"}}></div>
        <div class="movie-card" style={{border: "1px solid lightgrey", margin: "10px", width: "100%", height: "100px"}}></div>
        <div class="movie-card" style={{border: "1px solid lightgrey", margin: "10px", width: "100%", height: "100px"}}></div>
      </div>

    </>
  )
}

export default App
