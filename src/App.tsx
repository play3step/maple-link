import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Guild from './pages/Guild'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/guild',
    element: <Guild />
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
