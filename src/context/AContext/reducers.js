import * as types from './types'

export default function aReducer(state, { type, response, errorMessage }) {
  switch (type) {
    case types.GET: {
      return {
        ...state,
        message: `Fetching Data`,
        loading: true,
      }
    }
    case types.GOT: {
      return {
        ...state,
        message: `Data Received`,
        response,
        errorMessage: null,
        loading: false,
      }
    }
    case types.FETCH_ERROR: {
      return {
        ...state,
        message: `Error!!!`,
        errorMessage,
        loading: false,
      }
    }
    case types.DROP: {
      return {
        message: `D-d-d-d-dropped`,
        loading: false,
        response: null,
        errorMessage: null,
      }
    }
    case types.STORE: {
      return {
        ...state,
        message: `Data Stored`,
        loading: false,
        errorMessage: false,
      }
    }
    case types.FETCH_STORE: {
      return {
        ...state,
        message: `Fetched from Local Storage`,
        loading: false,
        errorMessage: null,
        response,
      }
    }
    case types.STORE_ERROR: {
      return {
        ...state,
        message: `Store Error!`,
        errorMessage,
        loading: false,
      }
    }
    case types.GET_B: {
      return {
        ...state,
        message: `Fetching B's Data`,
        loading: true,
      }
    }
    case types.GOT_B: {
      return {
        ...state,
        message: `Context Copied from B`,
        loading: false,
        errorMessage: null,
        response,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`)
    }
  }
}
