import React from 'react'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

const defaultMaskOptions = {
  prefix: '',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: '.',
  allowDecimal: true,
  decimalSymbol: ',',
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 7, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
}

const CurrencyInput = ({ maskOptions, ...inputProps }) => {
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
    ...maskOptions,
  })

  return <MaskedInput mask={currencyMask} {...inputProps} />
}

CurrencyInput.defaultProps = {
  inputMode: 'numeric',
  maskOptions: {},
}

CurrencyInput.propTypes = {
  inputmode: PropTypes.number,
  maskOptions: PropTypes.shape({
    prefix: PropTypes.number,
    suffix: PropTypes.number,
    includeThousandsSeparator: PropTypes.bool,
    thousandsSeparatorSymbol: PropTypes.number,
    allowDecimal: PropTypes.bool,
    decimalSymbol: PropTypes.number,
    decimalLimit: PropTypes.number,
    requireDecimal: PropTypes.bool,
    allowNegative: PropTypes.bool,
    allowLeadingZeroes: PropTypes.bool,
    integerLimit: PropTypes.number,
  }),
}

export default CurrencyInput