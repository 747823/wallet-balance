import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import autobind from 'react-autobind'
import PropTypes from 'prop-types'

import { addWallet } from 'actions'
import AddWalletBar from 'components/AddWalletBar'

class AddWalletContainer extends React.Component {
  static propTypes = {
    addWallet: PropTypes.func
  }

  constructor () {
    super()
    this.state = {
      address: ''
    }
    autobind(this)
  }

  onChange (event) {
    this.setState({ address: event.target.value })
  }

  onSubmit (event) {
    this.props.addWallet(this.state.address)
  }

  render () {
    return (
      <AddWalletBar
        address={this.state.address}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
      />
    )
  }
}

// TODO: map the store's error message, loading, some other stuff
const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => bindActionCreators({
  addWallet
}, dispatch)

const ConnectedAddWalletContainer = connect(mapStateToProps, mapDispatchToProps)(AddWalletContainer)

export {
  AddWalletContainer,
  ConnectedAddWalletContainer as default
}
