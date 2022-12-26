import { IUser } from '@app/libs/types'
import { RootState } from '@app/stores'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export const namespace = 'USER'
const initialState: IUser = {
  uid: '',
  email: '',
  displayName: '',
  photoURL: '',
}

const slice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => action.payload,
    clearUser: () => initialState,
  },
})

export const { setUser, clearUser } = slice.actions
export const userStore = (state: RootState) => state[namespace]
export const reducer = slice.reducer
