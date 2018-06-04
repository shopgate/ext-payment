export default (state = {}, action) => {
  switch (action.type) {
    case 'PAYMENT_METHODS':
      return {
        ...state,
        methods: action.methods,
      };

    case 'SELECT_PAYMENT_METHOD': {
      const methods = state.methods.map(method => ({
        ...method,
        selected: method.id === action.method.id,
      }));

      return {
        ...state,
        methods,
      };
    }

    default:
      return {
        methods: [],
        ...state,
      };
  }
};
