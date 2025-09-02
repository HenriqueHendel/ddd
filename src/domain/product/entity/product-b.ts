import { AbstractEntity } from '../../@shared/entity/entity.abstract'
import { NotificationError } from '../../@shared/notification/notification.error'
import { ProductValidatorFactory } from '../factory/product.validator.factory'
import ProductInterface from './product.interface'

export default class ProductB
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
    return this._price * 2
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
    ProductValidatorFactory.create().validate(this)
    return true
  }
}
