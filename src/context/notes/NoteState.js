import React,{useState,useContext} from "react";
import NoteContext from "./noteContext";
import { Alertcontext } from "./noteContext";
const NoteState = (props) => {
  const alert = useContext(Alertcontext);
  const {setmode,changeState} = alert
    const host= "http://localhost:5000"
    const notesInitial = []
      //GET all note
      const getNotes = async() =>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem('token')
            },
           
          });
          const json = await response.json();
          setNotes(json)
      }

      //Add a note
      const addNote = async(title,description,tag) =>{
        //API call
        const response = await fetch(`${host}/api/notes/addNote`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
          });
          const note = await response.json();
          //push will add into the array concat will give new array
          setNotes(notes.concat(note))
      }
      
      //delete a note
      const deletNote = async (id) => {
        // API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          },
        });
         const json = await response.json();
         console.log(json);
         setmode(prevState=>{
          return{
            ...prevState,message:"Message Deleted Succesfully",display: "block"
          }
         })
         changeState()
        const newNote = notes.filter((notes)=>{return id !== notes._id})
        setNotes(newNote)
      }

      //edit a note
      const editNote = async(id,title,description,tag)=>{
        // API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
          });
          const json = await response.json();
          console.log(json);
        //login to edit in client
        //we can't change directly value of variable notes that's y we used JSON method
        let newNote = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if(element._id === id){
                newNote[index].title = title
                newNote[index].description = description
                newNote[index].tag = tag
                break;
            } 
        }
        setNotes(newNote);
      }
      const [notes, setNotes] = useState(notesInitial);
    return(
        <NoteContext.Provider value={{notes,setNotes,addNote,deletNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState
/* const [state, setstate] = useState(s1);
const update = () =>{
    setTimeout(()=>{
        setstate({
            "name": "Ankit Jha",
            "class" : "Newton School"
        })
    },3000)
} */