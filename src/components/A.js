import React from 'react'
import * as types from '../context/AContext/types'
import { useAState, useADispatch } from '../context/AContext'

export default function A() {
  const { response, loading } = useAState()
  const dispatch = useADispatch()

  async function handleGetData() {
    dispatch({ type: types.GET })
    if (!localStorage.getItem(`aResponse`)) {
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
          response: JSON.parse(localStorage.getItem(`aResponse`)),
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
        localStorage.setItem(`aResponse`, JSON.stringify(response))
      } else {
        throw new Error(`Response item is empty, can't store empty object`)
      }
    } catch (err) {
      dispatch({ type: `STORE_ERROR`, errorMessage: `I told you not do to that.` })
    }
  }

  function handleDropData() {
    dispatch({ type: `DROP` })
    try {
      localStorage.removeItem(`aResponse`)
    } catch (err) {
      dispatch({
        type: `STORE_ERROR`,
        errorMessage: `Could not find item to drop`,
      })
    }
  }

  function handleCopyBContext() {
    dispatch({ type: `GET_B` })
    if (localStorage.getItem(`bResponse`)) {
      const bResponse = localStorage.getItem(`bResponse`)
      localStorage.setItem(`aResponse`, bResponse)
      dispatch({ type: `GOT_B`, response: JSON.parse(bResponse) })
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
      <button disabled={!!loading} type="button" onClick={handleCopyBContext}>
        Copy B Context to A Context
      </button>
    </>
  )
}
