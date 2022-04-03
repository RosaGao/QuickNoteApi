const Note = require("../model/Note");
const ApiError = require("../model/ApiError");

class NoteDao {
  constructor() {
    this.notes = [];
  }

  async create({ title, text }){
    if (!title && !text) {
      throw new ApiError(400, "Note must have a valid body");
    }

    const newNote = new Note(title, text);
    this.notes.push(newNote);
    return newNote;
  }


  async update( id, { title, text }){

    const index = this.notes.findIndex((note)=>note._id === id);
    
    if (index === -1) {
      throw new ApiError(404, "Given ID not found");
    }

    if (title) {
      this.notes[index].title = title;
    }
    if (text) {
      this.notes[index].text = text;
    }
    return this.notes[index];
  }

  async delete( id ) {
    const index = this.notes.findIndex((note)=>note._id === id);
    if (index === -1) {
      throw new ApiError(404, "Given ID not found");
    }
    const note = this.notes[index];
    this.notes.splice(index, 1);
    return note;

  }

  // return empty array if no matching note
  async read( id ) {
    const note = this.notes.find((note)=>note._id === id);
    return note;
  }

  async readAll(query = "") {
    if (query){
      return this.notes.filter((note)=>note.title.includes(query) 
      || note.text.includes(query));
    } 
    return this.notes;
  }
  
}

module.exports = NoteDao;