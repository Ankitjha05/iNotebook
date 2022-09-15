import React from 'react'
import Addnote from './Addnote'
import Notes from './Notes'
const Home = () => {
  return (
    <>
      <div className="container my-3">
        <h1>Add a note</h1>
        <Addnote/>
      </div>
      <div className="container my-3">
        <h1>Your notes</h1>
      </div>
      <Notes/>
    </>
  )
}

export default Home
