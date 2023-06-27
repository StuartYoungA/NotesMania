import React,{useContext} from 'react'
// import Alert from './Alert'
import noteContext from "../Context/Notes/noteContext";
const NotesItem=(props)=> {
  const{note,updatenotes}=props
  const Notes=useContext(noteContext)
  const{DeleteNotes}=Notes   //here we only want to use deletenotes fuction from contexts
  
  return (
    <>
      <div className="col-md-3 my-2">
          <div className="card ">
            <div className="card-body">
              <h5 className="card-title">{note.title}</h5>
              <p className="card-text">
                {note.description}
              </p>
              <i className="fa-solid fa-trash fa-shake mx-3" onClick= {()=>{DeleteNotes(note._id)}}></i>
              <i className="fa-solid fa-pen-to-square fa-fade mx-3" onClick={()=>{updatenotes(note)}} ></i>
              
            </div>
          </div>
        </div>
    </>
  )
}
export default NotesItem