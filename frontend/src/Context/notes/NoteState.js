import{ React , useState }from 'react'
import NoteContext from "./NoteContext";

const NoteState =(props)=>{

    const [notes,setNotes]=useState([])

    const host="http://localhost:5000"

    //Get all Notes
    const getNotes=async()=>{
        
      const url=`${host}/api/notes/fetchallnotes`

      const response=await fetch(url,{
        method:'GET',
        headers:{
          'content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        }
      })
      const json= await response.json();

      setNotes(json)
    }
    


    
    //Add a Note
    const addNote=async(title,description,tag,image)=>{
        
      const url=`${host}/api/notes/addNote`

      const response=await fetch(url,{
        method:'POST',
        headers:{
          'content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,tag,image})
      })
      const json= await response.json();

        const note={
          "_id": json._id,
          "user": json.user,
          "title": json.title,
          "description": json.description,
          "tag": json.tag,
          "date": json.date,
          "__v": json.__v,
          "image":json.image
          };
        setNotes(notes.concat(note))
    }




    //Delete a Note
    const deleteNote=async (id)=>{

      const url=`${host}/api/notes/deletenote/${id}`

      const response=await fetch(url,{
        method:'DELETE',
        headers:{
          'content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        }
      })
      const json= await response.json();

      const newNotes=notes.filter((note)=>{return note._id!==json.note._id})
      
      setNotes(newNotes);
    }




    //Edit a Note
    const editNote =async (id, title,description,tag,image)=>{
      
      const url=`${host}/api/notes/updatenote/${id}`

      const response=await fetch(url,{
        method:'PUT',
        headers:{
          'content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,tag,image})
      })
      const json=await response.json();

    
      //logic to edit in client
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if(element._id===json._id){
          element.title=title;
          element.description=description
          element.tag=tag;
          element.image=image;
        }
      }

    }

    

    return (
    <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;