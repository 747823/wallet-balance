import React from 'react'
import PropTypes from 'prop-types'

// Future feature: this component could just take different props
// like address, tx, block, etc. and generate the corret link to support all types of etherscan links
const EtherscanLink = ({ address }) =>
  <a target='_blank' href={`https://etherscan.io/address/${address}`}>{ address }</a>

EtherscanLink.propTypes = {
  address: PropTypes.string
}

export default EtherscanLink
