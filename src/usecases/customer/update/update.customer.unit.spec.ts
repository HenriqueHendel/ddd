import CustomerFactory from '../../../domain/customer/factory/customer.factory'
import Address from '../../../domain/customer/value-object/address'
import { UpdateCustomerUseCase } from './update.customer.usecase'

const customer = CustomerFactory.createWithAddress(
  'Henrique',
  new Address('Street', 10, '12345-678', 'FSA'),
)

const input = {
  id: customer.id,
  name: 'Hendel',
  address: {
    street: 'Street updated',
    number: 20,
    zip: 'Zip updated',
    city: 'City updated',
  },
}

const mockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit test for customer update use case', () => {
  it('should update a customer', async () => {
    const customerRepository = mockRepository()
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository)

    const output = await customerUpdateUseCase.execute(input)

    expect(output).toEqual(input)
  })
})
