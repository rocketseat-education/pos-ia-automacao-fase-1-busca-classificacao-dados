import MovieTag from "./MovieTag";

export default function MovieCard({ id, title, tags, synopsis, distance }) {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const imgSrc = `http://img.omdbapi.com/?apikey=${apiKey}&i={id}`;
  const imdbURL = `https:www.imdb.com/title/${id}`;
  return (
    <div className="movie-card">
      <img src={imgSrc}></img>
      <div className="movie-info">
        <div className="title-container">
          <h2 className="movie-title"><a href={imdbURL} target='_blank'>{title}</a></h2>
          <div className="title-background" style={{width: `${distance*100}%`}}></div>
        </div>
        <b>Tags:</b>
        <div className="tag-container">
          <div className="tag-holder">
            {tags.map((t, idx) => <MovieTag key={idx} tag={t} />)}
          </div>
        </div>
        <b>Synopsis:</b>
        <div className="synopsis">{synopsis}</div>
      </div>

    </div>
  )
}