import React from 'react'
import Image from 'next/image'
import "./card.css"
import Heart from '../../../public/heart.svg'
import HeartFilled from '../../../public/heartFilled.svg'
import Share from '../../../public/share.svg'
import Info from '../../../public/info.svg'
import Comment from '../../../public/comment.svg'

import Post1 from '../../../public/post-1.jpeg'
import Post2 from '../../../public/post-2.jpeg'
import User1 from '../../../public/user-1.jpeg'
import User2 from '../../../public/user-2.jpeg'

const Card = ({post, socket, user}) => {
  const [liked, setLiked] = React.useState(false)
  
  const handleNotification = (type) => {
    type === 1 && setLiked(true);
    socket.emit("sendNotification", {
      senderName: user,
      receiverName: post.username, 
      type
    })
  }
  
  return (
    <div>
      <div className="info">
        <Image src={post?.id === 0 ? User1 : User2} className='userImg'  alt="User"  width={30} height={30}/>
        <span>{post?.fullname}</span>
      </div>
      <Image src={post?.id === 0 ? Post1 : Post2} className='postImg'  width={490} height={200} alt='Post' />
      <div className="interaction">
        {
          liked ? (<Image className='cardIcon' alt='Heart' src={HeartFilled}/>) : (
            <Image className='cardIcon' onClick={() => handleNotification(1)} alt='Heart' src={Heart}/>
          )
        }
        <Image className='cardIcon' alt='Comment' src={Comment} onClick={() => handleNotification(2)}/>
        <Image className='cardIcon' alt='Share' src={Share} onClick={() => handleNotification(3)}/>
        <Image className='cardIcon infoIcon' alt='Info' src={Info}/>
      </div>
    </div>
  )
}

export default Card