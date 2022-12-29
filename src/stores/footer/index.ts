import { PAGES } from '@app/contants'
import { IFooter } from '@app/libs/types'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'


const initialState: IFooter = {
  currentPage: PAGES.HOME,
}

const footerSlice = createSlice({
  name: 'footer',
  initialState,
  reducers: {
    setCurrentPage: (state, action: { payload: string }) => {
      state.currentPage = action.payload
    },
  },
})

export const { setCurrentPage } = footerSlice.actions
export const currentPageStore = (state: RootState) => state.footer.currentPage
export default footerSlice.reducer
