import { auth } from '@app/server/firebase'
import { useAppSelector } from '@app/stores/hook'
import { userStore } from '@app/stores/user'
import { useEffect } from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [signInWithGoogle, _user, loading, error] = useSignInWithGoogle(auth)
  const navigate = useNavigate()
  const user = useAppSelector(userStore)
  const signIn = () => {
    signInWithGoogle()
  }
  useEffect(() => {
    if (user.uid) {
      navigate('/')
    }
  }, [user, navigate])
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-primary-color to-green-500 h-screen">
        <div className="w-full max-w-sm space-y-8">
          <div>
            <img className="mx-auto h-12 w-auto" src="/login-logo.png" alt="Your Company" />
          </div>
          <div className="mt-8 space-y-6">
            <button
              className="focus:outline-none focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 rounded-full w-full mt-10 bg-white text-primary-color"
              onClick={signIn}
            >
              <span className="text-xl">
                <i className="fa-brands fa-google"></i> Continue with Google
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
