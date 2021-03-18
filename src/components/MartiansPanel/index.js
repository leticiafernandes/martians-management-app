import React from 'react'
import MartiansList from '../MartiansList/index'
import './index.scss'

function MartiansPanel() {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Budget</th>
            <th scope='col'>Spent Budget</th>
            <th scope='col'>First Purchase</th>
          </tr>
        </thead>
        <tbody>
          <MartiansList />
        </tbody>
      </table>
    </>
  )
}

export default MartiansPanel
