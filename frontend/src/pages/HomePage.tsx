import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import RateLimitUI from "../components/RateLimitUI";
import toast from "react-hot-toast";
import type { Note } from "../types/note";
import { instance } from "../lib/axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";

const HomePage = () => {
  const { user, loading } = useAuth();

  const [isRateLimit, setRateLimit] = useState(false);
  const [notes, SetNotes] = useState<Note[]>([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

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
        setPageLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen ">
      <Navbar />
      <div className="max-w-6xl mx-auto p-4 mt-4">
        <div className="flex justify-between">
          {user && (
            <div className="text-right">
              <p className="text-lg">
                Welcome,{" "} 
                <span className="font-semibold font-mono text-primary text-3xl">
                  {user.username.charAt(0).toUpperCase()}
                  {user.username.slice(1, 4)}
                </span>
              </p>
            </div>
          )}

          <Link to="/create" className="btn btn-primary rounded">
            <PlusIcon className="size-5" />
            <span>New Note</span>
          </Link>
        </div>
        {isRateLimit && <RateLimitUI />}

        <div className="mt-8">
          {pageLoading && (
            <div className="max-w-7xl mx-auto animate-pulse">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
                <div className="bg-base-200/40 rounded-lg p-4">
                  <div className="h-6 bg-base-200 rounded-lg w-4/6 mb-6"></div>
                  <div className="h-3 bg-base-200 rounded-lg w-full mb-4"></div>
                  <div className="h-3 bg-base-200 rounded-lg w-5/6"></div>
                </div>
                <div className="bg-base-200/40 rounded-lg p-4">
                  <div className="h-6 bg-base-200 rounded-lg w-4/6 mb-6"></div>
                  <div className="h-3 bg-base-200 rounded-lg w-full mb-4"></div>
                  <div className="h-3 bg-base-200 rounded-lg w-5/6"></div>
                </div>
              </div>
            </div>
          )}

          {!pageLoading && !isRateLimit && notes.length === 0 && (
            <div className="text-center text-primary py-10">No Notes Found</div>
          )}

          {!pageLoading && !isRateLimit && notes.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
              {notes.map((note: Note) => (
                <NoteCard key={note._id} note={note} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
