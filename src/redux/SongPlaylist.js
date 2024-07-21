import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { addSong, removeSong } from "./store";
import { createRandomSong } from "./data";

function SongPlaylist() {
  const dispatch = useDispatch();
  const songPlaylist = useSelector((state) => {
    return state.songs;
  });

  const handleSongAdd = (song) => {
    dispatch(addSong(song));
  };

  const handleSongRemove = (song) => {
    dispatch(removeSong(song));
  };

  const renderedSongs = songPlaylist.map((song) => {
    return (
      <li key={song}>
        {song}
        <FontAwesomeIcon
          icon={faTrash}
          size="sm"
          className="text-danger ms-2"
          style={{ cursor: "pointer" }}
          onClick={() => handleSongRemove(song)}
        />
      </li>
    );
  });

  return (
    <div className="content">
      <div className="table-header d-flex justify-content-between">
        <h3>Song Playlist</h3>
        <div>
          <button
            onClick={() => handleSongAdd(createRandomSong())}
            className="btn btn-primary"
          >
            + Add Song to Playlist
          </button>
        </div>
      </div>
      <ul>{renderedSongs}</ul>
    </div>
  );
}

export default SongPlaylist;
