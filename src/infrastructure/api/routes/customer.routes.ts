import express, { Request, Response } from 'express'
import { CreateCustomerUseCase } from '../../../usecases/customer/create/create.customer.usecase'
import CustomerRepository from '../../customer/repository/sequelize/customer.repository'
import { ListCustomerUseCase } from '../../../usecases/customer/list/list.customer.usecase'
import { CustomerPresenter } from '../presenters/customer.presenter'

export const customerRoute = express.Router()

customerRoute.post('/', async (req: Request, res: Response) => {
  const repository = new CustomerRepository()
  const useCase = new CreateCustomerUseCase(repository)

  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        city: req.body.address.city,
        zip: req.body.address.zip,
      },
    }

    const output = await useCase.execute(customerDto)

    res.send(output)
  } catch (error) {
    res.status(500).send(error)
  }
})

customerRoute.get('/', async (req: Request, res: Response) => {
  const repository = new CustomerRepository()
  const useCase = new ListCustomerUseCase(repository)

  try {
    const output = await useCase.execute()

    res.format({
      json: () => res.send(output),
      xml: () => res.send(CustomerPresenter.listXml(output)),
    })
  } catch (error) {
    res.status(500).send(error)
  }
})
