import React from 'react'

import ProfilePicture from '../../assets/profile-picture.png'

const UserCard = () => {
  return (
    <div className="bg-white px-1 py-3 rounded-xl flex items-center gap-2">
      <img src={ProfilePicture} alt="User profile" className="w-14 h-14 rounded-full shadow-lg" />
      <div className="flex flex-col pr-1">
        <p>Username here</p>
        <p>
          <span>Chủ chi</span>: 4 lần |<span> Tham gia</span>: 4 lần
        </p>
      </div>
    </div>
  )
}

export default UserCard
