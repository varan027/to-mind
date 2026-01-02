import express from 'express';
import { createNote, getAllNotes, updateNote, deleteNote, getNoteById } from '../controllers/notesController.js';
import { authProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authProtect);

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);


export default router;