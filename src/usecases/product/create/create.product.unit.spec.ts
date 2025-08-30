import { CreateProductUseCase } from './create.product.usecase'

const makeProductRepository = () => ({
  create: jest.fn(),
  find: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
})

describe('Unit test for create product', () => {
  it('should be able to create a product', async () => {
    const repository = makeProductRepository()
    const useCase = new CreateProductUseCase(repository)

    const input = {
      type: 'a',
      name: 'Product',
      price: 10,
    }

    const output = await useCase.execute(input)

    expect(output).toStrictEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    })
  })
})
