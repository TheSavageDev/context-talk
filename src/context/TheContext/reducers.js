import * as types from './types'

export default function theReducer(state, { type, errorMessage }) {
  switch (type) {
    case types.SWAP: {
      return {
        ...state,
        message: `Swapping Data`,
        loading: true,
      }
    }
    case types.SWAPPED: {
      return {
        ...state,
        message: `Swapped Data`,
        loading: false,
      }
    }
    case types.SWAP_ERROR: {
      return {
        ...state,
        message: `Oh no.`,
        errorMessage,
        loading: false,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`)
    }
  }
}
