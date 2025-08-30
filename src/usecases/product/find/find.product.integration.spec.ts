import { Sequelize } from 'sequelize-typescript'
import ProductFactory from '../../../domain/product/factory/product.factory'
import { FindProductUseCase } from './find.product.usecase'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import Product from '../../../domain/product/entity/product'

describe('Unit test for find a product', () => {
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

  it('should be able to find a product', async () => {
    const productRepository = new ProductRepository()
    const product = ProductFactory.create('a', 'Product', 10)
    await productRepository.create(product as Product)

    const useCase = new FindProductUseCase(productRepository)

    const output = await useCase.execute({ id: product.id })

    expect(output).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    })
  })
})
