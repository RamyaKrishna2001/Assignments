import React from "react";
import { useDispatch } from "react-redux";
import { reset } from "./store/actions";
import MoviePlaylist from "./MoviePlaylist";
import SongPlaylist from "./SongPlaylist";

const MediaMix = () => {
  const dispatch = useDispatch();
  const handleResetClick = () => {
    dispatch(reset());
  };
  return (
    <div className="container mt-5">
      <button onClick={() => handleResetClick()} className="btn btn-danger">
        Reset Both Playlists
      </button>
      <hr />
      <MoviePlaylist />
      <hr />
      <SongPlaylist />
    </div>
  );
};

export default MediaMix;
