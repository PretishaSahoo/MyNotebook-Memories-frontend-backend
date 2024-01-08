import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteItem from "./NoteItem.js"
import AddNote from './AddNote.js';
import NoteContext from "../Context/notes/NoteContext"

export default function Notes(props) {
  const navigate = useNavigate();
  const { notes, getNotes } = useContext(NoteContext);

  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      getNotes();
    } else {
      navigate('/', { replace: true });
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getNotes, navigate]);



  return (
    <>
    <div className="container d-flex" style={{minWidth:'95vw'} }>

      <div className="row my-1 flex-grow-1"  >
  
        {Array.isArray(notes) && notes.length === 0 && <div className="container">No notes to display</div>}
        {Array.isArray(notes) && notes.map((note) => {
          return <NoteItem key={note._id} note={note} showAlert={props.showAlert} />;
        })}
      </div>

      <div className="ms-auto p-2 " style={{minWidth:'35vw',height:'100vh'}}>
        <AddNote showAlert={props.showAlert} />
      </div>
      
    </div>
    </>
  );
}
