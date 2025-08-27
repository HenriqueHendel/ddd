import RepositoryInterface from '../../../../domain/@shared/repository/repository-interface'
import Order from '../../../../domain/checkout/entity/order'
import OrderItem from '../../../../domain/checkout/entity/order_item'
import OrderItemModel from './order-item.model'
import OrderModel from './order.model'

export default class OrderRepository implements RepositoryInterface<Order> {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      },
    )
  }

  async find(id: string): Promise<Order> {
    const order = await OrderModel.findOne({
      where: { id },
      include: 'items',
    })

    if (!order) {
      throw new Error('Order not found!')
    }

    const orderItems = order.items.map(
      (orderItem) =>
        new OrderItem(
          orderItem.id,
          orderItem.name,
          orderItem.price,
          orderItem.product_id,
          orderItem.quantity,
        ),
    )

    return new Order(order.id, order.customer_id, orderItems)
  }

  async findAll(): Promise<Order[]> {
    const allOrders = await OrderModel.findAll({ include: 'items' })

    return allOrders.map(
      (order) =>
        new Order(
          order.id,
          order.customer_id,
          order.items.map(
            (orderItem) =>
              new OrderItem(
                orderItem.id,
                orderItem.name,
                orderItem.price,
                orderItem.product_id,
                orderItem.quantity,
              ),
          ),
        ),
    )
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        customer_id: entity.customerId,
      },
      { where: { id: entity.id } },
    )
  }
}
