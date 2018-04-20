import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import autobind from 'react-autobind'
import PropTypes from 'prop-types'

import { addWallet } from 'actions'

import Intro from 'components/Intro'

class IntroContainer extends React.Component {
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
    this.setState({
      address: event.target.value
    })
  }

  onSubmit (event) {
    this.props.addWallet(this.state.address)
  }

  render () {
    return (
      <Intro
        address={this.state.address}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
      />
    )
  }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => bindActionCreators({
  addWallet
}, dispatch)

const IntroContainerConnected = connect(mapStateToProps, mapDispatchToProps)(IntroContainer)

export {
  IntroContainer,
  IntroContainerConnected as default
}
