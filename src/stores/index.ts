import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import footerReducer from '../stores/footer'
import * as eventStore from './events'
import * as userStore from './user'

// ...

export const store = configureStore({
  reducer: {
    [userStore.namespace]: userStore.reducer,
    [eventStore.namespace]: eventStore.reducer,
    footer: footerReducer,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
