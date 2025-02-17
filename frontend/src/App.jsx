import React, { useEffect, useState } from 'react'
import io from "socket.io-client"
const socket =  io.connect("http://localhost:4000")
const App=()=>{
  const [message,setmessage]=useState('')
  const [rm,setRm]=useState('')
  const sendMessage=()=>{
    socket.emit('get_notifications',message)
  }
useEffect(()=>{
  socket.on("task",(data)=>{
    // setRm(data.assignedTo)
    console.log("hello",data)
  })
},[socket])
  return (
    <div>
      <input placeholder='message' 
        onChange={(e) => setmessage(e.target.value)} ></input>
      <button onClick={sendMessage}>send</button>
      <h1 className='text-5xl'>{rm}</h1>
    </div>
  )
}
export default App;