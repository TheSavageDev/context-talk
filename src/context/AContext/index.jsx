import React, { useReducer, createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import aReducer from './reducers'

// Context
const AStateContext = createContext();
const ADispatchContext = createContext();

export function AProvider({ children }) {
  const [state, dispatch] = useReducer(aReducer, {
    message: `A Message`,
    loading: false,
    response: null,
    errorMessage: null,
  });
  return (
    <AStateContext.Provider value={state}>
      <ADispatchContext.Provider value={dispatch}>
        {children}
      </ADispatchContext.Provider>
    </AStateContext.Provider>
  );
}

const propTypes = {
  children: PropTypes.node.isRequired,
};

AProvider.propTypes = propTypes;

// Custom Hooks
export function useAState() {
  const context = useContext(AStateContext);
  if (context === undefined) {
    throw new Error(`useAState must be used within a AProvider`)
  } return context;
}

export function useADispatch() {
  const context = useContext(ADispatchContext);
  if (context === undefined) {
    throw new Error(`useADispatch must be used within a AProvider`)
  } return context;
}
