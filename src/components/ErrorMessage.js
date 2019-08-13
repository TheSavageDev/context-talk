import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  errorMessage: PropTypes.string,
}

const defaultProps = {
  errorMessage: null,
}

const ErrorMessage = ({ errorMessage }) => (
  <h2>
    {errorMessage}
  </h2>
)

ErrorMessage.propTypes = propTypes
ErrorMessage.defaultProps = defaultProps

export default ErrorMessage
