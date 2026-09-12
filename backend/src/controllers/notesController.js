import Note from "../models/Note.js";
import mongoose from "mongoose";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes:", error);
    res.status(500).json({ message: "Server Error in getAllNotes" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Note ID" });
    }

    const note = await Note.findOne({ _id: id, user: req.user._id });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNoteById:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createNote = async (req, res) => {
  try {
    const title = typeof req.body.title === "string" ? req.body.title.trim() : "";
    const content = typeof req.body.content === "string" ? req.body.content : "";

    if (!title && !content.trim()) {
      return res.status(400).json({ message: "Please add a title or content" });
    }

    const newNote = await Note.create({
      title: title || "Untitled Note",
      content,
      user: req.user._id,
    });

    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error in createNote:", error);
    res.status(500).json({ message: "Server Error in CreateNote" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const title = typeof req.body.title === "string" ? req.body.title.trim() : "";
    const content = typeof req.body.content === "string" ? req.body.content : "";

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Note ID" });
    }
    if (!title && !content.trim()) {
      return res.status(400).json({ message: "Please add a title or content" });
    }

    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { title: title || "Untitled Note", content },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNote:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Note ID" });
    }

    const deletedNote = await Note.findOneAndDelete({ _id: id, user: req.user._id });
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in deleteNote:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
