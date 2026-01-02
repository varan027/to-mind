import Note from "../models/Note.js";

export const getAllNotes = async (_, res) => {
  try {
    const notes = (await Note.find()).toSorted(
      (a, b) => b.createdAt - a.createdAt
    );
    res.status(200).json(notes);
  } catch (error) {
    console.log("error in getNotes:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    if(!mongoose.Types.objectId.isValid(id)){
      return res.status(400).json({message: "Invalid Note ID"});
    }

    const note = await Note.findById(id);
    
    if (!note) return res.status(404).json({ message: "Note Not Found" });
    res.status(200).json(note);
  } catch (error) {
    console.log("error in getNoteById:", error);
    res.status(500).json({ message: "server error" });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json({ message: "note created" });
  } catch (error) {
    console.log("error n createNote:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );
    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    console.log("error in updateNote:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.log("error in deleteNote:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
