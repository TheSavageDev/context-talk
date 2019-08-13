import React, { useReducer, createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import theReducer from './reducers'

// Context
const TheStateContext = createContext();
const TheDispatchContext = createContext();

export function TheProvider({ children }) {
  const [state, dispatch] = useReducer(theReducer, {
    message: `Data Not Swapped`,
  });
  return (
    <TheStateContext.Provider value={state}>
      <TheDispatchContext.Provider value={dispatch}>
        {children}
      </TheDispatchContext.Provider>
    </TheStateContext.Provider>
  )
}

const propTypes = {
  children: PropTypes.node.isRequired,
}

TheProvider.propTypes = propTypes;

// Custom Hooks
export function useTheState() {
  const context = useContext(TheStateContext);
  if (context === undefined) {
    throw new Error(`useTheState must be used within a TheProvider`)
  } return context;
}

export function useTheDispatch() {
  const context = useContext(TheDispatchContext);
  if (context === undefined) {
    throw new Error(`useTheDispatch must be used within a TheProvider`)
  } return context;
}
