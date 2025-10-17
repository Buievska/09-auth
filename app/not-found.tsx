import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found | NoteHub",
  description: "Sorry, the page you're looking for doesn't exist.",
  openGraph: {
    title: "Page not found | NoteHub",
    description: "Sorry, the page you're looking for doesn't exist.",
    url: "https://08-zustand-jet.vercel.app/not-found",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "100px" }}>
      <h1>404 - Page Not Found</h1>
      <p>{"Sorry, the page you're looking for doesn't exist."}</p>
    </div>
  );
}
