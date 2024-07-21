import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeUser = createAsyncThunk("remove/user", async (userId) => {
  await axios.delete(`http://localhost:3005/users/${userId}`);

  return userId;
});

export { removeUser };
