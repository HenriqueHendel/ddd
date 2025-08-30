import ProductFactory from '../../../domain/product/factory/product.factory'
import { UpdateProductUseCase } from './update.product.usecase'

const product = ProductFactory.create('a', 'Product', 10)

const makeProductRepository = () => ({
  create: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
  update: jest.fn(),
  findAll: jest.fn(),
})

describe('Unit test for update product', () => {
  it('should be able to update a product', async () => {
    const respository = makeProductRepository()

    const useCase = new UpdateProductUseCase(respository)

    const input = {
      id: product.id,
      name: 'updated product',
      price: 20,
    }

    const output = await useCase.execute(input)

    expect(output).toStrictEqual(input)
  })
})
