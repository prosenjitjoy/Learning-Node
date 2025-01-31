import test from 'node:test'
import { describe, it, mock } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import { addProduct, getProductById } from './products.js'
import { createOrder, updateOrderStatus } from './orders.js'

// test('doubles items for a 2*x transformer', function () {
//   // Arrange
//   const inputArray = [1, 2, 3, 10]
//   const expectedResult = [2, 4, 6, 20]

//   // Act
//   const actualResult = inputArray.map(function (x) {
//     return 2 * x
//   })

//   // Assert
//   assert.deepEqual(actualResult, expectedResult)
// })

describe('The map method on arrays', function () {
  it('doubles item for a 2*x transform', function () {
    const inputArray = [1, 2, 3, 10]
    const expectedResult = [2, 4, 6, 20]

    const actualResult = inputArray.map(function (x) {
      return 2 * x
    })

    assert.deepEqual(actualResult, expectedResult)
  })
  it('triples item for a 3*x transform', function () {
    const inputArray = [1, 2, 3, 10]
    const expectedResult = [3, 6, 9, 30]

    const actualResult = inputArray.map(function (x) {
      return 3 * x
    })

    assert.deepEqual(actualResult, expectedResult)
  })
})

// test('deep vs shallow equality check', function () {
//   const arrA = [1, 4, 16]
//   const arrB = [2 - 1, 2 * 2, 4 ** 2]
//   // assert.equal(arrA, arrB) // AssertionError
//   assert.deepEqual(arrA, arrB)
// })

describe('getProductById', function () {
  it('find a product that exists', function () {
    const product = getProductById(2);
    assert.deepEqual(product, {
      id: 2,
      name: 'Laptop',
      price: 2000
    })
  })

  it('returns undefined for a product that does not exist', function () {
    const product = getProductById(-1)
    assert.equal(product, undefined)
  })
})

describe('Order Management', function () {
  it('places an order and updates its status', function () {
    const newOrder = createOrder(1, 1)
    const updatedOrder = updateOrderStatus(newOrder.id, 'completed')

    assert.equal(updatedOrder.status, 'completed')
  })
})

describe('Order Creation', function () {
  it('integrates with product retrieval', function () {
    const product = getProductById(1)
    const order = createOrder(product.id, 2)
    assert.equal(order.productId, product.id)
    assert.equal(order.quantity, 2)
  })
})

describe('From product addition to order completion', function () {
  it('e2e works', function () {
    addProduct({ id: 4, name: 'Tablet', price: 500 })
    const product = getProductById(4)
    const order = createOrder(product.id, 1)
    const finalOrder = updateOrderStatus(order.id, 'completed')
    assert.equal(product.name, 'Tablet')
    assert.equal(finalOrder.status, 'completed')
  })
})

describe('Mocking', { todo: true }, function () {
  it("setTimeout", function () {
    const fn = mock.fn()
    mock.timers.enable({ apis: ['setTimeout'] })
    setTimeout(fn, 500)
    assert.equal(fn.mock.callCount(), 0)
    mock.timers.tick(500)
    assert.equal(fn.mock.callCount(), 1)
  })
  it('Date', function (context) {
    context.mock.timers.enable({ apis: ['Date'] })
    assert.equal(Date.now(), 0)
    context.mock.timers.tick(100)
    assert.equal(Date.now(), 100)
  })
})

test('top level test', { skip: true }, async function (context) {
  context.afterEach(function (ctx) {
    return ctx.diagnostic(`Finished running ${ctx.name}`)
  })
  context.after(function (ctx) {
    return ctx.diagnostic(`Finished running ${ctx.name}`)
  })
  await context.test('subtest 1', function (ctx) {
    assert.equal(1, 1)
  })
  await context.test('subtest 2', function (ctx) {
    assert.equal(2, 2)
  })
})

