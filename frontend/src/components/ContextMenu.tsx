import { Edit2Icon, Trash2Icon } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { instance } from '../lib/axios';

interface ContextMenuProps {
  x: number;
  y: number;
  contextRef: React.RefObject<HTMLDivElement>;
  id: string | undefined;
}

const ContextMenu: React.FC<ContextMenuProps> = ({x, y, contextRef, id}) => {
  const Navigate = useNavigate();

  const handleDelete = async ( id: string) => {
  
      const confirm = window.confirm("Are you sure you want to delete this note?");
      if (!confirm) return;
      try{
        await instance.delete(`/notes/${id}`);
        toast.success("Note deleted successfully");
        Navigate("/");
        window.location.reload();
      } catch (error) {
        console.log("error deleting note", error)
      }
  };

  return (
    <div
    ref={contextRef}
    className='absolute z-50 bg-base-100 shadow-lg rounded-md text-base-content w-30 border border-base-content/30'
    style={{ top: y, left: x }}
    >
      <div className='hover:bg-base-200 px-4 py-2 cursor-pointer rounded-t text-primary'
      onClick={() => {
        Navigate(`/note/${id}`);
      }}
      >
        <Edit2Icon className='inline mr-2 h-4 w-4' />
        Edit
      </div>
      <div className='hover:bg-base-200 px-4 py-2 cursor-pointer rounded-b text-error/60'
      onClick={() => { 
        handleDelete(id!);
      }}
      >
        <Trash2Icon className='inline mr-2 h-4 w-4' />
        Delete
      </div>
    </div>
  )
}

export default ContextMenu