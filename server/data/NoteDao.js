const Note = require("../model/Note");
const ApiError = require("../model/ApiError");
const { default: mongoose } = require("mongoose");

class NoteDao {

  async create({ title, text, author }){
    if (!title) {
      throw new ApiError(400, "Note must have a valid title");
    }
    if (!text) {
      throw new ApiError(400, "Note must have a valid text body");
    }
    if (!author || !mongoose.isValidObjectId(author)) {
      throw new ApiError(400, "Note must have a valid author");
    }

    const note = await Note.create({ title, text, author });
    return note;
  }


  async update( author, id, { title, text } ){
    // would throw error if invalid id/author or non-exist
    await this.read(author, id);
    
    // return a promise (not await here)
    // await in NoteDao
    return Note.findByIdAndUpdate(
      id,
      { title, text },
      { new: true, runValidators: true }
    );
  }

  async delete( author, id ) {
    // similarly, check validity by using read()
    await this.read(author, id);

    // return a promise, NoteDao "await" for it to resolve
    return Note.findByIdAndDelete(id);
  }


  // return empty array if no matching note
  async read(author, id) {
    if (!author || !mongoose.isValidObjectId(author)) {
      throw new ApiError(500, "Author attribute invalid or missing!")
    }

    const note = await Note.findById(id);
    if (note === null) {
      throw new ApiError(404, "There is no note with the given ID!");
    }

    if (note.author.toString() !== author) {
      throw new ApiError(
        403,
        "You are not authorized to access this resource!"
      );
    }
    return note;
  }

  async readAll(author, query = "") {
    if (!author || !mongoose.isValidObjectId(author)) {
      throw new ApiError(500, "Author attribute invalid or missing!")
    }

    // only return notes created by given author
    const notes = await Note.find({ author });

    if (query !== "") {
      return notes.filter((note)=> note.title.includes(query) || note.text.includes(query));
    }
    return notes; 
  }
  
}

module.exports = NoteDao;