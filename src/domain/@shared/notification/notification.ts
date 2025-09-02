export interface NotificationErrorProps {
  message: string
  context: string
}

export class Notification {
  private _errors: NotificationErrorProps[] = []

  addError(error: NotificationErrorProps) {
    this._errors.push(error)
  }

  messages(context?: string) {
    const errors = context
      ? this._errors.filter((error) => error.context === context)
      : this._errors

    return errors
      .map((error) => `${context ?? error.context}: ${error.message}`)
      .join(', ')
  }

  errors(): NotificationErrorProps[] {
    return this._errors
  }

  hasErrors() {
    return this._errors.length > 0
  }
}
