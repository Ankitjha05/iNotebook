import React, { useState,useEffect } from 'react'
import { Alertcontext } from '../context/notes/noteContext';



export default function Alert(props) {
  //capitalise first letter isko alert function ke andar bhi dal sakte hai
  const capitalise = (string) => {

    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [mode, setmode] = useState({ message: "Alert", type: "success", display: "block" });
  const changeState = ()=>{
    setTimeout(() => {
      setmode(prev=>{
        return{
          ...prev,display:"none"
        }
      })
    }, 2000);
  }
  useEffect(()=>{
    setmode(prev=>{
      return{
        ...prev,display:"none"
      }
    })
  },[])
  return (
    <Alertcontext.Provider value={{ setmode,changeState }}>
      <div className={`alert alert-${mode.type} alert-dismissible fade show my-1`} style={{ display: mode.display }} role="alert">
        <strong>{capitalise(mode.type)==="Danger"?"Error":"Success"}: </strong> {mode.message}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
      </div>
      {props.children}
    </Alertcontext.Provider>
  )
}





/* {/* <div className="alert alert-warning d-flex align-items-center" style={{height:"10px"}} role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" style={{height:"18px"}} className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
        <div>
          {props.message}
        </div>
      </div>  */