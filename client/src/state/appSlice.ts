import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IPost } from "types";
import { RootState } from "./store";

type initialStateType = {
  mode: "light" | "dark";
  user: IUser | null;
  token: string | null;
  posts: Array<IPost>;
};

const initialState: initialStateType = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    toggleMode(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    loggedIn(
      state,
      {
        payload: { user, token },
      }: PayloadAction<{
        token: string;
        user: IUser;
      }>
    ) {
      state.user = user;
      state.token = token;
    },
    loggedOut(state) {
      state.user = null;
      state.token = null;
    },
    friendsUpdated(
      state,
      { payload: friends }: PayloadAction<Array<IUser>>
    ) {
      if (!state.user) {
        console.error("No current user");

        return;
      }

      console.log("[friendsUpdated-payload]", friends);

      state.user.friends = friends;
    },
    postsUpdated(
      state,
      { payload: { posts } }: PayloadAction<{ posts: Array<IPost> }>
    ) {
      state.posts = posts;
    },
    postUpdated(state, { payload: { newPost } }: PayloadAction<{ newPost: IPost }>) {
      const postToUpdateInd = state.posts.findIndex((p) => p._id === newPost._id);
      state.posts[postToUpdateInd] = newPost;
    },
  },
});

// REDUCER
export default appSlice.reducer;

// ACTIONS
export const {
  toggleMode,
  loggedIn,
  loggedOut,
  friendsUpdated,
  postsUpdated,
  postUpdated,
} = appSlice.actions;

// SELECTORS
export const selectMode = (state: RootState) => state.app.mode;
export const selectPosts = (state: RootState) => state.app.posts;
export const selectUser = (state: RootState) => state.app.user;
export const selectToken = (state: RootState) => state.app.token;
