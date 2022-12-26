import { RouterProvider } from 'react-router-dom'
import { store } from '../stores'
import { Provider } from 'react-redux'
import router from '@app/router/Router'

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
