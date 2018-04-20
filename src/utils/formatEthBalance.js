import padStart from 'lodash/padStart'

// Balance should be string in wei
export default wei => {
  let value = padStart(wei, 18, '0')

  if (value.length < 19) {
    // Less than 1 eth
    value = `0.${value}`
  } else {
    value = value.split('').reverse()
    value.splice(18, 0, '.')
    value = value.reverse().join('')
  }

  return value
}
