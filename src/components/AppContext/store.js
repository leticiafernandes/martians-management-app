import React, { createContext, useReducer } from 'react'
import Reducer from './reducer'

const initialState = {
  budgetLeft: 0,
  customers: [],
  customer: null,
  modalRef: null,
}
export const Context = createContext(initialState)

const Store = ({ children }) => {
  const [globalState, dispatch] = useReducer(Reducer, initialState)

  return (
    <Context.Provider value={[globalState, dispatch]}>
      {children}
    </Context.Provider>
  )
}

export default Store
