import { handleActions } from 'redux-actions'
import BigInt from 'big-integer'
import formatEthBalance from 'utils/formatEthBalance'
import uniqBy from 'lodash/uniqBy'

const defaultState = {
  wallets: [],
  transactions: [],
  balance: '0',
  error: false,
  errorMessage: ''
}

const ADD_WALLET_COMPLETE = (state, action) => {
  const newWallet = {
    ...action.payload,
    // Format a "displayBalance" in eth instead of wei
    displayBalance: formatEthBalance(action.payload.balance)
  }

  const wallets = state.wallets.slice()
  const index = wallets.findIndex(wallet => wallet.address === newWallet.address)

  // Replace existing or add new
  if (index > -1) {
    wallets.splice(index, 1, newWallet)
  } else {
    wallets.push(newWallet)
  }

  return { ...state, wallets, error: false, errorMessage: '' }
}

// Add transctions, uniqify, and sort by timestamp
const ADD_TXES = (state, action) => {
  let transactions = uniqBy([...action.payload, ...state.transactions], 'hash')
    .sort((a, b) => parseInt(b.timeStamp) - parseInt(a.timeStamp))
    .map(tx => ({ ...tx, displayValue: formatEthBalance(tx.value) }))

  return { ...state, transactions }
}

const ADD_WALLET_FAILED = (state, action) => {
  // TODO
}

const GET_STORED_WALLETS_COMPLETE = (state, action) => {
  // TODO
}

const REMOVE_WALLET_COMPLETE = (state, action) => {
  // TODO
}

// Update and format total balance
const UPDATE_BALANCE = state => {
  let balanceWei = state.wallets
    .reduce((a, b) => a.add(b.balance), new BigInt())
    .toString()

  return { ...state, balance: formatEthBalance(balanceWei) }
}

// Export all reducers separately for unit-testability
export {
  ADD_TXES,
  ADD_WALLET_COMPLETE,
  ADD_WALLET_FAILED,
  GET_STORED_WALLETS_COMPLETE,
  REMOVE_WALLET_COMPLETE,
  UPDATE_BALANCE
}

export default handleActions({
  ADD_TXES,
  ADD_WALLET_COMPLETE,
  ADD_WALLET_FAILED,
  GET_STORED_WALLETS_COMPLETE,
  REMOVE_WALLET_COMPLETE,
  UPDATE_BALANCE
}, defaultState)
