import { toXML } from 'jstoxml'
import { OutputListCustomerDto } from '../../../usecases/customer/list/list.customer.dto'

export class CustomerPresenter {
  static listXml(data: OutputListCustomerDto): string {
    const xmlOptions = {
      header: true,
      indent: ' ',
      newline: '\n',
      allowEmpty: true,
    }

    return toXML(
      {
        customers: {
          customer: data.customers.map((customer) => ({
            id: customer.id,
            name: customer.name,
            address: {
              street: customer.address.street,
              number: customer.address.number,
              zip: customer.address.zip,
              city: customer.address.city,
            },
          })),
        },
      },
      xmlOptions,
    )
  }
}
