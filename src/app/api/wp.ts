import axios from "axios";

export const wpApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});