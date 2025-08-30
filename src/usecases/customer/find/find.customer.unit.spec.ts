import Customer from '../../../domain/customer/entity/customer'
import Address from '../../../domain/customer/value-object/address'
import { FindCustomerUseCase } from './find.customer.usecase'
import { InputFindCustomerDto } from './find.customer.dto'

const customer = new Customer('1', 'Henrique')
const address = new Address('Street', 10, '12345-678', 'FSA')
customer.changeAddress(address)

const mockCustomerRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit Test find customer use case', () => {
  it('should find a customer', async () => {
    const customerRepository = mockCustomerRepository()
    const sut = new FindCustomerUseCase(customerRepository)

    const input: InputFindCustomerDto = {
      id: customer.id,
    }

    const sutResponse = await sut.execute(input)

    expect(sutResponse).toStrictEqual({
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        city: customer.Address.city,
        number: customer.Address.number,
        zip: customer.Address.zip,
      },
    })
  })

  it('should throw an error when customer not exists', async () => {
    const customerRepository = mockCustomerRepository()
    customerRepository.find.mockImplementation(() => {
      throw new Error('Customer not found')
    })
    const sut = new FindCustomerUseCase(customerRepository)

    const input: InputFindCustomerDto = {
      id: 'fake-id',
    }

    expect(() => sut.execute(input)).rejects.toThrowError('Customer not found')
  })
})
