import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api/clientApi";
import type { NoteTag } from "@/types/note";
import type { Metadata } from "next";

interface Props {
  params: { slug: string[] };
}

// generateMetadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // явно await для params
  const resolvedParams = await Promise.resolve(params);
  const category = resolvedParams?.slug?.[0] ?? "All";

  return {
    title: `${category} Notes — NoteHub`,
    description: `Browse notes tagged with "${category}" on NoteHub.`,
    openGraph: {
      title: `Notes: ${category}`,
      description: `Discover notes with tag "${category}" on NoteHub.`,
      url: `https://08-zustand-jet.vercel.app/notes/filter/${category}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub preview image",
        },
      ],
    },
  };
}

export default async function Notes({ params }: Props) {
  // await params
  const resolvedParams = await Promise.resolve(params);
  const category: NoteTag | "All" =
    (resolvedParams.slug?.[0] as NoteTag | undefined) || "All";

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", category],
    queryFn: () =>
      fetchNotes({
        search: "",
        page: 1,
        tag: category === "All" ? undefined : category,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={category} />
    </HydrationBoundary>
  );
}
