import { etherscanApi } from 'utils'
// import { storage } from 'utils'

const addWallet = address => async (dispatch, getState) => {
  // May or may not use this
  dispatch({ type: 'ADD_WALLET', payload: { address } })
  try {
    // TODO: abort action if message from balance call was not OK. (e.g. invalid eth address)
    const balance = await etherscanApi.get(`/?action=balance&address=${address}`)
    const txlist = await etherscanApi.get(`/?action=txlist&address=${address}`)
    const wallet = {
      address,
      balance: balance.data.result,
      txlist: txlist.data.result
    }

    dispatch({ type: 'ADD_WALLET_COMPLETE', payload: wallet })
    dispatch({ type: 'ADD_TXES', payload: wallet.txlist })
    dispatch({ type: 'UPDATE_BALANCE' })

    // TODO: persist changes
  } catch (error) {
    dispatch({ type: 'ADD_WALLET_FAILED', payload: { error } })
  }
}

export {
  addWallet
}
