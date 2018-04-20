import React from 'react'
import PropTypes from 'prop-types'
import autobind from 'react-autobind'
import styled from 'styled-components'

import AddWalletContainer from 'containers/AddWalletContainer'
import IntroContainer from 'containers/IntroContainer'
import TotalBalanceContainer from 'containers/TotalBalanceContainer'
import WalletList from 'components/WalletList'
import TxList from 'components/TxList'

const Page = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

class PortfolioPage extends React.Component {
  static propTypes = {
    wallets: PropTypes.array
  }

  constructor () {
    super()
    autobind(this)
  }

  render () {
    return (
      <Page>
        {this.props.wallets.length === 0 &&
          <IntroContainer />
        }
        {this.props.wallets.length > 0 &&
          <div>
            <AddWalletContainer />
            <TotalBalanceContainer />
            <WalletList {...this.props} />
            <TxList {...this.props} />
          </div>
        }
      </Page>
    )
  }
}

export default PortfolioPage
