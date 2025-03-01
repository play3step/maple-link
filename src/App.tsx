import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Guild from './pages/Guild'
import Layout from './components/layout/Layout'
import Character from './pages/Character'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    )
  },
  {
    path: '/character',
    element: (
      <Layout>
        <Character />
      </Layout>
    )
  },
  {
    path: '/guild',
    element: (
      <Layout>
        <Guild />
      </Layout>
    )
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
