HTTP Method           GET
API endpoint          /api/notes
Request Path Param    
Request Query Param
Request Body
Response Body         JSON array of notes
Response Status       200


HTTP Method           GET
API endpoint          /api/notes
Request Path Param    
Request Query Param   query
Request Body
Response Body         JSON array of notes
Response Status       200


HTTP Method           GET
API endpoint          /api/notes/:id
Request Path Param    id
Request Query Param   
Request Body
Response Body         JSON object(note)
Response Status       200


HTTP Method           POST
API endpoint          /api/notes/
Request Path Param    
Request Query Param   
Request Body          JSON object(note attributes)
Response Body         JSON object(created note)
Response Status       201



HTTP Method           DELETE
API endpoint          /api/notes/:id
Request Path Param    id
Request Query Param   
Request Body          
Response Body         JSON object(deleted note)
Response Status       200


HTTP Method           PUT
API endpoint          /api/notes/:id
Request Path Param    id
Request Query Param   
Request Body          JSON object(note attributes))
Response Body         JSON object(updated note)
Response Status       200


collection:
  a single entity in the app
    e.g. notes, users ...

document:
  an instance of the collection entity
  looks like a JSON object
    e.g. note (each "note" document contains attributes like "title", "text")

schema:
  JSON object defining the shape and content of a document




model is a compiled version of schema
document is an instance of model
collection contains models

ModelDao hides the implementaiton details of Model
but essentailly we manipulate a document w/ Model
(model methods: findByIdAndUpdate, deleteMany...)

