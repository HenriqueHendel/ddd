import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface'
import { InputFindProductDto, OutputFindProductDto } from './find.product.dto'

export class FindProductUseCase {
  private _productRepository: ProductRepositoryInterface

  constructor(productRepository: ProductRepositoryInterface) {
    this._productRepository = productRepository
  }

  async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
    const customer = await this._productRepository.find(input.id)

    return {
      id: customer.id,
      name: customer.name,
      price: customer.price,
    }
  }
}
