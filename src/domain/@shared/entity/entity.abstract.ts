import { Notification } from '../notification/notification'

export abstract class AbstractEntity {
  protected _id: string
  protected notififcation: Notification

  constructor() {
    this.notififcation = new Notification()
  }
}
