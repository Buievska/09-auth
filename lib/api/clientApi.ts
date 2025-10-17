import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";
import type { AuthCredentials, UpdateUserRequest } from "@/types/auth";

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const clientApi = axios.create({
  baseURL: "",
});

const buildNotesParams = ({
  page = 1,
  perPage = 12,
  search,
  tag,
}: FetchNotesParams = {}) => ({
  page,
  perPage,
  ...(search && search.trim() !== "" ? { search } : {}),
  ...(tag && tag !== "All" ? { tag } : {}),
});

export const fetchNotesRequest = async (
  params?: FetchNotesParams,
  config?: AxiosRequestConfig
) => {
  const response = await clientApi.get<FetchNotesResponse>("/api/notes", {
    params: buildNotesParams(params),
    ...config,
  });
  return response.data;
};

export const fetchNoteByIdRequest = async (
  id: string,
  config?: AxiosRequestConfig
) => {
  const response = await clientApi.get<Note>(`/api/notes/${id}`, config);
  return response.data;
};

export const createNoteRequest = async (
  payload: Omit<Note, "id" | "createdAt" | "updatedAt">,
  config?: AxiosRequestConfig
) => {
  const response = await clientApi.post<Note>("/api/notes", payload, config);
  return response.data;
};

export const updateNoteRequest = async (
  id: string,
  payload: Partial<Note>,
  config?: AxiosRequestConfig
) => {
  const response = await clientApi.patch<Note>(
    `/api/notes/${id}`,
    payload,
    config
  );
  return response.data;
};

export const deleteNoteRequest = async (
  id: string,
  config?: AxiosRequestConfig
) => {
  const response = await clientApi.delete<Note>(`/api/notes/${id}`, config);
  return response.data;
};

export const fetchNotes = (params?: FetchNotesParams) =>
  fetchNotesRequest(params);
export const fetchNoteById = (id: string) => fetchNoteByIdRequest(id);
export const createNote = (
  payload: Omit<Note, "id" | "createdAt" | "updatedAt">
) => createNoteRequest(payload);
export const updateNote = (id: string, payload: Partial<Note>) =>
  updateNoteRequest(id, payload);
export const deleteNote = (id: string) => deleteNoteRequest(id);

export const login = (credentials: AuthCredentials) =>
  clientApi.post<User>("/api/auth/login", credentials).then((res) => res.data);

export const register = async (credentials: AuthCredentials) => {
  try {
    const response = await clientApi.post<User>(
      "/api/auth/register",
      credentials
    );
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;

    if (axiosError.response?.status === 409) {
      throw new Error("Користувач з таким email вже існує");
    }

    throw new Error(
      axiosError.response?.data?.message || "Помилка при реєстрації"
    );
  }
};

export const logout = () =>
  clientApi.post("/api/auth/logout").then((res) => res.data);

export const getSession = () =>
  clientApi
    .get<User | null>("/api/auth/session")
    .then((res) => res.data || null);

export const getCurrentUser = () =>
  clientApi.get<User>("/api/users/me").then((res) => res.data);

export const updateUser = (payload: UpdateUserRequest) =>
  clientApi.patch<User>("/api/users/me", payload).then((res) => res.data);
