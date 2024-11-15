import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

export const fetchVideos = createAsyncThunk(
    'results/fetchVideos',
    async (query: string) => {
        return await axios
            .get(
                ` https://y0utubeee-audiooo-api-v1.vercel.app/a@1aa1-13haf--31bbnlm/search?q=${query}`
            )
            .then((res: AxiosResponse) => res.data.result);
    })