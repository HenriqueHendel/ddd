import EventHandlerInterface from '../../../@shared/event/event-handler.interface'

export class DisplaySecondMessageWhenCustomerIsCreatedHandler
  implements EventHandlerInterface
{
  handle(): void {
    console.log('Esse é o segundo console.log do evento: CustomerCreated')
  }
}
