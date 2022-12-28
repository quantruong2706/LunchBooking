import React, { Suspense } from 'react'
import { CircularProgress } from '@mui/material'

interface AppSuspenseProps {
  children: React.ReactElement
}

export const LoadingScreen = () => {
  return (
    <div className='text-center h-screen flex justify-center items-center'>
      <CircularProgress color='success' />
    </div>
  )
}


const AppSuspense: React.FC<AppSuspenseProps> = ({ children }) => {
  return <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
}

export default AppSuspense
