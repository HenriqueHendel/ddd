import { Sequelize } from 'sequelize-typescript'
import { CreateProductUseCase } from './create.product.usecase'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'

describe('Unit test for create product', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should be able to create a product', async () => {
    const repository = new ProductRepository()
    const useCase = new CreateProductUseCase(repository)

    const input = {
      type: 'a',
      name: 'Sapato',
      price: 250,
    }

    const output = await useCase.execute(input)

    expect(output).toStrictEqual({
      id: expect.any(String),
      name: 'Sapato',
      price: 250,
    })
  })
})
