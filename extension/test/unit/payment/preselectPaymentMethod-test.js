const assert = require('assert')
const executeStep = require('../../../payment/preselectPaymentMethod')

describe('preselectPaymentMethod', () => {
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

  const context = {
    storage: {
      user: {
        get: () => null
      }
    }
  }

  it('Payment methods should be deselected', async () => {
    const input = {
      methods: [
        {...mockedMethod1},
        {...mockedMethod2}
      ]
    }
    const expectedOutput = {
      methods: [
        {selected: false, ...mockedMethod1},
        {selected: false, ...mockedMethod2}
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

  it('Preselect paypal payment method', async () => {
    context.storage.user.get = () => 'paypal'

    const input = {
      methods: [
        {...mockedMethod1},
        {...mockedMethod2}
      ]
    }
    const expectedOutput = {
      methods: [
        {selected: true, ...mockedMethod1}, // paypal is preselected
        {selected: false, ...mockedMethod2}
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
