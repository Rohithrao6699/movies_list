import { useEffect, useState } from 'react'
import axios from "axios"
import './Lists.css' 

function List() {
 const [state, setState] = useState([])
 const [datas, setdatas] = useState([])
 const [selectedMovie, setSelectedMovie] = useState(null);

 
 async function getData() {
    try {
        const response =  await axios.get("https://api.themoviedb.org/3/trending/all/week?api_key=1cda66409fb42c9437bdefe0d4473be2");
        setState(response.data.results);
    } catch (error){
    console.log(error)
    }
}

useEffect(() => {
    getData();
   }, []);

useEffect(() => {
    console.log(state)
   }, [state]);

function Randommovies() {
    const movies = state
    return(
        movies[Math.floor(Math.random() * movies.length)]
    )    
  };

const handleclick = () => { 
    setdatas([...datas, Randommovies()])
    // console.log(datas);
    // console.log(Randommovies())
};

const handleImageClick = (movie) => {
    setSelectedMovie(movie);
    console.log(movie)
  };


return(
    <div className='container'>
    <h1>Click to Add Movies and TV shows</h1>
    <button className='button' onClick={handleclick}>Add Movie</button>
    <h4>Click on movie for overview!</h4>
    <div className="movie-grid">
    {datas.map((movie, index) => 
    <div key={index} className="movie-item">
        <img src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`} alt={`${movie.name || movie.title} backdrop`} 
        className='image'
        onClick={() => handleImageClick(movie)}
            />
        <h2 className='title'>{movie.name || movie.title}</h2>
            {movie === selectedMovie && (
              <p className="overview">{movie.overview}</p>
            )}
    </div>
    )}
    </div>
    </div>
)
}

export default List;