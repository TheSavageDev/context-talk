import React from 'react'
import The from './The'
import ErrorMessage from './ErrorMessage'
import { useTheState } from '../context/TheContext'
import Loading from './Loading'

export default function TheDisplay() {
  const { message, loading, errorMessage } = useTheState()
  return (
    <div
      style={{
        display: `flex`,
        flexDirection: `column`,
        alignItems: `center`,
      }}
    >
      <h2 style={{ fontFamily: 'serif' }}>The Context</h2>
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      {loading && <Loading />}
      <h3>{message}</h3>
      <The />
    </div>
  )
}
