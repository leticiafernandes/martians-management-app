import React, { useEffect, useContext, useRef } from 'react'

/** Components */
import { Context } from '../AppContext/store'
import CustomerInfo from '../CustomerInfo/index'
import Modal from '../Modal/index'
import Alert from '../Alert/index'

/** Functions */
import formatBudget from '../helpers/utils/formatBudget'
import { isKeyDefined, setItem, getItem } from '../helpers/storage/localStorage'

function CustomerList() {
  const [globalState, dispatch] = useContext(Context)

  globalState.modalRef = useRef(null)

  const alertRef = useRef(null)

  const getBudgetLeft = (budget, budgetSpent) => {
    let budgetLeft = formatBudget(budget - budgetSpent)
    return budgetLeft
  }

  const setBudgetLeft = (budget, budgetSpent) => {
    let budgetLeft = getBudgetLeft(budget, budgetSpent)
    dispatch({ type: 'SET_BUDGET_LEFT', payload: budgetLeft })
  }

  const setError = (message = '', error = '') => {
    console.error(message, error)
    alertRef.current.show(message, 'error')
  }

  const getCustomer = (id) => {
    if (!id) throw Error('Must provide customer id')

    alertRef.current.hide() // Remove present alerts

    fetch(`/api/customer/${id}`)
      .then((res) => {
        if (!res.ok)
          setError(
            `GET [/api/customer/${id}] HTTP Request Error - Status: ${res.status}`
          )
        return res.json()
      })
      .then((data) => {
        let customer = data.customer

        isKeyDefined(`customer${id}`)
          ? (customer = getItem(`customer${id}`))
          : setItem(`customer${id}`, customer)

        dispatch({ type: 'GET_CUSTOMER', payload: customer })
        setBudgetLeft(customer.budget, customer.budget_spent)
        globalState.modalRef.current.show()
      })
      .catch((error) => {
        setError(`It was not possible do get the Martian with ID: ${id}`, error)
      })
  }

  const getCustomers = () => {
    fetch('/api/customer')
      .then((res) => {
        if (!res.ok)
          setError(`[/api/customer] HTTP Request Error - Status: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        let customers = data.customers

        isKeyDefined('customers')
          ? (customers = getItem('customers'))
          : setItem('customers', customers)

        dispatch({ type: 'GET_CUSTOMERS', payload: customers })
      })
      .catch((error) => {
        setError('Error while processing Martians customers list', error)
      })
  }

  useEffect(() => {
    getCustomers()
  }, [])

  return (
    <>
      {globalState.customers &&
        globalState.customers.map((customer) => (
          <tr
            key={customer.id}
            id={customer.id}
            onClick={() => getCustomer(customer.id)}>
            <td>{customer.name}</td>
            <td>€ {formatBudget(customer.budget)}</td>
            <td>€ {formatBudget(customer.budget_spent)}</td>
            <td>€ {getBudgetLeft(customer.budget, customer.budget_spent)}</td>
            <td>{customer.date_of_first_purchase}</td>
          </tr>
        ))}
      <Modal ref={globalState.modalRef}>
        <CustomerInfo {...globalState} />
      </Modal>
      <Alert ref={alertRef} />
    </>
  )
}

export default CustomerList
