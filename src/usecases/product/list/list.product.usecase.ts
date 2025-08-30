import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface'
import { InputListProductsDto, OutputListProductsDto } from './list.product.dto'

export class ListAllProductsUseCase {
  private _productsRepository: ProductRepositoryInterface

  constructor(productsRepository: ProductRepositoryInterface) {
    this._productsRepository = productsRepository
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(input: InputListProductsDto): Promise<OutputListProductsDto> {
    const products = await this._productsRepository.findAll()

    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    }
  }
}
