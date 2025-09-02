import { AbstractEntity } from '../../@shared/entity/entity.abstract'
import { NotificationError } from '../../@shared/notification/notification.error'
import ProductInterface from './product.interface'

export default class Product
  extends AbstractEntity
  implements ProductInterface
{
  private _name: string
  private _price: number

  constructor(id: string, name: string, price: number) {
    super()
    this._id = id
    this._name = name
    this._price = price
    this.validate()

    if (this.notififcation.hasErrors()) {
      throw new NotificationError(this.notififcation.errors())
    }
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get price(): number {
    return this._price
  }

  changeName(name: string): void {
    this._name = name
    this.validate()
  }

  changePrice(price: number): void {
    this._price = price
    this.validate()
  }

  validate(): boolean {
    if (this._id.length === 0) {
      this.notififcation.addError({
        message: 'Id is required',
        context: 'product',
      })
    }
    if (this._name.length === 0) {
      this.notififcation.addError({
        message: 'Name is required',
        context: 'product',
      })
    }
    if (this._price <= 0) {
      this.notififcation.addError({
        message: 'Price must be greater than zero',
        context: 'product',
      })
    }
    return true
  }
}
