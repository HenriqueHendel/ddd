import EventInterface from '../../@shared/event/event.interface'
import Customer from '../entity/customer'

export class CustomerCreatedEvent implements EventInterface {
  dataTimeOccurred: Date
  eventData: any

  constructor(eventData?: Customer) {
    this.dataTimeOccurred = new Date()
    if (eventData) {
      this.eventData = eventData
    }
  }
}
