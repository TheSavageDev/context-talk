import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  id: PropTypes.string,
  status: PropTypes.number,
  joke: PropTypes.string,
}

const defaultProps = {
  id: '0',
  status: 200,
  joke: 'No Joke',
}

const Response = ({ id, status, joke }) => (
  <div>
    <p>{`Id: ${id !== null ? id : 'No Data'}`}</p>
    <p>{`Status: ${status !== null ? status : 'No Data'}`}</p>
    <p>{`Joke: ${joke !== null ? joke : 'No Data'}`}</p>
  </div>
)

Response.propTypes = propTypes
Response.defaultProps = defaultProps

export default Response
