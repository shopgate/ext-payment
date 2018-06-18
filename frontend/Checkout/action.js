import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';

export default (checkout = {}) => (dispatch) => {
  new PipelineRequest('shopgate.checkout.getPaymentMethods')
    .setInput({ checkout })
    .dispatch()
    .then(({ paymentMethods }) => {
      dispatch({
        type: 'PAYMENT_METHODS',
        methods: paymentMethods,
      });
    });
};
