import CustomerFactory from '../../../domain/customer/factory/customer.factory'
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface'
import Address from '../../../domain/customer/value-object/address'
import {
  InputCreateCustomerDto,
  OutputCreateCustomerDto,
} from './create.customer.dto'

export class CreateCustomerUseCase {
  private _customerRepository: CustomerRepositoryInterface

  constructor(customerRepository: CustomerRepositoryInterface) {
    this._customerRepository = customerRepository
  }

  async execute(
    input: InputCreateCustomerDto,
  ): Promise<OutputCreateCustomerDto> {
    const address = new Address(
      input.address.street,
      input.address.number,
      input.address.zip,
      input.address.city,
    )
    const customer = CustomerFactory.createWithAddress(input.name, address)
    customer.changeAddress(address)

    await this._customerRepository.create(customer)

    const response: OutputCreateCustomerDto = {
      id: customer.id,
      name: customer.name,
      address: {
        city: customer.Address.city,
        number: customer.Address.number,
        zip: customer.Address.zip,
        street: customer.Address.street,
      },
    }

    return response
  }
}
