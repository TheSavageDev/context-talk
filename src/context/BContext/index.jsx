import React, { useReducer, createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import bReducer from './reducers'

// Context
const BStateContext = createContext();
const BDispatchContext = createContext();

export function BProvider({ children }) {
  const [state, dispatch] = useReducer(bReducer, {
    message: `B Message`,
    loading: false,
    response: null,
    errorMessage: null,
  });
  return (
    <BStateContext.Provider value={state}>
      <BDispatchContext.Provider value={dispatch}>
        {children}
      </BDispatchContext.Provider>
    </BStateContext.Provider>
  );
}

const propTypes = {
  children: PropTypes.node.isRequired,
};

BProvider.propTypes = propTypes;

// Custom Hooks
export function useBState() {
  const context = useContext(BStateContext);
  if (context === undefined) {
    throw new Error(`useBState must be used within a BProvider`)
  } return context;
}

export function useBDispatch() {
  const context = useContext(BDispatchContext);
  if (context === undefined) {
    throw new Error(`useBDispatch must be used within a BProvider`)
  } return context;
}
