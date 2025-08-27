import EventInterface from '../../@shared/event/event.interface'
import { CustomerAddressIsChangeEventDataInterface } from './handler/display-message-when-address-is-changed.handler'

export class AddressChangedEvent
  implements EventInterface<CustomerAddressIsChangeEventDataInterface>
{
  dataTimeOccurred: Date
  eventData: CustomerAddressIsChangeEventDataInterface

  constructor(eventData: CustomerAddressIsChangeEventDataInterface) {
    this.dataTimeOccurred = new Date()
    this.eventData = eventData
  }
}
