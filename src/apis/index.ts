import axios from 'axios'
import { useAuthStore } from '../store/authStore'
export const API_KEY = import.meta.env.VITE_TEST_URL
export const Nexon_KEY = import.meta.env.VITE_SERVER_URL
export const Nexon = 'https://open.api.nexon.com'

const DEFAULT_TIMEOUT = 30000

export const basicApi = axios.create({
  baseURL: API_KEY,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: `Bearer ${useAuthStore.getState().token}`
  }
})

export const nexonApi = axios.create({
  baseURL: Nexon,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    'x-nxopen-api-key': Nexon_KEY,
    'Content-Type': 'application/json;charset=utf-8'
  }
})
