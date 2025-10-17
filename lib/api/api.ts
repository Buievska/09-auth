import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});

export const api = axios.create({
  baseURL: "https://notehub-api.goit.study",
  withCredentials: true,
});
