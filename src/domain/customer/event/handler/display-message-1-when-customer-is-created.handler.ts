import EventHandlerInterface from '../../../@shared/event/event-handler.interface'

export class DisplayFirstMessageWhenCustomerIsCreatedHandler
  implements EventHandlerInterface
{
  handle(): void {
    console.log('Esse é o primeiro console.log do evento: CustomerCreated')
  }
}
