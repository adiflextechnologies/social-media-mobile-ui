import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../service";
import storeTypes from "../types";

const getFrames = createAsyncThunk<any, any>(
  storeTypes.async.frames.request,
  async (user, thunkAPI: any) => {
    const response = await api.posts.getFrames({ user_id: user.user_id });
    return response.data.output
  }
);

export {
    getFrames
}
