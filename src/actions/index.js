import { etherscanApi, storageApi } from 'utils'

// Add and store a new wallet
const addWallet = address => async dispatch => {
  // May or may not use this, but it's nice to have in case we want to add a loading state etc.
  dispatch({ type: 'ADD_WALLET', payload: { address } })

  try {
    // In the real world we'd probably want to put all of these requests
    // to etherscan and our storage behind our own API endpoint
    // Leaving that out of this app for the sake of simplicity

    // TODO: abort action if message from balance call was not OK. (e.g. invalid eth address)
    const balance = await etherscanApi.get(`/?action=balance&address=${address}`)
    const txlist = await etherscanApi.get(`/?action=txlist&address=${address}`)

    // We can skip keeping txes in each wallet for now, since we're lumping them together
    const wallet = { address, balance: balance.data.result }
    await storageApi.patch(`/wallets/${address}.json`, wallet)

    const txobject = {}
    txlist.data.result.forEach(tx => { txobject[tx.hash] = tx })
    await storageApi.patch('/transactions.json', txobject)

    dispatch({ type: 'ADD_TXES', payload: txlist.data.result })
    dispatch({ type: 'ADD_WALLET_COMPLETE', payload: wallet })
    dispatch({ type: 'UPDATE_BALANCE' })
  } catch (error) {
    dispatch({ type: 'ADD_WALLET_FAILED', payload: { error } })
  }
}

// Load stored wallets and txes
// TODO: In the future, have params for max number of wallets and txes to fetch at once
const loadStoredData = () => async dispatch => {
  dispatch({ type: 'LOAD_STORED_DATA' })

  try {
    const wallets = await storageApi.get('/wallets.json')
    const transactions = await storageApi.get('/transactions.json')

    dispatch({ type: 'ADD_ALL_WALLETS', payload: Object.values(wallets.data) })
    dispatch({ type: 'ADD_TXES', payload: Object.values(transactions.data) })
    dispatch({ type: 'UPDATE_BALANCE' })

    return {
      wallets: Object.values(wallets.data),
      transactions: Object.values(transactions.data)
    }
  } catch (error) {
    dispatch({ type: 'LOAD_STORED_DATA_FAILED', payload: { error } })
    // TODO: Log error
    return error
  }
}

export {
  addWallet,
  loadStoredData
}
