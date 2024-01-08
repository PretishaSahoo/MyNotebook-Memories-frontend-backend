import React, { useContext, useState } from "react";
import NoteContext from "../Context/notes/NoteContext";

export default function AddNote(props) {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const buttonStyle = {
    background: '#FF6F61',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    border: 'none',
    outline: 'none',
  };

  const [note, setNote] = useState({ title: "", description: "", tag: "", image: "" });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        // Use event.target.result to get the base64 data
        setNote({ ...note, image: event.target.result });
      };
  
      reader.readAsDataURL(file);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
  
    // Check if note.image is not null or empty before attempting to split
    const imageBase64 = note.image && note.image.split(",")[1];
    addNote(note.title, note.description, note.tag, imageBase64);
    setNote({ title: "", description: "", tag: "", image: "" });
    const fileInput = document.getElementById("formFile");
    if (fileInput) {
      fileInput.value = "";
    }
    props.showAlert("Note added Successfully", "success");
  };

  return (
    <div className="container">
      <div className="container p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '10px', border: '1px solid #ccc' }}>
        <form>
          <h3 className="my-3">Add a Note</h3>

          <div className="mb-3 my-3 py-3">
            <label htmlFor="formFile" className="form-label">Add your photograph(within 50kb)</label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              onChange={handleImageChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Add Notes Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
              style={{ backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #555', color: '#555', fontFamily: 'Your Font Here' }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Add Notes Description</label>
            <input
              type="textarea"
              className="form-control"
              name="description"
              id="description"
              value={note.description}
              onChange={(e) => setNote({ ...note, description: e.target.value })}
              style={{ backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #555', color: '#555', fontFamily: 'Your Font Here' }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Add Tag</label>
            <input
              type="text"
              className="form-control"
              name="tag"
              id="tag"
              value={note.tag}
              onChange={(e) => setNote({ ...note, tag: e.target.value })}
              style={{ backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #555', color: '#555', fontFamily: 'Your Font Here' }}
            />
          </div>

          <button disabled={note.title.length < 3} type="submit" onClick={handleClick} className="btn btn-dark" style={buttonStyle}>
            Add note
          </button>
        </form>
      </div>
    </div>
  );
}
