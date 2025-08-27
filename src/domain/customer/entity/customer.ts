import EventDispatcher from '../../@shared/event/event-dispatcher'
import { AddressChangedEvent } from '../event/address-changed.event'
import { DisplayMessageWhenCustomerAddressIsChangedHandler } from '../event/handler/display-message-when-address-is-changed.handler'
import Address from '../value-object/address'

export default class Customer {
  private _id: string
  private _name: string = ''
  private _address!: Address
  private _active: boolean = false
  private _rewardPoints: number = 0
  private _eventDispatcher?: EventDispatcher

  constructor(id: string, name: string, eventDispatcher?: EventDispatcher) {
    this._id = id
    this._name = name
    if (eventDispatcher) {
      this._eventDispatcher = eventDispatcher
    }
    this.validate()
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get rewardPoints(): number {
    return this._rewardPoints
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error('Id is required')
    }
    if (this._name.length === 0) {
      throw new Error('Name is required')
    }
  }

  changeName(name: string) {
    this._name = name
    this.validate()
  }

  get Address(): Address {
    return this._address
  }

  changeAddress(address: Address) {
    this._address = address

    const event = new AddressChangedEvent({
      customerId: this._id,
      customerName: this._name,
      address: address.toString(),
    })

    const eventHadler = new DisplayMessageWhenCustomerAddressIsChangedHandler()

    if (this._eventDispatcher) {
      this._eventDispatcher.register(event.constructor.name, eventHadler)
      this._eventDispatcher.notify(event)
    }
  }

  isActive(): boolean {
    return this._active
  }

  activate() {
    if (this._address === undefined) {
      throw new Error('Address is mandatory to activate a customer')
    }
    this._active = true
  }

  deactivate() {
    this._active = false
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points
  }

  set Address(address: Address) {
    this._address = address
  }
}
