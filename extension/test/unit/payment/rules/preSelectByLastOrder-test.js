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

  const mockedMethod3 = {
    id: 'cod',
    name: 'Cash on delivery',
    description: 'pay on delivery',
    amount: 0,
    icon: null
  }

  it('Should not select anything if no last order is available', async () => {
    const context = createContext('user', () => null, () => {}, () => {}, 1)
    const input = {
      checkout: {},
      paymentMethods: [
        mockedMethod1,
        mockedMethod2
      ],
      orders: []
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

  it('Should select payment method by order, if no current selection is available', async () => {
    const context = createContext('user', () => mockedMethod1.id, () => {}, () => {}, 1)
    const input = {
      checkout: {},
      paymentMethods: [
        mockedMethod1,
        mockedMethod2
      ],
      orders: [
        {
          paymentMethod: {
            id: mockedMethod1.id
          }
        }
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

  it('Should not change any selection, if the current selection is available and valid', async () => {
    const context = createContext('user', () => mockedMethod1.id, () => {}, () => {}, 1)
    const input = {
      checkout: {
        paymentMethod: {
          id: mockedMethod2.id
        }
      },
      paymentMethods: [
        {...mockedMethod1, selected: false},
        {...mockedMethod2, selected: true}
      ],
      orders: [
        {
          paymentMethod: {
            id: mockedMethod1.id
          }
        }
      ]
    }

    const expectedOutput = {
      paymentMethods: [
        {...mockedMethod1, selected: false},
        {...mockedMethod2, selected: true}
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

  it('Should overwrite the current selection if it\'s outside of scope', async () => {
    const context = createContext('user', () => mockedMethod1.id, () => {}, () => {}, 1)
    const input = {
      checkout: {
        paymentMethod: {
          id: mockedMethod3.id
        }
      },
      paymentMethods: [
        mockedMethod1,
        mockedMethod2
      ],
      orders: [
        {
          paymentMethod: {
            id: mockedMethod1.id
          }
        }
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
