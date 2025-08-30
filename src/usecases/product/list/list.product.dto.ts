export interface InputListProductsDto {}

interface Product {
  id: string
  name: string
  price: number
}

export interface OutputListProductsDto {
  products: Product[]
}
