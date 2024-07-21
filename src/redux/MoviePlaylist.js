import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addMovie, removeMovie } from "./store";
import { createRandomMovie } from "./data";

function MoviePlaylist() {
  const dispatch = useDispatch();
  const moviePlaylist = useSelector((state) => {
    return state.movies;
  });

  const handleMovieAdd = (movie) => {
    dispatch(addMovie(movie));
  };
  const handleMovieRemove = (movie) => {
    dispatch(removeMovie(movie));
  };

  const renderedMovies = moviePlaylist.map((movie) => {
    return (
      <li key={movie}>
        {movie}
        <FontAwesomeIcon
          icon={faTrash}
          size="sm"
          className="text-danger ms-2"
          style={{ cursor: "pointer" }}
          onClick={() => handleMovieRemove(movie)}
        />
      </li>
    );
  });

  return (
    <div className="content">
      <div className="table-header d-flex justify-content-between">
        <h3>Movie Playlist</h3>
        <div>
          <button
            onClick={() => handleMovieAdd(createRandomMovie())}
            className="btn btn-primary"
          >
            + Add Movie to Playlist
          </button>
        </div>
      </div>
      <ul>{renderedMovies}</ul>
    </div>
  );
}

export default MoviePlaylist;
