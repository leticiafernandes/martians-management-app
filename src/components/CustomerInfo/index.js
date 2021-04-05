import React, { useState, useEffect, useContext, useRef } from 'react'

/** Components */
import { Context } from '../AppContext/store'
import Alert from '../Alert/index'
import CloseIcon from '../helpers/utils/closeIcon'

/** Functions */
import formatBudget from '../helpers/utils/formatBudget'
import { setItem } from '../helpers/storage/localStorage'

/** Style */
import './index.scss'

function CustomerInfo() {
  const [globalState, dispatch] = useContext(Context)
  const [value, setValue] = useState(0)

  const {
    customer: { id, name, budget, budget_spent: budgetSpent },
    modalRef,
    budgetLeft,
  } = globalState || {}

  const alertRef = useRef(null)

  const setError = (message = '', error = '') => {
    console.error(message, error)
    alertRef.current.show(message, 'error')
  }

  const getCustomers = () => {
    fetch('/api/customer')
      .then((res) => {
        if (!res.ok)
          setError(`[/api/customer] HTTP Request Error - Status: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        let { customers } = data
        dispatch({ type: 'GET_CUSTOMERS', payload: customers })
        setItem('customers', customers)
      })
      .catch((error) => {
        setError('Error while processing Martians customers list', error)
      })
  }

  const closeModal = () => {
    modalRef.current.hide()
  }

  const updateCustomerBudget = (id, body) => {
    if (!id || !body) throw Error('Must provide customer id and body request')

    alertRef.current.hide() // Remove present alerts

    fetch(`/api/customer/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        budget: body.budget,
        budget_spent: body.budgetSpent,
      }),
    })
      .then((res) => {
        if (!res.ok)
          setError(
            `PATCH [/api/customer/${id}] HTTP Request Error - Status: ${res.status}`
          )
        return res.json()
      })
      .then((data) => {
        let { customer } = data
        dispatch({ type: 'UPDATE_CUSTOMER', payload: customer })
        setItem(`customer${customer.id}`, customer)
        closeModal()
      })
      .catch((error) => {
        setError(
          `It was not possible do update the budget for ID: ${id}`,
          error
        )
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    let budgetDifference = value - budgetLeft
    globalState.budgetLeft = value

    updateCustomerBudget(id, {
      budget: budget - budgetDifference,
      budgetSpent: budgetSpent + budgetDifference,
    })

    getCustomers()
  }

  const handleChange = (event) => {
    if (!event.target.value) return

    let currentValue = formatBudget(event.target.value)

    if (currentValue > budget) {
      setError('Insufficient budget value to complete this action')
      return false
    }

    setValue(currentValue)
  }

  useEffect(() => {
    setValue(budgetLeft)
  }, [])

  return (
    <>
      <div className='customer__info'>
        <div
          className='close__icon'
          onClick={closeModal}
          onKeyDown={closeModal}
          role='button'
          tabIndex={0}>
          <button>
            <CloseIcon />
          </button>
        </div>
        <span className='customer__name'>{name}</span>
        <form className='customer__form' onSubmit={handleSubmit}>
          <label htmlFor='totalBudget'>Total budget:</label>
          <input
            name='totalBudget'
            min='0'
            step='0.01'
            type='number'
            value={value}
            onChange={handleChange}
            required
          />
          <input type='submit' value='Send' />
        </form>
      </div>
      <Alert ref={alertRef} />
    </>
  )
}

export default CustomerInfo
