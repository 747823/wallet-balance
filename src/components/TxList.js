import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { globals } from 'constants/styles'

import EtherscanLink from 'components/EtherscanLink'

const TxListWrapper = styled.div`
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

const TxList = ({ transactions }) =>
  <TxListWrapper>
    <Heading>Transactions:</Heading>
    <div>
      {transactions.map((tx, i) =>
        <Row key={i}>
          <Text>Tx Hash: { tx.hash }</Text>
          <Text>
            From: <EtherscanLink address={tx.from} /> | To: <EtherscanLink address={tx.to} />
          </Text>
          <Text>Amount: { tx.displayValue } ETH</Text>
          <Text>Block: { tx.blockNumber }</Text>
          <Text>confirmations: { tx.confirmations }</Text>
        </Row>
      )}
    </div>
  </TxListWrapper>

TxList.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      from: PropTypes.string,
      toAddress: PropTypes.string,
      blockNumber: PropTypes.string,
      confirmations: PropTypes.string,
      displayValue: PropTypes.string
    })
  )
}

export default TxList
