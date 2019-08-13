import React from 'react'
import * as types from '../context/TheContext/types'
import { useTheState, useTheDispatch } from '../context/TheContext'

export default function The() {
  const { loading } = useTheState()
  const dispatch = useTheDispatch()

  function handleSwapData() {
    dispatch({ type: types.SWAP })
    if (
      !!localStorage.getItem(`aResponse`)
      && !!localStorage.getItem(`bResponse`)
    ) {
      try {
        const aResponse = localStorage.getItem(`bResponse`)
        const bResponse = localStorage.getItem(`aResponse`)
        localStorage.setItem(`aResponse`, aResponse)
        localStorage.setItem(`bResponse`, bResponse)
        dispatch({ type: types.SWAPPED })
      } catch (err) {
        dispatch({
          type: types.SWAP_ERROR,
          errorMessage: `Something went wrong. It is probably your fault.`,
        })
      }
    } else {
      dispatch({ type: types.SWAP_ERROR, errorMessage: `There is either no A Context  or B Context stored` })
    }
  }

  return (
    <>
      <button type="button" onClick={handleSwapData}>
        {!loading ? `Swap Data` : `Swapping Data`}
      </button>
    </>
  )
}
