import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Trash2, Loader2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { instance } from '../lib/axios';

const NoteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await instance.get(`/notes/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error: unknown) {
        console.log("error fetching Note", error);
        toast.error("Could not load note");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id, navigate]);

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) return;
    setSaving(true);
    try {
      await instance.put(`notes/${id}`, { title, content });
      toast.success("Note updated");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await instance.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <Loader2 className="animate-spin text-primary size-8" />
    </div>;
  }

  return (
    // FIXED: Changed bg-[#14161E] to bg-base-100
    <div className="min-h-screen bg-base-100 flex flex-col transition-colors duration-300">
      {/* Minimal Toolbar */}
      <div className="px-6 py-6 flex justify-between items-center max-w-5xl mx-auto w-full border-b border-base-content/5">
        <Link to="/" className="text-base-content/60 hover:text-base-content transition-colors flex items-center gap-2 group">
           <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
           <span className="hidden sm:inline">Back</span>
        </Link>
        
        <div className="flex gap-2">
            <button 
                onClick={handleDelete}
                className="btn btn-ghost btn-sm h-10 px-4 rounded-full hover:bg-red-500/10 hover:text-red-400 text-base-content/60"
            >
                <Trash2 size={18} />
            </button>
            <button 
                onClick={handleSave} 
                disabled={saving}
                className="btn btn-primary btn-sm h-10 px-6 rounded-full font-medium text-primary-content"
            >
                {saving ? <Loader2 className="animate-spin size-4" /> : <><Save size={16} className="mr-1"/> Save</>}
            </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 mt-12 animate-fade-in flex flex-col">
        {/* FIXED: Inputs now use base-content */}
        <input
            type="text"
            placeholder="Untitled Note"
            className="w-full bg-transparent text-4xl md:text-5xl font-bold text-base-content placeholder-base-content/20 border-none focus:outline-none focus:ring-0 p-0 mb-8 font-Cabin tracking-tight"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
            placeholder="Start typing your thoughts..."
            className="flex-1 w-full bg-transparent text-lg text-base-content/80 placeholder-base-content/30 border-none focus:outline-none focus:ring-0 resize-none p-0 leading-relaxed"
            value={content}
            onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteDetail;