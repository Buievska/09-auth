import NoteForm from "../../../../components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Creating Note",
  description: "Create your note.",
  openGraph: {
    title: "Creating Note",
    description: "Create your super note.",
    url: "https://08-zustand-jet.vercel.app/notes/action/create",
    images: [
      { url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" },
    ],
  },
};
export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
        <Toaster />
      </div>
    </main>
  );
}
