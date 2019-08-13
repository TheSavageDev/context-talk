import React from 'react'
import * as types from '../context/BContext/types'
import { useBState, useBDispatch } from '../context/BContext'

export default function B() {
  const { response, loading } = useBState()
  const dispatch = useBDispatch()

  async function handleGetData() {
    dispatch({ type: types.GET })
    if (!localStorage.getItem(`bResponse`)) {
      try {
        const responseJson = await fetch(`https://icanhazdadjoke.com/`, {
          method: `GET`,
          headers: {
            Accept: `application/json`,
          },
        }).then(r => r.json())
        dispatch({ type: types.GOT, response: responseJson })
      } catch (err) {
        dispatch({
          type: types.FETCH_ERROR,
          errorMessage: `Something went wrong. It is probably your fault.`,
        })
      }
    } else {
      try {
        dispatch({
          type: types.FETCH_STORE,
          response: JSON.parse(localStorage.getItem('bResponse')),
        })
      } catch (err) {
        dispatch({
          type: types.FETCH_ERROR,
          errorMessage: `Error Message: ${err}`,
        })
      }
    }
  }

  function handleStoreData() {
    dispatch({ type: `STORE` })
    try {
      if (response !== null) {
        localStorage.setItem(`bResponse`, JSON.stringify(response))
      } else {
        throw new Error(`Response item is empty, can't store empty object`)
      }
    } catch (err) {
      dispatch({ type: `STORE_ERROR`, errorMessage: `I told you not to do that.` })
    }
  }

  function handleDropData() {
    dispatch({ type: `DROP` })
    try {
      localStorage.removeItem(`bResponse`)
    } catch (err) {
      dispatch({
        type: `STORE_ERROR`,
        errorMessage: `Could not find item to drop`,
      })
    }
  }

  function handleCopyAContext() {
    dispatch({ type: `GET_A` })
    if (localStorage.getItem(`aResponse`)) {
      const aResponse = localStorage.getItem(`aResponse`)
      localStorage.setItem(`bResponse`, aResponse)
      dispatch({ type: `GOT_A`, response: JSON.parse(aResponse) })
    } else {
      throw new Error(`Something went wrong.`)
    }
  }

  return (
    <>
      <button disabled={!!loading} type="button" onClick={handleGetData}>
        Get Data
      </button>
      <button disabled={!!loading} type="button" onClick={handleStoreData}>
        Store Data
      </button>
      <button disabled={!!loading} type="button" onClick={handleDropData}>
        Drop Data
      </button>
      <button disabled={!!loading} type="button" onClick={handleCopyAContext}>
        Copy A Context to B Context
      </button>
    </>
  )
}
