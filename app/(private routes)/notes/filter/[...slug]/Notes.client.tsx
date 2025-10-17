"use client";

import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes, type FetchNotesResponse } from "@/lib/api/clientApi";
import { Toaster } from "react-hot-toast";
import css from "./NotesPage.module.css";

import type { NoteTag } from "@/types/note";

interface NotesClientProps {
  tag?: NoteTag | "All";
}

export default function NotesClient({ tag = "All" }: NotesClientProps) {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const queryClient = useQueryClient();
  const router = useRouter();

  // Debounce пошуку
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(searchInput);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchInput]);

  const safeTag = tag === "All" ? undefined : tag;

  const query = useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", currentPage, searchQuery, safeTag],
    queryFn: () =>
      fetchNotes({
        search: searchQuery,
        page: currentPage,
        tag: safeTag,
      }),
    placeholderData: () => {
      const prevData = queryClient.getQueryData<FetchNotesResponse>([
        "notes",
        currentPage - 1 > 0 ? currentPage - 1 : 1,
        searchQuery,
        safeTag,
      ]);
      return prevData ?? { notes: [], totalPages: 0 };
    },
    refetchOnWindowFocus: false,
  });

  const notes = query.data?.notes ?? [];
  const totalPages = query.data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <Toaster position="top-right" />
      <header className={css.toolbar}>
        <SearchBox value={searchInput} onChange={setSearchInput} />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            pageCount={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        <button
          className={css.button}
          onClick={() => router.push("/notes/action/create")}
        >
          Create note +
        </button>
      </header>

      <main className={css.content}>
        {query.isLoading || (query.isFetching && !notes.length) ? (
          <p>Loading, please wait...</p>
        ) : query.isError ? (
          <p>Something went wrong: Failed to load notes.</p>
        ) : notes.length === 0 ? (
          <p className={css.empty}>No notes found</p>
        ) : (
          <NoteList notes={notes} />
        )}
      </main>
    </div>
  );
}
