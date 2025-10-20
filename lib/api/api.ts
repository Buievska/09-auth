import axios from "axios";

export const nextServer = axios.create({
  // Просто вказуємо відносний шлях до нашого API
  baseURL: "/api",

  // Цей параметр важливий для передачі кукі
  withCredentials: true,
});

export const apiServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
