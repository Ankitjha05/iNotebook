import React,{useContext,useState} from 'react'
import noteContext from '../context/notes/noteContext'
import { Alertcontext } from '../context/notes/noteContext';

export default function Addnote() {
    const context = useContext(noteContext);
    const alert = useContext(Alertcontext);
    const {setmode,changeState} = alert //setmode is useState in Alert component 
    const {addNote} = context

    const [note, setNote] = useState({title:"", description:"", tag: ""});
    const addNotefun = (e) =>{
        e.preventDefault();
        addNote(note.title,note.description, note.tag)
        setNote({title:"", description:"", tag: ""})
        setmode(prevState=>{return{...prevState,message:"Note Added Succesfully",display: "block",type: "success"}})
        //we have to again display block change state changes display to none
        changeState();
    }
    const handleChnage = (e) =>{
        setNote({...note,[e.target.name]:e.target.value})
    }

  return (
    <div>
      <form className='container my-3'>
          <div className="mb-3">
            <label htmlFor="inputTitle" className="form-label">Title</label>
            <input type="text" className="form-control" id="inputTitle" name='title' onChange={handleChnage} value={note.title}/* minLength='5' required this will not work here so we have to disabled button */  />
          </div>
          <div className="mb-3">
            <label htmlFor="inputDesc" className="form-label">Description</label>
            <input type="text" name='description' onChange={handleChnage} className="form-control" id="inputDesc" value={note.description}/* minLength='5' required this will not work here */ />
          </div>
          <div className="mb-3">
            <label htmlFor="inputTag" className="form-label">Tag</label>
            <input type="text" name='tag' onChange={handleChnage} className="form-control" id="inputTag" value={note.tag} />
          </div>
          <button disabled={note.title.length<5||note.tag.length<3||note.description.length<5} type="submit" className="btn btn-primary" onClick={addNotefun}>Add Note</button>
        </form>
    </div>
  )
}
