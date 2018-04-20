import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { globals, space, color } from 'constants/styles'

const Wrapper = styled.div`
  ${globals}
  padding: 20px;
`
const Heading = styled.h3`
  font-size: 30px;
  margin: 0;
`

class TotalBalanceContainer extends React.Component {
  static propTypes = {
    balance: PropTypes.string
  }

  render () {
    return (
      <Wrapper>
        <p>Total Balance:</p>
        <Heading>{this.props.balance} ETH</Heading>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({ balance: state.portfolio.balance })

const TotalBalanceContainerConnected = connect(mapStateToProps)(TotalBalanceContainer)

export {
  TotalBalanceContainer,
  TotalBalanceContainerConnected as default
}
