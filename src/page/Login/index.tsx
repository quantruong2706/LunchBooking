import { auth } from '@app/server/firebase'
import { useAppSelector } from '@app/stores/hook'
import { userStore } from '@app/stores/user'
import { useEffect } from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { FcGoogle } from 'react-icons/all'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Login() {
  const [signInWithGoogle, _user, loading] = useSignInWithGoogle(auth)
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAppSelector(userStore)
  const signIn = () => {
    signInWithGoogle()
  }
  useEffect(() => {
    if (user.uid) {
      navigate(location.state || '/')
    }
  }, [user, navigate, location])
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-secondary-color to-light-color h-screen">
        <div className="w-full max-w-xs space-y-8">
          <div>
            <img className="mx-auto h-56" src="/login-logo.png" alt="Your Company" />
          </div>
          <div className="text-center">
            <span className="text-white text-3xl">Happy Lunch</span>
          </div>
          <div>
            <button
              className="focus:outline-none focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 rounded-full w-full mt-10 bg-white text-primary-color"
              onClick={signIn}
              disabled={loading}
            >
              <span className="text-xl flex items-center justify-center gap-4">
                <FcGoogle size={36} />
                Sign in with Google
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
