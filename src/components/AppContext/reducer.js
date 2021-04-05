const Reducer = (state, action) => {
  let { payload, type } = action || {}

  switch (type) {
    case 'GET_CUSTOMERS':
      return {
        ...state,
        customers: payload,
      }
    case 'GET_CUSTOMER':
      return {
        ...state,
        customer: payload,
      }
    case 'UPDATE_CUSTOMER':
      return {
        ...state,
        customer: payload,
      }
    case 'SET_BUDGET_LEFT':
      return {
        ...state,
        budgetLeft: payload,
      }
    default:
      return state
  }
}

export default Reducer
