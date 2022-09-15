import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'
import { Alertcontext } from '../context/notes/noteContext'
import {useNavigate} from "react-router-dom"

export default function Notes() {
    const navigate = useNavigate();
    const context = useContext(NoteContext)
    const alert = useContext(Alertcontext);
    const {setmode,changeState} = alert;
    const { notes, getNotes,editNote } = context
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
        }else{
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])
    const refClose = useRef(null);
    const ref = useRef(null);
    const [note,setNote] = useState({id:"",etitle:"",edescription:"",etag:""})

    const handleChange = (e) =>{
        e.preventDefault()
        //for setting input value inside the 
         setNote({...note,[e.target.name]:e.target.value})
        }
      //when we click on the save changes button  
    const addNotefun = (e) =>{
        refClose.current.click();
        editNote(note.id,note.etitle,note.edescription,note.etag)
       //console.log("updating the note: ",note);
       setmode(prevState=>{return{...prevState,message:"Note updated Succesfully",display: "block",type: "success"}})
       changeState();
    }

    const updateNote = (currentNote) => {
        //here we are using the useref that that our button click function transfer to this update note
        ref.current.click();
        setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
        
    }
    return (
        <>
            <div>
                {/* Button trigger modal
                for handling button click we are useref so thhat we can hide this button */}
                <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>
                {/* Modal */}
                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <form className='container my-3'>
                                    <div className="mb-3">
                                        <label htmlFor="inputTitle" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="inputTitle" name='etitle' value={note.etitle} onChange={handleChange} minLength="5" required></input>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="inputDesc" className="form-label">Description</label>
                                        <input type="text" name='edescription' value={note.edescription} onChange={handleChange} className="form-control" id="inputDesc" /* minLength={5} required will not work here *//>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="inputTag" className="form-label">Tag</label>
                                        <input type="text" contentEditable="true" name='etag' value={note.etag} onChange={handleChange} className="form-control" id="inputTag" />
                                    </div>
                                
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" onClick={addNotefun} className="btn btn-primary" disabled={note.etitle.length<5||note.etag.length<3||note.edescription.length<5}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <div className="container mx-2">
                {notes.length === 0 && `No notes to display`}
                </div>
                {notes.map((eachNote) => {
                    return (
                        <Noteitem key={eachNote._id} updateNote={updateNote} eachNote={eachNote} />
                    )
                })}
                
            </div>
        </>
    )
}
