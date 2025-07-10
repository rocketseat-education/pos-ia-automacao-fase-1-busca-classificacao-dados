import { useState } from 'react'
import './App.css'

import MovieCard from './components/MovieCard';
import LoadingIndicator from './components/LoadingIndicator';
import ErrorIndicator from './components/ErrorIndicator';
import useChroma from './database/init';
import query from './database/query';

function App() {
  
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [queryText, setQueryText] = useState("");
  const [collection, isConnected] = useChroma();
  const [error, setError] = useState(null);

  async function queryDatabase() {
    setIsLoading(true);

    try{
      const movies = await query(collection, queryText);
      setMovieList(movies);
    } catch (err){
      setError(err.toString());
    }

    setIsLoading(false);
  }

  return (
    <>
      <h1>Movie Recommender</h1>
      <div className="form-container">
        <textarea onChange={e => setQueryText(e.target.value)}></textarea>
        <button onClick={queryDatabase} disabled={!isConnected || isLoading}>Submit</button>
      </div>
      {isLoading ? <LoadingIndicator /> : null}
      {error !== null ? <ErrorIndicator error={error}/> : null}
      <div className="movie-list">
        {movieList.map((m, idx) => <MovieCard key={idx} {...m} />)}
      </div>
    </>
  )
}

export default App
