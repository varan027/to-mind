import React, { useState, useEffect } from 'react'
import { ArrowLeftIcon, CloudCog } from "lucide-react";
import HomePage from "./HomePage";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { instance } from '../lib/axios';
import { Trash2Icon } from 'lucide-react';

const NoteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await instance.get(`/notes/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error: unknown) {
        console.log("error fetching Note", error);
        if (error instanceof Error) {
          if (error.message.includes("404"))
            toast.error("Note not found");
          else if (error.message.includes("Failed to fetch"))
            toast.error("Couldn't connect to the server. Please try again later."); 
          else
            toast.error("Something went wrong. Please try again later.");
          Navigate("/");
        }
      }
    }
    fetchNote();
  }, [id, Navigate]);

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
      await instance.put(`notes/${id}`, {  
        title,
        content,
      });
      toast.success("Note updated successfully");
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

  const handleDelete = async (e: React.MouseEvent, id: string) => {
      e.preventDefault();
      e.stopPropagation();
  
      const confirm = window.confirm("Are you sure you want to delete this note?");
      if (!confirm) return;
      try{
        await instance.delete(`/notes/${id}`);
        toast.success("Note deleted successfully");
        Navigate("/");
      } catch (error) {
        console.log("error deleting note", error)
      }
  };

  return (
      <div className="relative">
      <HomePage />
      <div className="absolute top-0 left-0 w-full h-full bg-black/40" onClick={() => Navigate("/")}></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-base-300 rounded-md h-[80dvh] w-[80dvw] shadow-2xl p-6 flex flex-col">
        <div className='flex justify-between items-center'>
          <Link to="/" className="w-fit">
          <button className="btn btn-ghost rounded-md">
            <ArrowLeftIcon className="size-4 mr-2" />
            Back
          </button>
        </Link>
        <button className="btn btn-ghost border-2 border-base-content/80 hover:text-error/70 hover:border-error/70" onClick={(e) => handleDelete(e, id!)}>
            <Trash2Icon className="size-4"/>
        </button>
        </div>
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
        <div className="mt-4 flex justify-end items-center">
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
  )
}
export default NoteDetail