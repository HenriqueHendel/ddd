import { Sequelize } from 'sequelize-typescript'
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/customer.model'
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository'
import Customer from '../../../domain/customer/entity/customer'
import Address from '../../../domain/customer/value-object/address'
import { FindCustomerUseCase } from './find.customer.usecase'
import { InputFindCustomerDto } from './find.customer.dto'

describe('Test find customer use case', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository()
    const sut = new FindCustomerUseCase(customerRepository)

    const customer = new Customer('1', 'Henrique')
    const address = new Address('Street', 10, '12345-678', 'FSA')
    customer.changeAddress(address)
    await customerRepository.create(customer)

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
})
