const assert = require('assert')
const executeStep = require('../../../../payment/rules/preSelectByLastOrder')
const createContext = require('../../../mock/createContext')

describe('preSelectByLastOrder', () => {
  const mockedMethod1 = {
    id: 'paypal',
    name: 'Paypal',
    description: 'Pay with paypal',
    amount: 0,
    icon: null
  }
  const mockedMethod2 = {
    id: 'stripe',
    name: 'Credit card',
    description: 'Pay with credit card',
    amount: 0,
    icon: null
  }

  it('Should not select anything if no last order is available', async () => {
    const context = createContext('user', () => null, () => {}, () => {}, 1)
    const input = {
      orders: [],
      paymentMethods: [
        mockedMethod1,
        mockedMethod2
      ]
    }

    const expectedOutput = {
      paymentMethods: [
        {...mockedMethod1, selected: false},
        {...mockedMethod2, selected: false}
      ]
    }

    let output
    try {
      // noinspection JSCheckFunctionSignatures
      output = await executeStep(context, input)
    } catch (err) {
      assert.ifError(err)
    }

    assert.deepEqual(output, expectedOutput)
  })

  it('Should select payment method by order', async () => {
    const context = createContext('user', () => mockedMethod1.id, () => {}, () => {}, 1)
    const input = {
      orders: [
        {
          paymentMethod: {
            id: mockedMethod1.id
          }
        }
      ],
      paymentMethods: [
        mockedMethod1,
        mockedMethod2
      ]
    }

    const expectedOutput = {
      paymentMethods: [
        {...mockedMethod1, selected: true},
        {...mockedMethod2, selected: false}
      ]
    }

    let output
    try {
      // noinspection JSCheckFunctionSignatures
      output = await executeStep(context, input)
    } catch (err) {
      assert.ifError(err)
    }

    assert.deepEqual(output, expectedOutput)
  })
})
