import React from 'react'
import CustomerList from '../CustomerList/index'
import './index.scss'

function CustomerCatalog() {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Budget</th>
            <th scope='col'>Spent Budget</th>
            <th scope='col'>Budget Left</th>
            <th scope='col'>First Purchase</th>
          </tr>
        </thead>
        <tbody>
          <CustomerList />
        </tbody>
      </table>
    </>
  )
}

export default CustomerCatalog
