import { Sequelize } from 'sequelize-typescript'
import ProductFactory from '../../../domain/product/factory/product.factory'
import { UpdateProductUseCase } from './update.product.usecase'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import Product from '../../../domain/product/entity/product'

describe('Unit test for update product', () => {
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

  it('should be able to update a product', async () => {
    const respository = new ProductRepository()

    const product = ProductFactory.create('a', 'Vestido Azul', 200)
    await respository.create(product as Product)

    const useCase = new UpdateProductUseCase(respository)

    const input = {
      id: product.id,
      name: 'Vestido Azul',
      price: 500,
    }

    const output = await useCase.execute(input)

    expect(output).toStrictEqual(input)
  })
})
