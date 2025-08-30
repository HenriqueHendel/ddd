import { CreateCustomerUseCase } from './create.customer.usecase'

describe('Unit test create customer use case', () => {
  const mockCustomerRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    }
  }

  it('should create a customer', async () => {
    const customerRepository = mockCustomerRepository()
    const sut = new CreateCustomerUseCase(customerRepository)

    const input = {
      name: 'Henrique',
      address: {
        street: 'Street',
        city: 'FSA',
        number: 10,
        zip: '12345-678',
      },
    }

    const response = await sut.execute(input)

    expect(response).toStrictEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        city: input.address.city,
        number: input.address.number,
        zip: input.address.zip,
      },
    })
  })

  it('should throw an error when name is missing', async () => {
    const customerRepository = mockCustomerRepository()
    const sut = new CreateCustomerUseCase(customerRepository)

    const input = {
      name: '',
      address: {
        street: 'Street',
        city: 'FSA',
        number: 10,
        zip: '12345-678',
      },
    }

    expect(sut.execute(input)).rejects.toThrowError('Name is required')
  })

  it('should throw an error when street is missing', async () => {
    const customerRepository = mockCustomerRepository()
    const sut = new CreateCustomerUseCase(customerRepository)

    const input = {
      name: 'Henrique',
      address: {
        street: '',
        city: 'FSA',
        number: 10,
        zip: '12345-678',
      },
    }

    expect(sut.execute(input)).rejects.toThrowError('Street is required')
  })
})
