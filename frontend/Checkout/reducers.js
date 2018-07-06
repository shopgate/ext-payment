export default (state = {}, action) => {
  switch (action.type) {
    case 'PAYMENT_METHODS':
      return {
        methods: action.methods,
        context: {
          shippingMethod: action.checkout.shippingMethod || null,
          billingAddress: action.checkout.billingAddress || null,
        },
      };

    case 'SELECT_PAYMENT_METHOD':
      return {
        ...state,
        methods: state.methods.map(m => ({
          ...m,
          selected: m.id === action.method.id,
        })),
      };

    case 'CHECKOUT_SUCCESS':
      return {
        ...state,
        methods: null,
        context: null,
      };

    default:
      return state;
  }
};
