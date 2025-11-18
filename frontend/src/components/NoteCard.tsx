import { Link } from "react-router";
import type { Note } from "../types/note";
import { formatDate } from "../lib/utils";
import { useState } from "react";
import ContextMenu from "./ContextMenu";
import { useClickAway } from "@uidotdev/usehooks";

const initialContextMenu = {
  show: false,
  x: 0,
  y: 0,
};

const NoteCard = ({ note }: { note: Note }) => {

  const [contextMenu, setcontextMenu] = useState(initialContextMenu);
  const closeContextMenu = () => {
    setcontextMenu(initialContextMenu);
  };

  const ref = useClickAway<HTMLDivElement>(closeContextMenu);

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    const { pageX, pageY } = e;
    setcontextMenu({ show: true, x: pageX, y: pageY });
  };

  return (
    <div onContextMenu={handleContextMenu}>
      {contextMenu.show && (
        <ContextMenu
          contextRef={ref}
          x={contextMenu.x}
          y={contextMenu.y}
          id={note._id}
        />
      )}

      <Link to={`/note/${note._id}`} className="h-full">
        <div className="bg-base-200 shadow hover:shadow-xl cursor-pointer flex flex-col justify-between p-4 rounded hover:border border-[#333840]">
          <div className="p-0">
            <h2 className="card-title text-base-content text-wrap">
              {note.title}
            </h2>
            <p className="text-base-content/70 line-clamp-3 text-sm">
              {note.content}
            </p>
            <div className="mt-4">
              <span className="text-xs">{formatDate(note.createdAt)}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NoteCard;
