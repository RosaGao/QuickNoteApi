const Note = require("../model/Note");
const ApiError = require("../model/ApiError");

class NoteDao {
  constructor() {
    this.note = [];
  }

  async create({ title, text }){
    if (!title) {
      throw new ApiError(400, "Note must have a valid title");
    }
    if (!text) {
      throw new ApiError(400, "Note must have a valid text body");
    }

    const newNote = new Note(title, text);
    this.note.push(newNote);
    return newNote;
  }


  async update( id, { title, text }){

    const index = this.note.findIndex((note)=>note._id === id);
    
    if (index === -1) {
      throw new ApiError(404, "Given ID not found");
    }

    if (title) {
      this.note[index].title = title;
    }
    if (text) {
      this.note[index].text = text;
    }
    return this.note[index];
  }

  async delete( id ) {
    const index = this.note.findIndex((note)=>note._id === id);
    if (index === -1) {
      throw new ApiError(404, "Given ID not found");
    }
    const note = this.note[index];
    this.note.splice(index, 1);
    return note;

  }

  // return empty array if no matching note
  async read( id ) {
    const note = this.note.find((note)=>note._id === id);
    return note;

  }

  async readAll (query = "") {
    const result = [];
    this.note.forEach((note)=>{
      if(note.title.includes(query) || note.text.includes(query)){
        result.push(note);
      }
    });
    return result;
  }
}

module.exports = NoteDao;