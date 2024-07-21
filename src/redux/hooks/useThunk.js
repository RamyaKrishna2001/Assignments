import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

export const useThunk = (thunk) => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const runThunk = useCallback(
    (arg) => {
      setLoader(true);
      dispatch(thunk(arg))
        .unwrap()
        .catch((err) => setError(err))
        .finally(() => setLoader(false));
    },
    [dispatch, thunk]
  );

  return [loader, error, runThunk];
};
