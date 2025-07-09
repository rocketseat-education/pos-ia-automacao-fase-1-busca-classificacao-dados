import { useState } from 'react'
import './App.css'
import { ChromaClient } from "chromadb";
import { useEffect } from 'react';
import { env } from "chromadb-default-embed";

env.useBrowserCache = false;
env.allowLocalModels = false;

function MovieTag({ tag }){
  return <div style={{border: "1px solid grey", padding: 5, fontSize: 12, borderRadius: 7}}>{tag}</div>
}

function MovieCard({ title, tags, synopsis }){
  return <div className="movie-card" style={{display: "flex", flexDirection: "column", gap: 5, border: "1px solid grey", borderRadius: 10, padding: "10px", height: "250px"}}>
    <h2 style={{margin: 0}}>{title}</h2>
    <div style={{display: "flex", justifyContent: "center", gap: 5}}>{tags.map((t, idx) => <Movietag key={idx} tag={t}/>)}</div>
    <div style={{overflow: "auto", padding: 5}}>{synopsis}</div>
  </div>
}

function App() {
  const [chromaCollection, setChromaCollection] = useState(null);
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [queryText, setQueryText] = useState("");


  async function queryDatabase(){
    setIsLoading(true);
    const res = await chromaCollection.query({queryTexts: queryText});
    const movies = [];

    for(let i = 0; i < res.ids[0].length; i++){
      movies.push({
          id: res.ids[0][i],
          distance: res.distances[0][i],
          title: res.metadatas[0][i].title,
          tags: res.metadatas[0][i].tags.split(", "),
          synopsis: res.metadatas[0][i].synopsis,
      });
    }

    setMovieList(movies);
    setIsLoading(false);
  }

  useEffect(() => {

    const initializeChroma = async () => {
      const chromaClient = new ChromaClient();
      const collection = await chromaClient.getOrCreateCollection({name: "movies"});

      setChromaCollection(collection);
      setIsConnected(true);
    }
    
    initializeChroma();
  }, []);

  return (
    <>
      <h1>Movie Recommender</h1>
      <div style={{display: "flex", flexDirection: "column"}}>
        <textarea onChange={e => setQueryText(e.target.value)}></textarea>
        <button onClick={queryDatabase} disabled={!isConnected || isLoading}>Submit</button>
      </div>
      {isLoading ? "Loading..." : null}
      <div className="movie-list" style={{marginTop: "15px", display: "flex", flexDirection: "column", gap: 5}}>
        {movieList.map((m, idx) => <MovieCard key={idx} {...m} />)}
      </div>

    </>
  )
}

export default App
