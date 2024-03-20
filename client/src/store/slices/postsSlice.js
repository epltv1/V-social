import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mutate } from "swr";

const initialState = {
  status: "idle",
  error: null,
};

export const addPost = createAsyncThunk(
  "posts/addPost",
  async ({ formData, mutateKey }, { getState }) => {
    console.log(formData);
    const state = getState();
    const response = await fetch(`http://192.168.1.247:6001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${state.user.token}` },
      body: formData,
    });
    const data = await response.json();
    mutate(mutateKey);
    return data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (post_id, { getState, reject }) => {
    const state = getState();
    const response = await fetch(`http://192.168.1.247:6001/posts/${post_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${state.user.token}` },
    });
    if (response.status === 200) {
      return post_id;
    } else {
      reject();
    }
  }
);

export const patchLike = createAsyncThunk(
  "posts/patchLike",
  async ({ post_id, mutateKey }, { getState }) => {
    const state = getState();
    const response = await fetch(`http://192.168.1.247:6001/posts/${post_id}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${state.user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: state.user.user.id }),
    });
    const data = await response.json();
    mutate(mutateKey);
    return data;
  }
);

export const patchSave = createAsyncThunk(
  "posts/patchSave",
  async ({ post_id, mutateKey }, { getState }) => {
    const state = getState();
    const response = await fetch(`http://192.168.1.247:6001/posts/${post_id}/save`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${state.user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: state.user.user.id }),
    });
    const data = await response.json();
    mutate(mutateKey);
    return data;
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,

  extraReducers(builder) {
    builder
      .addCase(addPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addPost.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(patchLike.pending, (state) => {
        state.status = "loading";
      })
      .addCase(patchLike.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(patchLike.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(patchSave.pending, (state) => {
        state.status = "loading";
      })
      .addCase(patchSave.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(patchSave.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setPost } = postsSlice.actions;

export default postsSlice.reducer;