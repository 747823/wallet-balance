import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { globals, space, color } from 'constants/styles'
import Input from 'components/Input'
import Button from 'components/Button'

const Form = styled.form`
  box-sizing: border-box;
  padding: 20px;
`
const Flexbox = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: center;
  align-items: center;
  width: ${props => props.width};
  height: ${props => props.height};
  margin: ${props => props.margin};
  max-width: ${props => props.maxWidth || '100%'};
`
const InputWrapper = styled.div`
  width: 100%;
`

class AddWalletBar extends React.Component {
  static propTypes = {
    address: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  static defaultProps = {
    address: ''
  }

  submitWallet (event) {
    event.preventDefault()
    this.props.onSubmit()
  }

  render () {
    return (
      <Form onSubmit={event => this.submitWallet(event)}>
        <Flexbox direction={'row'} width={'100%'}>
          <InputWrapper>
            <Input
              onChange={this.props.onChange}
              value={this.props.address}
              placeholder='0x...'
            />
          </InputWrapper>
          {/* TODO: make this disabled if wallet address is invalid (or already exists) */}
          <Button onClick={event => this.submitWallet(event)} primary small>
            Add Wallet
          </Button>
        </Flexbox>
      </Form>
    )
  }
}

export default AddWalletBar
