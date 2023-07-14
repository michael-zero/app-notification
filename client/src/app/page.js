"use client"
import React from 'react'
import './page.css'
import Navbar from '@/components/navbar/Navbar'
import Card from '@/components/card/Card'
import {posts} from '../data'
import { io } from 'socket.io-client'
const SOCKET = io("http://localhost:5000", {transports: ['websocket']})

export default function Home() {
  const [user, setUser] = React.useState("")
  const [username, setUsername] = React.useState("")
  const [socket, setSocket] = React.useState(null)

  React.useEffect(() => {
    // console.log(SOCKET)
    setSocket(SOCKET)
  }, [])

  React.useEffect(() => {
    socket?.emit("newUser", user)
  }, [socket, user])

  return (
    <div className="container">
      {user ? <>
        <Navbar socket={socket}/>
        {
          posts.map((post, index) => {
            return <Card key={index} post={post} socket={socket} user={user}/>
          })
        }
       
        <span className="username">{user}</span>
      </> : (
          <div className="login">
          <input type="text" placeholder='username' onChange={(e) => setUsername(e.target.value)}/>
          <button onClick={() => setUser(username)}>Login</button>
        </div>    
      )}
      
    </div> 
  )
}
