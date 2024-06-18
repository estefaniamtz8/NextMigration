import PropTypes from 'prop-types'

export const defaultProps = {
  direction: 'column',
  required: false,
  placeholder: '',
}

const commonPropTypes = {
  direction: PropTypes.oneOf(['row', 'column']),
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export const selectPropTypes = {
  ...commonPropTypes,
  asChips: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string
  })).isRequired
}

export default commonPropTypes
