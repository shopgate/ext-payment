export default (state = {}, action) => {
  switch (action.type) {
    case 'PAYMENT_METHODS':
      return {
        methods: action.methods,
        context: {
          shippingMethod: action.checkout.shippingMethod,
          billingAddress: action.checkout.billingAddress,
        },
      };

    case 'CHECKOUT_SUCCESS':
      return {
        ...state,
        methods: null,
        context: null,
      };

    default:
      return {
        methods: null,
        context: null,
        ...state,
      };
  }
};
