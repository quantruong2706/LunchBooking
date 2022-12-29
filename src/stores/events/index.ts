import { User } from '@app/server/firebaseType'
import { RootState } from '@app/stores'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export const namespace = 'List_user'
const initialState: { selectedListMember: User[] } = {
  selectedListMember: [],
}

const slice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    setListUser: (state, action: PayloadAction<User[]>) => {
      state.selectedListMember = action.payload
    },
  },
})

export const { setListUser } = slice.actions
export const selectedListMemberStore = (state: RootState) => state[namespace]
export const reducer = slice.reducer
