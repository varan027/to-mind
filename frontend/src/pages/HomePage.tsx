import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import RateLimitUI from "../components/RateLimitUI";
import toast from "react-hot-toast";
import type { Note } from "../types/note";
import { instance } from "../lib/axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { PlusIcon, CloudCog } from "lucide-react";

const HomePage = () => {
  const { user, loading } = useAuth();
  const [isRateLimit, setRateLimit] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [pageLoading, setPageLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const res = await instance.get("/notes");
      setNotes(res.data);
      setRateLimit(false);
    } catch (error: unknown) {
      console.log("error fetching Notes", error);
      if (error instanceof Error) {
        if (error.message.includes("429")) setRateLimit(true);
        else if (error.message.includes("Failed to fetch"))
          toast.error("Couldn't connect to the server.");
        else toast.error("Something went wrong.");
      }
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    if (loading) return;
    fetchNotes();
  }, [loading]);

  const handleNoteDelete = () => {
    fetchNotes();
  };

  return (
    <div className="min-h-screen bg-mesh text-base-content selection:bg-primary/20 transition-colors duration-300">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold text-base-content tracking-tight mb-1">
              My Mind
            </h1>
            <p className="text-base-content/60 text-sm">
              Welcome back,{" "}
              <span className="text-primary font-medium">{user?.username}</span>
            </p>
          </div>

          <Link
            to="/create"
            className="group relative inline-flex items-center justify-center px-6 py-3 font-medium text-primary-content transition-all duration-200 bg-primary font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary hover:bg-primary/90 shadow-lg shadow-primary/30"
          >
            <PlusIcon className="mr-2 size-5 transition-transform group-hover:rotate-90" />
            Create Note
          </Link>
        </div>

        {isRateLimit && <RateLimitUI />}

        {pageLoading && (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="break-inside-avoid mb-4 bg-base-200/40 rounded-2xl p-5 h-40 animate-pulse border border-base-content/5"
              >
                <div className="h-6 bg-base-content/10 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-base-content/10 rounded w-full mb-2"></div>
                <div className="h-4 bg-base-content/10 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!pageLoading && !isRateLimit && notes.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[40vh] text-center border-2 border-dashed border-base-content/10 rounded-3xl animate-fade-in bg-base-200/20">
            <div className="bg-base-200 p-4 rounded-full mb-4 shadow-xl">
              <CloudCog className="size-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-base-content">
              Your mind is clear
            </h3>
            <p className="text-base-content/60 mt-2 max-w-xs">
              Capture your first thought to get started.
            </p>
          </div>
        )}

        {/* Masonry Layout */}
        {!pageLoading && !isRateLimit && notes.length > 0 && (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {notes.map((note: Note) => (
              <NoteCard
                key={note._id}
                note={note}
                onDelete={handleNoteDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
