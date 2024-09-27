import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosInstance } from "../../api/base"

const initialState = {
    user: null,
    userData: null,
    error: null,
    isLoggedin: false,
    errorSignIn: false,
}

export const signUp = createAsyncThunk(
    "/signup",
    async (user) => {
        try {
            const response = await axiosInstance.post(`/signup`, user);
            return response.data;
        } catch (e) {
            return e.response.data;
        }
    }
);

export const logIn = createAsyncThunk("/login", async (body) => {
  try {
    const response = await axiosInstance.post(`user/signin`, body);
    return response.data;
  } catch (e) {
    return e.response.data;
  }
});