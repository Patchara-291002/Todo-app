import './App.css'
import React from 'react'
import Theme from './componant/Theme'
import Todolist from './componant/Todolist'

function App() {
  return (
    <>
      <div className='bg-base-300 overflow-hidden'>
        <Theme/>
        <Todolist/>
      </div>
    </>
  )
}

export default App
