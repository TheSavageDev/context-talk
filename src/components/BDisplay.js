import React, { useEffect } from 'react'
import B from './B'
import Response from './Response'
import ErrorMessage from './ErrorMessage'
import { useBState, useBDispatch } from '../context/BContext'
import Loading from './Loading'

export default function BDisplay() {
  const {
    message,
    loading,
    response,
    errorMessage,
  } = useBState()

  const dispatch = useBDispatch()

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: `GET` })
      if (!localStorage.getItem(`bResponse`)) {
        try {
          const responseJson = await fetch(`https://icanhazdadjoke.com/`, {
            method: `GET`,
            headers: {
              Accept: `application/json`,
            },
          }).then(r => r.json())
          dispatch({ type: `GOT`, response: responseJson })
        } catch (err) {
          dispatch({
            type: `FETCH_ERROR`,
            errorMessage: `Something went wrong. It is probably your fault.`,
          })
        }
      } else {
        try {
          dispatch({
            type: `FETCH_STORE`,
            response: JSON.parse(localStorage.getItem(`bResponse`)),
          });
        } catch (err) {
          dispatch({ type: `FETCH_ERROR`, errorMessage: `Error Message: ${err}` })
        }
      }
    }
    fetchData()
  }, []);

  return (
    <div>
      <h2 style={{ fontFamily: 'serif' }}>B Context</h2>
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      {loading && <Loading />}
      <h3>{message}</h3>
      {response !== null && (
        <Response
          id={response.id}
          status={response.status}
          joke={response.joke}
        />
      )}
      <B />
    </div>
  )
}
