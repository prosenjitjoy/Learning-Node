const orders = []

function createOrder(productId, quantity) {
  const order = {
    productId: productId,
    quantity: quantity,
    status: 'pending'
  }
  orders.push(order)
  return order
}

function updateOrderStatus(orderId, status) {
  const order = orders.find(function (order) {
    return order.id === orderId
  })
  if (order) {
    order.status = status
  }
  return order
}

export {
  createOrder,
  updateOrderStatus
}