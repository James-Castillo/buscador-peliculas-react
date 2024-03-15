import { useState } from "react";

const BuscadorPeliculas = () => {
  const urlBase = "https://api.themoviedb.org/3/search/movie";
  const API_KEY = "1fb60e2fd3a5a7410787474c90551147";

  const [busqueda, setBusqueda] = useState("");
  const [peliculas, setPeliculas] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setBusqueda(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPeliculas();
  };

  const fetchPeliculas = async () => {
    try {
      const response = await fetch(
        `${urlBase}?query=${busqueda}&api_key=${API_KEY}`
      );
      const data = await response.json();
      if (data.results.length === 0) {
        setError("No se encontraron películas.");
        setPeliculas([]); 
      } else {
        setError(null); 
        setPeliculas(data.results);
      }
    } catch (error) {
      console.error("Ha ocurrido un error: ", error);
      setError("Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Buscador de Películas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe una Película"
          value={busqueda}
          onChange={handleInputChange}
        />
        <button className="search-button">Buscar</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <div className="movie-list">
        {peliculas.map((pelicula) => (
          <div key={pelicula.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
              alt={pelicula.title}
            />
            <h2>{pelicula.title}</h2>
            <p>{pelicula.release_date}</p>
            <p><img src="src\Images\rating.png" alt="" /> {pelicula.popularity}</p>
            <p>{pelicula.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuscadorPeliculas;