import { ArrowLeftIcon, CloudCog } from "lucide-react";
import HomePage from "./HomePage";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useState } from "react";
import { instance } from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const Navigate = useNavigate();

  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Title and Content cannot be empty");
      return;
    }

    setSaving(true);

    try {
      await instance.post("/notes", {
        title,
        content,
      });
      toast.success("Note created successfully");
      Navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes("Failed to fetch"))
          toast.error(
            "Couldn't connect to the server. Please try again later."
          );
        else toast.error("Something went wrong. Please try again later.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative">
      <HomePage />
      <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-base-300 rounded-md h-[80dvh] w-[80dvw] shadow-2xl p-6 flex flex-col">
        <Link to="/" className="w-fit">
          <button className="btn btn-ghost rounded-md">
            <ArrowLeftIcon className="size-4 mr-2" />
            Back
          </button>
        </Link>
        <div className="flex-1 flex flex-col mt-6 ml-6">
          <input
            type="text"
            placeholder="Title"
            className="w-full text-3xl mb-6 focus:outline-none rounded-md font-medium overflow-wrap"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Start writing your note here..."
            className="flex-1 w-full h-full resize-none focus:outline-none rounded-md text-lg"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <CloudCog className="size-4 animate-spin mx-6" />
            ) : (
              "Save Note"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
