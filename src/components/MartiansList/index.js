import React, { useState, useEffect, useRef } from 'react'

import MartiansInfo from '../MartiansInfo/index'
import Modal from '../Modal/index'
import apiData from '../../mocks/apiData'

function MartiansList() {
  const [consumers, setConsumers] = useState([])
  const modal = useRef(null)

  /** I would use fetch inside useEffect to get data from the api endpoint */
  useEffect(() => setConsumers(apiData), [apiData])

  return (
    <>
      {consumers.map((consumer) => (
        <tr
          key={consumer.id}
          id={consumer.id}
          onClick={() => modal.current.show()}>
          <td>{consumer.name}</td>
          <td>€ {consumer.budget.toFixed(2)}</td>
          <td>€ {consumer.budget_spent.toFixed(2)}</td>
          <td>{consumer.date_of_first_purchase}</td>
        </tr>
      ))}
      <Modal ref={modal}>
        <MartiansInfo />
      </Modal>
    </>
  )
}

export default MartiansList
