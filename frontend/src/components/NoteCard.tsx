import { Link } from "react-router-dom";
import type { Note } from "../types/note";
import { formatDate } from "../lib/utils";
import { MoreVertical, Edit2, Trash2, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { instance } from "../lib/axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

interface NoteCardProps {
  note: Note;
  onDelete: () => void;
}

const NoteCard = ({ note, onDelete }: NoteCardProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await instance.delete(`/notes/${note._id}`);
      toast.success("Note deleted");
      onDelete();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete note");
      setIsDeleting(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className="relative group break-inside-avoid mb-4"
    >
      <div className="glass-card rounded-2xl h-full relative flex flex-col justify-between min-h-[160px] overflow-hidden">

        {showConfirm ? (
          <div className="absolute inset-0 z-20 bg-base-100/80 backdrop-blur-md flex flex-col items-center justify-center animate-fade-in p-4 text-center">
            <h3 className="font-bold text-base-content mb-1">Delete this note?</h3>
            <p className="text-xs text-base-content/60 mb-4">This action cannot be undone.</p>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowConfirm(false)}
                className="btn btn-ghost btn-sm btn-circle bg-base-200 hover:bg-base-300 border border-base-content/10"
              >
                <X size={16} className="text-base-content/70" />
              </button>
              <button 
                onClick={handleDelete}
                disabled={isDeleting}
                className="btn btn-error btn-sm btn-circle text-white shadow-lg shadow-error/30"
              >
                {isDeleting ? <span className="loading loading-spinner loading-xs"></span> : <Trash2 size={16} />}
              </button>
            </div>
          </div>
        ) : null}

        <Link to={`/note/${note._id}`} className="block h-full p-5">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div>
            <div className="flex justify-between items-start mb-2">
              <h2 className="card-title text-lg font-bold text-base-content leading-tight mb-1 w-[90%] break-words line-clamp-2">
                {note.title}
              </h2>
            </div>

            <p className="text-base-content/70 text-sm line-clamp-4 leading-relaxed font-light break-words whitespace-pre-wrap">
              {note.content}
            </p>
          </div>
        </Link>

        <div className="flex justify-between items-end border-t border-base-content/5 pt-3 mt-4 mx-5 mb-5 pointer-events-none">
          <span className="text-xs text-primary font-mono tracking-wider">
            {formatDate(note.createdAt)}
          </span>
          
          <div className="relative pointer-events-auto" ref={menuRef} onClick={(e) => e.preventDefault()}>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
                className={`p-1.5 rounded-full hover:bg-base-content/10 transition-colors relative z-10 ${showMenu ? "text-base-content bg-base-content/10" : "text-base-content/50"}`}
              >
                <MoreVertical size={16} />
              </button>

              {showMenu && (
                <div className="absolute right-0 bottom-8 w-32 bg-base-200 border border-base-content/10 shadow-2xl rounded-xl overflow-hidden z-[100] flex flex-col animate-fade-in origin-bottom-right">
                  <Link 
                    to={`/note/${note._id}`} 
                    className="px-4 py-3 hover:bg-base-content/5 text-sm flex items-center gap-2 text-base-content transition-colors"
                  >
                    <Edit2 size={14}/> Edit
                  </Link>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenu(false);
                      setShowConfirm(true);
                    }} 
                    className="px-4 py-3 hover:bg-error/10 text-sm flex items-center gap-2 text-error w-full text-left transition-colors"
                  >
                    <Trash2 size={14}/> Delete
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NoteCard;