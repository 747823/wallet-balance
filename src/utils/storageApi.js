import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://wallet-balances-69d28.firebaseio.com/',
  timeout: 30000
})

export default instance
