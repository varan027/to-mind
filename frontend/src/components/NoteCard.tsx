import { Link } from "react-router-dom";
import type { Note } from "../types/note";
import { formatDate } from "../lib/utils";
import { MoreVertical, Edit2, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { instance } from "../lib/axios";
import toast from "react-hot-toast";

interface NoteCardProps {
  note: Note;
  onDelete: () => void;
}

const NoteCard = ({ note, onDelete }: NoteCardProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close menu
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

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    
    try {
      await instance.delete(`/notes/${note._id}`);
      toast.success("Note deleted");
      onDelete(); 
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete note");
    }
  };

  return (
    <div className="relative group break-inside-avoid mb-4 animate-slide-up">
      <Link to={`/note/${note._id}`} className="block h-full">
        <div className="glass-card rounded-2xl p-5 h-full relative flex flex-col justify-between min-h-[160px]">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div>
            <div className="flex justify-between items-start mb-2">
              <h2 className="card-title text-lg font-bold text-base-content leading-tight mb-1 w-[90%] break-words">
                {note.title}
              </h2>
            </div>

            <p className="text-base-content/70 text-sm line-clamp-4 leading-relaxed font-light break-words whitespace-pre-wrap">
              {note.content}
            </p>
          </div>

          <div className="flex justify-between items-end border-t border-base-content/5 pt-3 mt-4">
            <span className="text-xs text-primary font-mono tracking-wider">
              {formatDate(note.createdAt)}
            </span>
            
            {/* Action Button Container */}
            <div className="relative" ref={menuRef} onClick={(e) => e.preventDefault()}>
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
                      onClick={handleDelete} 
                      className="px-4 py-3 hover:bg-error/10 text-sm flex items-center gap-2 text-error w-full text-left transition-colors"
                    >
                      <Trash2 size={14}/> Delete
                    </button>
                 </div>
               )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NoteCard;