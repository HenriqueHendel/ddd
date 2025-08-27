import EventHandlerInterface from '../../../@shared/event/event-handler.interface'
import EventInterface from '../../../@shared/event/event.interface'

export interface CustomerAddressIsChangeEventDataInterface {
  customerId: string
  customerName: string
  address: string
}

export class DisplayMessageWhenCustomerAddressIsChangedHandler
  implements EventHandlerInterface
{
  handle(
    event: EventInterface<CustomerAddressIsChangeEventDataInterface>,
  ): void {
    console.log(
      `Endereço do cliente: ${event.eventData.customerId}, ${event.eventData.customerName} alterado para: ${event.eventData.address}`,
    )
  }
}
