import React from 'react'
import { useAppSelector } from '@app/stores/hook'
import { clearUser, userStore } from '@app/stores/user'
import { signOut } from 'firebase/auth'
import { auth } from '@app/server/firebase'
import { store } from '@app/stores'
import ReplyIcon from '@mui/icons-material/Reply'

const Profile = () => {
  const user = useAppSelector(userStore)
  const logout = async () => {
    try {
      await signOut(auth).then(() => {
        store.dispatch(clearUser())
      })
    } catch (error) {
      console.log('ERROR LOGGING OUT', error)
    }
  }

  return (
    <div className='bg-white'>
      {/*Header section*/}
      <div
        className='bg-gradient-to-b from-[#CAF5B1] to-[#8AD769] to-green-300 h-72 rounded-b-2xl flex flex-col items-center justify-center'>
        <button className='self-start px-4' onClick={logout}><ReplyIcon fontSize={'large'} /></button>
        <img src='/src/assets/profile-picture.png' alt='' referrerPolicy='no-referrer' className='rounded-full w-28' />
        <span className='py-2 text-xl'>{user.displayName}</span>
        <span className='text-md'>randomemail@cmcglobal.vn</span>
        <span className='pt-4 text-md'>
          <span className='font-bold'>Chủ chi</span>: 4 lần |
          <span className='font-bold'> Tham gia</span>: 4 lần
        </span>
      </div>
      {/*Details section*/}
      <div className='px-6 py-4'>
        <div className='flex flex-col pb-4'>
          <label htmlFor='' className='pb-1 font-bold text-gray-500'>LDAP</label>
          <input type='text' placeholder='Example: ntphuc1' className='border-b-2' />
        </div>
        <div className='flex flex-col pb-4'>
          <label htmlFor='' className='pb-1 font-bold text-gray-500'>Mobile</label>
          <input type='number' placeholder='' className='border-b-2' />
        </div>
        <div className='flex flex-col pb-4'>
          <label htmlFor='' className='pb-1 font-bold text-gray-500'>Address</label>
          <input type='text' placeholder='Example: Cau Giay, Ha Noi' className='border-b-2' />
        </div>
        <div className='flex flex-col pb-4'>
          <label htmlFor='' className='pb-1 font-bold text-gray-500'>Bank</label>
          <input type='text' placeholder='' className='border-b-2' />
        </div>
        <div className='flex flex-col pb-4'>
          <label htmlFor='' className='pb-1 font-bold text-gray-500'>Account</label>
          <input type='text' placeholder='' className='border-b-2' />
        </div>
        <div className='flex flex-col items-center '>
          <label htmlFor='' className='pb-1 self-start font-bold text-gray-500'>Account QR</label>
          <img src='src/assets/profile-picture.png' alt='QR code image'
               className='h-60 h-60' />
        </div>
      </div>
    </div>
  )
}

export default Profile