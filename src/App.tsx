import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'

import Layout from './components/layout/Layout'
import Character from './pages/Character'
import { ProtectedRoute } from './components/layout/ProtectedRoute'
import Signup from './pages/Signup'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Calendar from './pages/Calendar'

import { ApiGuide } from './pages/ApiGuide'
import { Faq } from './pages/Faq'
import { RoomList } from './pages/RoomList'

import { GuildPromotion } from './pages/GuildPromotion'
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout hide>
        <Home />
      </Layout>
    )
  },
  {
    path: '/apiGuide',
    element: (
      <Layout hide>
        <ApiGuide />
      </Layout>
    )
  },
  {
    path: '/faq',
    element: (
      <Layout hide>
        <Faq />
      </Layout>
    )
  },
  {
    path: '/character',
    element: (
      <ProtectedRoute>
        <Layout>
          <Character />
        </Layout>
      </ProtectedRoute>
    )
  },
  {
    path: '/roomList',
    element: (
      <ProtectedRoute>
        <Layout>
          <RoomList />
        </Layout>
      </ProtectedRoute>
    )
  },
  {
    path: '/guildPromotion',
    element: (
      <ProtectedRoute>
        <Layout>
          <GuildPromotion />
        </Layout>
      </ProtectedRoute>
    )
  },
  {
    path: '/signup',
    element: (
      <ProtectedRoute>
        <Layout hide>
          <Signup />
        </Layout>
      </ProtectedRoute>
    )
  },
  {
    path: '/calendar',
    element: (
      <ProtectedRoute>
        <Layout>
          <Calendar />
        </Layout>
      </ProtectedRoute>
    )
  }
])

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
