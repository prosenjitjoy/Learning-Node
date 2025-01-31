const products = [
  { id: 1, name: 'Phone', price: 600 },
  { id: 2, name: 'Laptop', price: 2000 },
  { id: 3, name: 'Headphone', price: 1000 }
]

function addProduct(product) {
  products.push(product)
  return product
}

function getProductById(id) {
  return products.find(function (product) {
    return product.id === id
  })
}

export {
  addProduct,
  getProductById
}