import EventDispatcher from '../../@shared/event/event-dispatcher'
import Customer from '../entity/customer'
import Address from '../value-object/address'

describe('Customer Address Changed Event Dispatcher test', () => {
  it('should dispach the handlers of customer address changed event', async () => {
    const eventDispatcher = new EventDispatcher()
    const spyEventHandler = jest.spyOn(eventDispatcher, 'notify')

    const customer = new Customer('1', 'Henrique Lopes', eventDispatcher)
    const address = new Address('rua', 10, '12345-234', 'FSA')
    customer.changeAddress(address)

    expect(spyEventHandler).toHaveBeenCalled()
  })
})
