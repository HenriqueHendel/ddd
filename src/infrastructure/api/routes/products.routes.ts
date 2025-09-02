import express, { Request, Response } from 'express'
import ProductRepository from '../../product/repository/sequelize/product.repository'
import { CreateProductUseCase } from '../../../usecases/product/create/create.product.usecase'
import { ListAllProductsUseCase } from '../../../usecases/product/list/list.product.usecase'

export const productsRoute = express.Router()

productsRoute.post('/', async (req: Request, res: Response) => {
  const repository = new ProductRepository()
  const useCase = new CreateProductUseCase(repository)

  try {
    const productDto = {
      name: req.body.name,
      price: req.body.price,
    }
    const response = await useCase.execute(productDto)

    res.send(response)
  } catch (error) {
    res.status(500).send(error)
  }
})

productsRoute.get('/', async (req: Request, res: Response) => {
  const repository = new ProductRepository()
  const useCase = new ListAllProductsUseCase(repository)

  try {
    const response = await useCase.execute({})

    res.send(response)
  } catch (error) {
    res.status(500).send(error)
  }
})
