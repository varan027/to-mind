import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import RateLimitUI from "../components/RateLimitUI";
import toast from "react-hot-toast";
import type { Note } from "../types/note";
import { instance } from "../lib/axios";

const HomePage = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }

  const [isRateLimit, setRateLimit] = useState(false);
  const [notes, SetNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await instance.get("/notes");
        console.log(res.data);
        SetNotes(res.data);
        setRateLimit(false);
      } catch (error: unknown) {
        console.log("error fetching Notes", error);
        if (error instanceof Error) {
          console.log(error.message.includes("429"));
          if (error.message.includes("429")) setRateLimit(true);
          else if (error.message.includes("Failed to fetch"))
            toast.error(
              "Couldn't connect to the server. Please try again later."
            );
          else toast.error("Something went wrong. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimit && <RateLimitUI />}

      <div className="mx-auto p-4 mt-6 max-w-7xl">
        {loading && (
          <div className="text-center text-primary py-10">Loading Notes...</div>
        )}

        {!loading && !isRateLimit && notes.length === 0 && (
          <div className="text-center text-primary py-10">No Notes Found</div>
        )}

        {!loading && !isRateLimit && notes.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
            {notes.map((note: Note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
