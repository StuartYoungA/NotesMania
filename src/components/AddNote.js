import React, { useContext, useState, useRef } from "react";
import noteContext from "../Context/Notes/noteContext";
import NotesItem from "./NotesItem";
export default function AddNote() {
  const AddedNotes = useContext(noteContext);
  const { AddNotes } = AddedNotes;
  //   console.log(x);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleAdd = (e) => {
    //this will trigger after login is hit
    e.preventDefault(); //taaki page reload na ho submit krne pe
    AddNotes(note.title, note.description, note.tag); //this will concat new note inside newsstate context   (basically we are calling addnote function of news state ache se dekho, )

    setNote({ title: "", description: "", tag: "" }); //add krne ke baad boxes ko khaali krdo
  };
  const change = (hagdiya) => {
    //jese jese title des ki value change hoti rhegi, wese wese state bhi update hoti rhegi, and as weclick submit, concated new array of note will be rendered
    setNote({ ...note, [hagdiya.target.name]: hagdiya.target.value });
  };

  ///below lines are for details of user from modal
  const [detail, setDetail] = useState({ name: "", email: "", date: "" });
  const detailsref = useRef(null);

  const host = "http://localhost:4000";

  const handleprofile = async (e) => {
    //this for seeing details
    e.preventDefault();
    const url = `${host}/api/auth/getuser`;
    const response = await fetch(url, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    if (!response.ok) {
      return alert("Not able to fetch details"); // Handle non-successful response
    }
    const details = await response.json(); // parses JSON response into native JavaScript objects
    console.log(details);
    setDetail({ name: details.name, email: details.email, date: details.date });
    detailsref.current.click(); //modal opens
  };

  //isot o gmt converter
  const convert = (d) => {
    const date2 = new Date(d.slice(0, -1));
    return date2;
  };
  return (
    <>
      <div className="container my-3">
        <h1 style={{ display: "inline" }}>Add Note</h1>

        <i
          onClick={handleprofile}
          className="fa-solid fa-user fa-4x "
          style={{ marginLeft: "1057px", display: "inline-block" }}
        ></i>
        <form className="container my-3">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1 my-3"></label>
            <input
              type="text"
              className="form-control "
              id="title"
              name="title"
              aria-describedby="emailHelp"
              value={note.title}
              placeholder="Enter title"
              onChange={change}
              required
              minLength={3}
            />
            <label htmlFor="exampleInputEmail1 my-3"></label>
            <input
              type="text"
              className="form-control my-3"
              id="description"
              name="description"
              aria-describedby="emailHelp"
              value={note.description} //for making boxes empty after adding by use of setnotes
              placeholder="Say Something About Your Notes"
              onChange={change}
              required
              minLength={8}
            />
            <label htmlFor="exampleInputEmail1 my-3"></label>
            <input
              type="text"
              className="form-control "
              id="tag"
              name="tag"
              aria-describedby="emailHelp"
              value={note.tag}
              placeholder="Enter tag"
              onChange={change}
              required
            />
            <label htmlFor="exampleInputEmail1 my-3"></label>

            <small id="emailHelp" className="form-text text-muted my-3">
              We'll never share your notes with anyone else.
            </small>
          </div>

          <button
            disabled={note.title.length < 3 || note.description.length < 8}
            type="submit"
            className="btn btn-primary my-3"
            onClick={handleAdd}
          >
            Submit
          </button>
        </form>
      </div>

      {/* modal for details  */}
      {/* <!-- Button trigger modal --> */}
      <button
       ref={detailsref}
        type="button"
        class="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      ></button>

      {/* <!-- Modal -->/ */}
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        // role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Your Details
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
              <div className="container mt-5">
                <h1>{detail.name}</h1>

                <h2>{detail.email}</h2>
              </div>

              {/* <!-- Footer --> */}
              <footer className="footer mt-auto py-3 bg-light">
                <div className="container text-center">
                  <span className="text-muted">
                    Created on: {convert(detail.date).toString()}
                  </span>
                </div>
              </footer>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
