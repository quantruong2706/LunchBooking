/* eslint-disable jsx-a11y/label-has-associated-control */
import { auth, db } from '@app/server/firebase'
import { User } from '@app/server/firebaseType'
import { UserDetail } from '@app/server/useDB'
import { store } from '@app/stores'
import { useAppSelector } from '@app/stores/hook'
import { clearUser, userStore } from '@app/stores/user'
import LogoutIcon from '@mui/icons-material/Logout'
import ReplyIcon from '@mui/icons-material/Reply'
import { signOut } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const Profile = () => {
  const user = useAppSelector(userStore)

  const [userData, setUserData] = useState<User>({})
  const [edit, setEdit] = useState(false)

  const ldapAccField = useRef()
  const phoneField = useRef()
  const addressField = useRef()
  const bankNameField = useRef()
  const bankAccountField = useRef()

  useEffect(() => {
    if (user.uid) {
      getDoc(UserDetail(user.uid)).then((res) => {
        setUserData(res.data()!)
      })
    }
  }, [user.uid, ldapAccField.current?.value])

  const handleClickEdit = () => {
    setEdit(!edit)
  }

  const handleUpdateItem = async () => {
    const infoItemRef = doc(db, 'Users', user.uid)
    await updateDoc(infoItemRef, {
      ldapAcc: ldapAccField.current?.value,
      phone: phoneField.current?.value,
      address: addressField.current?.value,
      bankName: bankNameField.current?.value,
      bankAccount: bankAccountField.current?.value,
    })
  }

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
    <div className="bg-white h-screen">
      {/*Header section*/}
      <div className="bg-gradient-to-b from-[#CAF5B1] to-[#8AD769] h-72 rounded-b-2xl flex flex-col items-center justify-center">
        <div className="flex justify-between pb-2 self-stretch">
          <button className="px-4">
            <Link to="/">
              <ReplyIcon fontSize={'large'} />
            </Link>
          </button>
          <button className="px-4" onClick={logout}>
            <LogoutIcon fontSize={'large'} />
          </button>
        </div>
        <img src="/src/assets/profile-picture.png" alt="" referrerPolicy="no-referrer" className="rounded-full w-28" />
        <span className="py-2 text-xl">{userData?.name || ''}</span>
        <span className="text-md">{userData?.email || ''}</span>
        <span className="pt-2 text-md">
          <span className="font-bellota">Chủ chi</span>: <span className="font-bold">4 lần</span> |<span className="font-bellota"> Tham gia</span>:{' '}
          <span className="font-bold">4 lần</span>
        </span>
      </div>

      {/*Details section*/}
      <div className="px-6 py-4">
        <div className="flex flex-col pb-2">
          <label htmlFor="" className="pb-1 font-bold text-gray-500">
            LDAP
          </label>
          {edit ? <TextField variant={'standard'} defaultValue={userData?.ldapAcc} inputRef={ldapAccField} /> : <p>{userData?.ldapAcc}</p>}
        </div>
        <div className="flex flex-col pb-2">
          <label htmlFor="" className="pb-1 font-bold text-gray-500">
            Mobile
          </label>
          {edit ? <TextField variant={'standard'} defaultValue={userData?.phone} inputRef={phoneField} /> : <p>{userData?.phone}</p>}
        </div>
        <div className="flex flex-col pb-2">
          <label htmlFor="" className="pb-1 font-bold text-gray-500">
            Address
          </label>
          {edit ? <TextField variant={'standard'} defaultValue={userData?.address} inputRef={addressField} /> : <p>{userData?.address}</p>}
        </div>
        <div className="flex flex-col pb-2">
          <label htmlFor="" className="pb-1 font-bold text-gray-500">
            Bank
          </label>
          {edit ? <TextField variant={'standard'} defaultValue={userData?.bankName} inputRef={bankNameField} /> : <p>{userData?.bankName}</p>}
        </div>
        <div className="flex flex-col pb-2">
          <label htmlFor="" className="pb-1 font-bold text-gray-500">
            Account
          </label>
          {edit ? <TextField variant={'standard'} defaultValue={userData?.bankAccount} inputRef={bankAccountField} /> : <p>{userData?.bankAccount}</p>}
        </div>
        <div className="flex flex-col items-center ">
          <label htmlFor="" className="self-start font-bold text-gray-500">
            Account QR
          </label>
          <img src="src/assets/profile-picture.png" alt="QR code" className="h-48 w-48" />
          <button onClick={handleClickEdit}>
            {edit ? (
              <div onClick={handleUpdateItem} className="flex gap-2 bg-green-400 rounded-full px-4 py-2">
                <CheckCircleIcon />
                <span>Save</span>
              </div>
            ) : (
              <div className="flex gap-2 bg-green-400 rounded-full px-4 py-2">
                <EditIcon />
                <span>Edit</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
