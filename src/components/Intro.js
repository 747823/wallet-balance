import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { globals, space, color } from 'constants/styles'
import Input from 'components/Input'
import Button from 'components/Button'

const Form = styled.form`
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
`
const Heading = styled.h2`
  ${globals}
  font-size: 30px;
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
  max-width: 420px;
  padding: 20px 0;
`

class Intro extends React.Component {
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
        <Flexbox direction={'column'} height={'100%'} width={'100%'}>
          <Flexbox maxWidth={'340px'} width={'100%'} margin={'0 auto'}>
            <img height={100} src='https://cdn.iconscout.com/public/images/icon/free/png-512/ethereum-cryptocurrency-crypto-currency-coin-logo-3d932433d9b623bc-512x512.png' />
            <Heading>
              Add a wallet to get started
            </Heading>
          </Flexbox>
          <InputWrapper>
            <Input
              onChange={this.props.onChange}
              value={this.props.address}
              placeholder='0x...'
            />
          </InputWrapper>
          <div>
            {/* TODO: make this disabled if wallet address is invalid */}
            <Button onClick={event => this.submitWallet(event)} primary>
              Add Wallet
            </Button>
          </div>
        </Flexbox>
      </Form>
    )
  }
}

export default Intro
