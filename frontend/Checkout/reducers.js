export default (state = {}, action) => {
  switch (action.type) {
    case 'PAYMENT_METHODS':
      return {
        ...state,
        methods: action.methods,
      };

    case 'SELECT_PAYMENT_METHOD':
      return {
        ...state,
        selectedMethod: action.method,
      };

    default:
      return {
        methods: [],
        selectedMethod: null,
        ...state,
      };
  }
};
