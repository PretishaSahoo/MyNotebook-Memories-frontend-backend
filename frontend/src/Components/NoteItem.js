import React, { useState, useContext, useEffect } from 'react';
import NoteContext from "../Context/notes/NoteContext";

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote, editNote, getNotes } = context;
  const { note } = props;

  const [showModal, setShowModal] = useState(false);

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

  const [imageSrc, setImageSrc] = useState("");

  const [formData, setFormData] = useState({
    title: note.title,
    description: note.description,
    tag: note.tag,
    image: imageSrc,
  });

  useEffect(() => {
    // Convert base64 string to data URL
    if (note.image) {
      setImageSrc(`data:image/png;base64,${note.image}`);
    }
  }, [note.image]);

  const handleDelete = () => {
    deleteNote(note._id);
    props.showAlert("Note deleted successfully", "success");
  };

  const handleEdit = () => {
    setFormData({
      title: note.title,
      description: note.description,
      tag: note.tag,
      image: imageSrc,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: event.target.result,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (note._id) {
      // Assuming formData.image holds the base64-encoded image data
      const imageBase64 = formData.image && formData.image.split(",")[1];
  
      await editNote(
        note._id,
        formData.title,
        formData.description,
        formData.tag,
        imageBase64
      );
      handleCloseModal();
      getNotes(); // Fetch notes after updating
      props.showAlert("Your Note Updated Successfully!", "success");
    } else {
      console.error("Note _id is undefined");
    }
  };
  

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="col-md-5 my-2">
      <div className="card">
        <div className="card-body">
          <img src={imageSrc} className="card-img-top" alt="Image is here" />
          <h5 className="card-title">{note.title}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">{note.tag}</h6>
          <p className="card-text">{note.description}</p>
          <i className="fa-solid fa-trash-can mx-2" onClick={handleDelete}></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={handleEdit}></i>
        </div>
      </div>

      {showModal && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit your note</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3 my-3 py-3">
                    <label htmlFor="formFile" className="form-label">Add your photograph (within 50kb)</label>
                    <input className="form-control" type="file" id="formFile" onChange={handleImageChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Add Notes Title</label>
                    <input type="text" className="form-control" name="title" value={formData.title} onChange={handleInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Add Notes Description</label>
                    <textarea className="form-control" name="description" value={formData.description} onChange={handleInputChange}></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Add Tag</label>
                    <input type="text" className="form-control" name="tag" value={formData.tag} onChange={handleInputChange} />
                  </div>
                  <button disabled={note.title.length < 3} type="button" onClick={handleClick} className="btn btn-dark" style={buttonStyle}>
                    Update note
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteItem;
