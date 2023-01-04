import { getListUser } from '@app/libs/api/EventApi'
import React, { useEffect, useState } from 'react'
import { User } from '@app/server/firebaseType'
import ProfilePicture from '@app/assets/profile-picture.png'

const Members = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    getListUser().then((r) => {
      setUsers(r)
    })
  }, [])

  const membersList = users.map((user) => (
    <div className="bg-white px-1 py-3 rounded-xl flex items-center gap-2">
      <img src={ProfilePicture} alt="User profile" className="w-14 h-14 rounded-full shadow-lg" />
      <div className="flex flex-col pr-1">
        <p>{user.name}</p>
        <p>
          <span>Chủ chi</span>: 4 lần |<span> Tham gia</span>: 4 lần
        </p>
      </div>
    </div>
  ))

  return (
    <div className="flex flex-col items-center pt-6 pb-12">
      <h1 className="font-bellota text-center text-3xl pb-4">Thành viên</h1>
      <input type="text" className="rounded-full max-w-xs px-6 py-2.5 min-w-[300px] md:min-w-[600px]" placeholder="Search" />
      <div className="pt-6 flex flex-col gap-4">{membersList}</div>
    </div>
  )
}

export default Members
