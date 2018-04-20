import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { globals } from 'constants/styles'

import EtherscanLink from 'components/EtherscanLink'

const WalletListWrapper = styled.div`
  padding: 20px;
`
const Text = styled.div`
  ${globals}
`
const Row = styled.div`
  padding: 10px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  &:first-child {
    border-top: 0;
  }
  &:last-child {
    border-bottom: 0;
  }
`
const Heading = styled.h3`
  ${globals}
  font-size: 20px;
`

const WalletList = ({ wallets }) =>
  <WalletListWrapper>
    <Heading>Wallets:</Heading>
    <div>
      {wallets.map((wallet, i) =>
        <Row key={i}>
          <Text>Address: <EtherscanLink address={wallet.address} /></Text>
          <Text>Balance: { wallet.displayBalance } ETH</Text>
        </Row>
      )}
    </div>
  </WalletListWrapper>

WalletList.propTypes = {
  wallets: PropTypes.arrayOf(
    PropTypes.shape({
      address: PropTypes.string,
      balance: PropTypes.string
    })
  )
}

export default WalletList
