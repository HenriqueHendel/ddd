import ProductFactory from '../../../domain/product/factory/product.factory'
import { FindProductUseCase } from './find.product.usecase'

const product = ProductFactory.create('a', 'Product', 10)

const makeProductRepository = () => ({
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
  findAll: jest.fn(),
})

describe('Unit test for find a product', () => {
  it('should be able to find a product', async () => {
    const productRepository = makeProductRepository()

    const useCase = new FindProductUseCase(productRepository)

    const output = await useCase.execute({ id: product.id })

    expect(output).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    })
  })
})
