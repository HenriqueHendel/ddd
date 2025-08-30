import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface'
import {
  InputFindCustomerDto,
  OutputFindCustomerDto,
} from './find.customer.dto'

export class FindCustomerUseCase {
  private _customerRepository: CustomerRepositoryInterface

  constructor(customerRepository: CustomerRepositoryInterface) {
    this._customerRepository = customerRepository
  }

  async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
    const customer = await this._customerRepository.find(input.id)

    const response: OutputFindCustomerDto = {
      id: customer.id,
      name: customer.name,
      address: {
        city: customer.Address.city,
        street: customer.Address.street,
        number: customer.Address.number,
        zip: customer.Address.zip,
      },
    }

    return response
  }
}
