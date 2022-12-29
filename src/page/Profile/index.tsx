/* eslint-disable jsx-a11y/label-has-associated-control */
import { auth } from '@app/server/firebase'
import { store } from '@app/stores'
import { useAppSelector } from '@app/stores/hook'
import { clearUser, userStore } from '@app/stores/user'
import LogoutIcon from '@mui/icons-material/Logout'
import ReplyIcon from '@mui/icons-material/Reply'
import { signOut } from 'firebase/auth'
import { Link } from 'react-router-dom'

const Profile = () => {
  const user = useAppSelector(userStore)
  console.log(user)
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
    <div className="bg-white">
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
        <span className="py-2 text-xl">{user.displayName}</span>
        <span className="text-md">{user.email}</span>
        <span className="pt-4 text-md">
          <span className="font-bold">Chủ chi</span>: 4 lần |<span className="font-bold"> Tham gia</span>: 4 lần
        </span>
      </div>
      {/*Details section*/}
      <div className="px-6 py-4">
        <div className="flex flex-col pb-4">
          <label htmlFor="" className="pb-1 font-bold text-gray-500">
            LDAP
          </label>
          <input type="text" placeholder="Example: ntphuc1" className="border-b-2" />
        </div>
        <div className="flex flex-col pb-4">
          <label htmlFor="" className="pb-1 font-bold text-gray-500">
            Mobile
          </label>
          <input type="number" placeholder="" className="border-b-2" />
        </div>
        <div className="flex flex-col pb-4">
          <label htmlFor="" className="pb-1 font-bold text-gray-500">
            Address
          </label>
          <input type="text" placeholder="Example: Cau Giay, Ha Noi" className="border-b-2" value={user.address} />
        </div>
        <div className="flex flex-col pb-4">
          <label htmlFor="" className="pb-1 font-bold text-gray-500">
            Bank
          </label>
          <input type="text" placeholder="" className="border-b-2" />
        </div>
        <div className="flex flex-col pb-4">
          <label htmlFor="" className="pb-1 font-bold text-gray-500">
            Account
          </label>
          <input type="text" placeholder="" className="border-b-2" />
        </div>
        <div className="flex flex-col items-center ">
          <label htmlFor="" className="pb-1 self-start font-bold text-gray-500">
            Account QR
          </label>
          <img src="src/assets/profile-picture.png" alt="QR code" className="h-64 w-6h-64" />
        </div>
      </div>
    </div>
  )
}

export default Profile
