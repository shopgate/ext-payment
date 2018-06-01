const assert = require('assert')
const executeStep = require('../../../payment/setPaymentMethodSelection')
const createContext = require('../../mock/createContext')

describe('setPaymentMethodSelection', () => {
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

  it('Should not select anything if no data is available', async () => {
    // nothing was selected, so there should be no selection returned
    const context = createContext('user', () => null, () => {}, () => {}, 1)
    const input = {
      checkout: {},
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

  it('Should return last payment method as selected, if nothing else available', async () => {
    // no fronteend selection given, so it should take it from the last order
    const context = createContext('user', () => mockedMethod1.id, () => {}, () => {}, 1)
    const input = {
      checkout: {},
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

  it('Should prioritize the payment selection from frontend over the payment from last order', async () => {
    // select 1 and 2, but 2 should be prioritized over 1
    const context = createContext('user', () => mockedMethod1.id, () => {}, () => {}, 1)
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

  it('Should not select any payment if the selection is not available', async () => {
    // set mocked payment methods 1 and 2 to "selected"
    const context = createContext('user', () => mockedMethod1.id, () => {}, () => {}, 1)
    const input = {
      checkout: {
        paymentMethod: mockedMethod2
      },
      // payment methods 1 and 2 are not selectable
      paymentMethods: [
        mockedMethod3
      ]
    }

    // mocked payment methods 1 and 2 were selected but only not-selected method 3 is expected
    const expectedOutput = {
      paymentMethods: [
        {...mockedMethod3, selected: false}
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
