import ProductFactory from '../../../domain/product/factory/product.factory'
import { ListAllProductsUseCase } from './list.product.usecase'

const productA = ProductFactory.create('a', 'Product A', 10)
const productB = ProductFactory.create('b', 'Product B', 20)

const makeRepository = () => ({
  find: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  findAll: jest.fn().mockReturnValue(Promise.resolve([productA, productB])),
})

describe('Test suit from list all products', () => {
  it('should list all products', async () => {
    const repository = makeRepository()

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
