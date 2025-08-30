import { Sequelize } from 'sequelize-typescript'
import ProductFactory from '../../../domain/product/factory/product.factory'
import { ListAllProductsUseCase } from './list.product.usecase'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import Product from '../../../domain/product/entity/product'

describe('Test suit from list all products', () => {
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
  it('should list all products', async () => {
    const repository = new ProductRepository()

    const productA = ProductFactory.create('a', 'Product A', 10)
    const productB = ProductFactory.create('a', 'Product ABC', 20)

    await Promise.all([
      repository.create(productA as Product),
      repository.create(productB as Product),
    ])

    const useCase = new ListAllProductsUseCase(repository)

    const output = await useCase.execute({})

    expect(output.products).toHaveLength(2)
    expect(output.products[0].id).toEqual(productA.id)
    expect(output.products[0].name).toEqual(productA.name)
    expect(output.products[0].price).toEqual(productA.price)

    expect(output.products[1].id).toEqual(productB.id)
    expect(output.products[1].name).toEqual(productB.name)
    expect(output.products[1].price).toEqual(productB.price)
  })
})
