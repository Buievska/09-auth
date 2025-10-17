import type { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { api } from "./api";
import type { Note } from "@/types/note";
import type { UpdateUserRequest } from "@/types/auth";
import type { User } from "@/types/user";
import type { FetchNotesParams } from "./clientApi";

const mergeConfigs = async (
  config?: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll ? cookieStore.getAll() : [];
  const cookieHeader = allCookies.map((c) => `${c.name}=${c.value}`).join("; ");

  return {
    ...config,
    headers: {
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      ...(config?.headers ?? {}),
    },
  };
};

export const fetchNotesServer = async (params?: FetchNotesParams) => {
  const config = await mergeConfigs();
  return api.get("/notes", { params, ...config }).then((res) => res.data);
};

export const fetchNoteByIdServer = async (id: string) => {
  const config = await mergeConfigs();
  return api.get<Note>(`/notes/${id}`, config).then((res) => res.data);
};

export const createNoteServer = async (
  payload: Omit<Note, "id" | "createdAt" | "updatedAt">
) => {
  const config = await mergeConfigs();
  return api.post<Note>("/notes", payload, config).then((res) => res.data);
};

export const updateNoteServer = async (id: string, payload: Partial<Note>) => {
  const config = await mergeConfigs();
  return api
    .patch<Note>(`/notes/${id}`, payload, config)
    .then((res) => res.data);
};

export const deleteNoteServer = async (id: string) => {
  const config = await mergeConfigs();
  return api.delete<Note>(`/notes/${id}`, config).then((res) => res.data);
};

export const getSessionServer = async () =>
  api.get("/auth/session", await mergeConfigs()).then((res) => res.data);

export const getCurrentUserServer = async () => {
  try {
    const config = await mergeConfigs();
    return api.get<User>("/users/me", config).then((res) => res.data);
  } catch {
    return null;
  }
};

export const updateUserServer = async (payload: UpdateUserRequest) => {
  const config = await mergeConfigs();
  return api.patch<User>("/users/me", payload, config).then((res) => res.data);
};
