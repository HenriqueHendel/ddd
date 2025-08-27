import EventDispatcher from '../../@shared/event/event-dispatcher'
import Customer from '../entity/customer'

describe('Customer Created Event Dispatcher test', () => {
  it('should dispach the handlers of customer created event', async () => {
    const eventDispatcher = new EventDispatcher()
    const spyEventHandler = jest.spyOn(eventDispatcher, 'notify')

    // eslint-disable-next-line no-new
    new Customer('1', 'Henrique Lopes', eventDispatcher)

    expect(spyEventHandler).toHaveBeenCalled()
  })
})
