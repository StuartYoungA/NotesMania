import React, { useRef } from "react";
import { useContext, useEffect,useState } from "react";
import noteContext from "../Context/Notes/noteContext";
import NotesItem from "./NotesItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
const Notesmain = () => {

  const fetchedNotes = useContext(noteContext);
  // or directly we can use destructured property const{notes,setNotes}=fetchedNotes
  const { fetchAllNotesFromDatabase, notes,EditNotes} = fetchedNotes;

  let navigate=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      
      fetchAllNotesFromDatabase();          //if local storage pe token saved hai then only show notes
    }
    else{
      navigate('/login')  //else say to user that please login first , then u only able to see your notes
    }
    
  }, []);

  
  const[note,setNote]=useState({eid:"",etitle:"",edescription:"",etag:""})
  const updatenotes = async (note) => {
    
    ref.current.click();

    setNote({
     eid:note._id,
     etitle:note.title,
     edescription:note.description,
     etag:note.tag
    })
  };
  
  const ref = useRef(null);
  const refClose=useRef(null);

  

  const handleEdit=(e)=>{
    console.log("hi ",note)
    e.preventDefault() //taaki page reload na ho submit krne pe
    EditNotes(note.eid,note.etitle,note.edescription,note.etag)   //this will concat new note inside newsstate context   (basically we are calling addnote function of news state ache se dekho, )
    refClose.current.click();
  }
  const change=(hagdiya)=>{  //jese jese title des ki value change hoti rhegi, wese wese state bhi update hoti rhegi, and as weclick submit, concated new array of note will be rendered
    setNote({...note,[hagdiya.target.name]:hagdiya.target.value})
  }





  return (
    <>
      <AddNote />
      {/* <!-- Button trigger modal -->// */}

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Your Notes
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* form */}
              <form className="container my-3">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1 my-3"></label>
                  <input
                    type="text"
                    className="form-control "
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    placeholder="New title"
                    value={note.etitle}
                    onChange={change}
                    required
                    minLength={3}
                  />
                  <label htmlFor="exampleInputEmail1 my-3"></label>
                  <input
                    type="text"
                    className="form-control my-3"
                    id="edescription"
                    name="edescription"
                    aria-describedby="emailHelp"
                    placeholder="Say Something About Your Notes"
                    value={note.edescription}
                    onChange={change}
                    required
                    minLength={8}
                  />
                  <label htmlFor="exampleInputEmail1 my-3"></label>
                  <input
                    type="text"
                    className="form-control "
                    id="etag"
                    name="etag"
                    aria-describedby="emailHelp"
                    placeholder="Enter tag"
                    value={note.etag}
                    onChange={change}
                    required
                  />
                  <label htmlFor="exampleInputEmail1 my-3"></label>

                  <small id="emailHelp" className="form-text text-muted my-3">
                    We'll never share your notes with anyone else.
                  </small>
                </div>

               
              </form>
            </div>
            <div className="modal-footer">
            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<3 || note.edescription.length<8} type="button" className="btn btn-primary" onClick={handleEdit}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3 ">
        <h2>Your Notes Here</h2>
        {notes.length===0 && <h3 className="text-center my-5">Start Creating Your First Note!!</h3>}  {/*jab else pe kuch nhi hota so we use && */}
          
        
        {notes.map((element) => {
          return (
            <NotesItem
              key={element._id}
              note={element}
              updatenotes={updatenotes}
            />
          );
        })}
      </div>
    </>
  );
};
//home khega ki beta notesmain apni cheeze do mjhe, toh notesmain khega ok mai context api se notes laata hu aur mere notes item ka use krne card bnaake bhejta hu

export default Notesmain;
