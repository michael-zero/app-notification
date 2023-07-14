import "./navbar.css"
import Image from "next/image"
import React from 'react'
import Notification from '../../../public/notification.svg'
import Message from '../../../public/message.svg'
import Settings from '../../../public/settings.svg'

const Navbar = ({socket}) => {

  const [notifications, setNotications] = React.useState([])
  const [open, setOpen] = React.useState(false)
  
  React.useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotications( prev => [...prev, data])
    })
  }, [socket])

  const displayNotifications = ({senderName, type}, key) => {
    let action; 

    if(type === 1){
      action = "liked"
    }else if(type === 2){
      action = "commented"
    }else{
      action = "shared"
    }

    return <span key={key} className="notification">{`${senderName} ${action} your post`}</span>
  }

  const handleRead = () => {
    setNotications(false)
    setOpen(false)
  }

  return (
    <div className='navbar'>
      <span className="logo">Zero App</span>
      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          <Image src={Notification} alt="Image"className="iconImg" width={20} height={20} />
          { notifications.length > 0 &&
            <div className="counter">{notifications.length}</div>
          }
        </div>
        <div className="icon" onClick={() => setOpen(!open)} >
          <Image src={Message} alt="Image"className="iconImg" width={20} height={20} />
          {/* <div className="counter">2</div> */}
        </div>
        <div className="icon" onClick={() => setOpen(!open)}>
          <Image src={Settings} alt="Image"className="iconImg" width={20} height={20} />
          {/* <div className="counter">2</div> */}
        </div>
      </div>
      {/* notifications */}
      {open && <div className="notifications">
        {
          notifications.map((not, index) => displayNotifications(not, index))
        }
        <button className="nButton" onClick={handleRead}>Mark as read</button>

      </div>}
    </div>
  )
}

export default Navbar