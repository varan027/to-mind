import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import { instance } from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  
  // Ref for auto-resizing the title
  const titleRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize title height on change
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = "auto";
      titleRef.current.style.height = titleRef.current.scrollHeight + "px";
    }
  }, [title]);

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) {
      toast.error("Please add a title or content");
      return;
    }
    setSaving(true);
    try {
      await instance.post("/notes", { title, content });
      toast.success("Note saved successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Error saving note");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col transition-colors duration-300">
      {/* Minimal Toolbar */}
      <div className="px-6 py-6 flex justify-between items-center max-w-5xl mx-auto w-full border-b border-base-content/5">
        <Link to="/" className="text-base-content/60 hover:text-base-content transition-colors flex items-center gap-2 group">
           <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
           <span className="hidden sm:inline">Back</span>
        </Link>
        
        <button 
            onClick={handleSave} 
            disabled={saving}
            className="btn btn-primary btn-sm h-10 px-6 rounded-full font-medium text-primary-content"
        >
            {saving ? <Loader2 className="animate-spin size-4" /> : <><Save size={16} className="mr-1"/> Save Note</>}
        </button>
      </div>

      {/* Editor Area */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 mt-12 animate-fade-in flex flex-col">
        {/* FIXED: Changed from Input to Textarea for wrapping */}
        <textarea
            ref={titleRef}
            placeholder="Untitled Note"
            rows={1}
            className="w-full bg-transparent text-4xl md:text-5xl font-bold text-base-content placeholder-base-content/20 border-none focus:outline-none focus:ring-0 p-0 mb-8 font-Cabin tracking-tight resize-none overflow-hidden"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
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

export default CreatePage;