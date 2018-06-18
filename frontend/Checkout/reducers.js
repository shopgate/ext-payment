export default (state = {}, action) => {
  switch (action.type) {
    case 'PAYMENT_METHODS':
      return {
        methods: action.methods,
      };

    default:
      return {
        methods: null,
        ...state,
      };
  }
};
