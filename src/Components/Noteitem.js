import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'

export default function Noteitem(props) {
    const contxt = useContext(noteContext);
    const {deletNote} = contxt
    const { eachNote,updateNote } = props
    return (
        <div key={eachNote._id} className='col-md-3'>
            <div className="card my-3" >
                <div className="card-body">
                    <h5 className="card-title">{eachNote.title}</h5>
                    <p className="card-text">{eachNote.description}</p>
                    <i className="fa-solid fa-trash-can mx-2" onClick={()=>deletNote(eachNote._id)}></i>
                    <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>updateNote(eachNote)}></i>
                </div>
            </div>
        </div>
    )
}
