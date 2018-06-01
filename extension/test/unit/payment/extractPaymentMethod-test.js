const assert = require('assert')
const executeStep = require('../../../payment/extractPaymentMethod')

describe('extractPaymentMethod', () => {
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
    id: 'cashondelivery',
    name: 'Cash on delivery',
    description: 'Pay when you receive products',
    amount: -100,
    icon: null
  }

  it('Should fetch the correct payment method regardless, of what is selected', async () => {
    const input = {
      checkout: {
        paymentMethod: mockedMethod2
      },
      paymentMethods: [
        mockedMethod1,
        mockedMethod2
      ]
    }

    const expectedOutput = {
      paymentMethod: mockedMethod2
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

  it('Should not get any payment method, if the input does not contain a paymentMethodId in the checkout', async () => {
    const input = {
      checkout: {},
      paymentMethods: [
        mockedMethod1,
        mockedMethod2
      ]
    }

    const expectedOutput = {paymentMethod: undefined}

    let output
    try {
      // noinspection JSCheckFunctionSignatures
      output = await executeStep(context, input)
    } catch (err) {
      assert.ifError(err)
    }

    assert.deepEqual(output, expectedOutput)
  })

  it('Should not return any payment methods, if the requested payment method is not in the list', async () => {
    const input = {
      checkout: {
        paymentMethod: mockedMethod3
      },
      paymentMethods: [
        mockedMethod1,
        mockedMethod2
      ]
    }

    const expectedOutput = {paymentMethod: undefined}

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
