import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.etherscan.io/api',
  // Use a long timeout, this api takes forever sometimes
  timeout: 20000,
  params: {
    'module': 'account',
    'apiKey': '1BVMX4MYAQGU6KYIKEC9N35QXGM4MJFCJQ'
  }
})

export default instance
