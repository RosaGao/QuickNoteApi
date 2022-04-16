const Note = require("../model/Note");
const ApiError = require("../model/ApiError");

class NoteDao {

  async create({ title, text }){
    if (!title && !text) {
      throw new ApiError(400, "Note must have a valid body");
    }

    const note = await Note.create({ title, text });
    return note;
  }


  async update( id, { title, text } ){
    
    const note = await Note.findByIdAndUpdate(
      id,
      { title, text },
      { new: true, runValidators: true }
    );

    if (!note) {
      throw new ApiError(404, "There is no note with the given ID!");
    }

    return note;
  }

  async delete( id ) {
    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      throw new ApiError(404, "Given ID not found");
    }

    return note;

  }

  // return empty array if no matching note
  async read( id ) {
    const note = await Note.findById(id);
    return note ? note : [];
  }

  async readAll(query = "") {
    if (query !== "") {
      const notes = await Note.find().or([
        { title :
          { "$regex": query, "$options": "i"} 
        }, 
        { text:
          { "$regex": query, "$options": "i" }
        }
      ]);
      return notes;
    }
    const notes = await Note.find({});
    return notes; 
  }
  
}

module.exports = NoteDao;