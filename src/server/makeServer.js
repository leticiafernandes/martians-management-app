import { createServer, Model } from 'miragejs'
import apiData from '../mocks/apiData'

export default function ({ environment = 'test' } = {}) {
  return createServer({
    environment,
    models: {
      customer: Model,
    },
    seeds(server) {
      if (!apiData.length) throw Error('API data must exist')
      apiData.forEach((customer) => {
        server.create('customer', {
          id: customer.id,
          name: customer.name,
          budget: customer.budget,
          budget_spent: customer.budget_spent,
          date_of_first_purchase: customer.date_of_first_purchase,
        })
      })
    },
    routes() {
      this.namespace = 'api/customer'
      this.get('/', (schema) => {
        return schema.customers.all()
      })
      this.get('/:id', (schema, request) => {
        let id = request.params.id
        return schema.customers.find(id)
      })
      this.post('/', (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        return schema.customers.create(attrs)
      })
      this.patch('/:id', (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody)
        let id = request.params.id
        let customer = schema.customers.find(id)
        return customer.update(newAttrs)
      })
      this.delete('/:id', (schema, request) => {
        let id = request.params.id
        return schema.customers.find(id).destroy()
      })
    },
  })
}
