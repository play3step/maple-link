import axios from 'axios'
import { getToken } from '../store/authStore'
export const API_KEY = import.meta.env.VITE_TEST_URL
const DEFAULT_TIMEOUT = 30000

const basicApi = axios.create({
  baseURL: API_KEY,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: getToken() ? getToken() : ''
  }
})

export default basicApi
