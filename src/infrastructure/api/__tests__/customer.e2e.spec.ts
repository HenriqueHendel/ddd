import { sequelize, app } from '../express'
import request from 'supertest'

describe('End to end test for customer', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'Henrique',
        address: {
          street: 'Street',
          number: 123,
          city: 'FSA',
          zip: '12345',
        },
      })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe('Henrique')
    expect(response.body.address.street).toBe('Street')
    expect(response.body.address.number).toBe(123)
    expect(response.body.address.city).toBe('FSA')
    expect(response.body.address.zip).toBe('12345')
  })

  it('should not create a customer', async () => {
    const response = await request(app).post('/customer').send({
      name: 'Henrique',
    })

    expect(response.status).toBe(500)
  })

  it('should list all customers', async () => {
    await request(app)
      .post('/customer')
      .send({
        name: 'Henrique',
        address: {
          street: 'Street',
          number: 123,
          city: 'FSA',
          zip: '12345',
        },
      })

    await request(app)
      .post('/customer')
      .send({
        name: 'Hendel',
        address: {
          street: 'Street 2',
          number: 1234,
          city: 'SSA',
          zip: '123',
        },
      })

    const listResponse = await request(app).get('/customer').send()

    expect(listResponse.status).toBe(200)
    expect(listResponse.body.customers.length).toBe(2)

    const customer1 = listResponse.body.customers[0]
    expect(customer1.name).toBe('Henrique')
    expect(customer1.address.street).toBe('Street')
    expect(customer1.address.number).toBe(123)
    expect(customer1.address.city).toBe('FSA')
    expect(customer1.address.zip).toBe('12345')

    const customer2 = listResponse.body.customers[1]
    expect(customer2.name).toBe('Hendel')
    expect(customer2.address.street).toBe('Street 2')
    expect(customer2.address.number).toBe(1234)
    expect(customer2.address.city).toBe('SSA')
    expect(customer2.address.zip).toBe('123')
  })
})
