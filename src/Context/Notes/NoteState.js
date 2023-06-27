import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:4000";
  const notesInitial = [];

const fetchAllNotesFromDatabase = async () => {
    const url = `${host}/api/notes/fetchnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
    });

    const data = await response.json(); // Wait for the response to be parsed as JSON
    // notesInitial.concat(data); // Push the parsed data into the array
    console.log(data);
    setNotes(data);
  };

  const [notes, setNotes] = useState(notesInitial);

  const EditNotes = async (id, title, description, tag) => {
    //using api call we getting the clicked note from database and then updating in it
    console.log(title);
    const url = `${host}/api/notes/updatenotes/${id}`;
    const response = await fetch(url, {
      method: "PUT", //always use put in update

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },

      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    if (!response.ok) {
      throw new Error("Error updating notes"); // Handle non-successful response
    }
    const needtobeEditNotes = await response.json(); // parses JSON response into native JavaScript objects
    console.log(needtobeEditNotes);

    //for front end
    // Logic to edit in client
    // for (let index = 0; index < notes.length; index++) {
    //   const element = notes[index];
    //   if (element._id === id) {
    //     notes[index].title = title;
    //     notes[index].description = description;
    //     notes[index].tag = tag;
    //     break;
    //   }
      
    // }
    // setNotes(notes);  //isko krne ke baad reload krna pdega tab front end pe change hoga. so we will now create new note to handle it
    // Because re-rendering is an expensive operation, making state updates synchronously can cause serious performance issues, so react not alow reload itself
    
    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;               
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  };

  const DeleteNotes = async (id) => {
    const url = `${host}/api/notes/deletenotes/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
    });
    setNotes(notes.filter((note) => note._id !== id));
  };

const AddNotes = async (title, description, tag) => {
    const url = `${host}/api/notes/createnotes`;
    const response = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },

      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });

    //below code is for front end display , above is for database pe save krne ke leye
    const newNote = {
      title: title,
      description: description,
      tag: tag,
    };
    // console.log(newNote.description);
    setNotes(notes.concat(newNote));
  };
  return (
    //means notes can also be accessed and also set notes, jab jab notes ko update krna ho  q
    <NoteContext.Provider
      value={{
        notes,
        AddNotes,
        DeleteNotes,
        EditNotes,
        fetchAllNotesFromDatabase,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
