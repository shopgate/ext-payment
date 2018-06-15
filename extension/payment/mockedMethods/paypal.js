const base64icon = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAATU0AKgAAAAgAAQESA' +
  'AMAAAABAAEAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw' +
  '0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA' +
  'z/wAARCAAXAEcDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQI' +
  'DAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZ' +
  'naGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx' +
  '8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBU' +
  'QdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl' +
  '6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oAD' +
  'AMBAAIRAxEAPwD9YP8Agq9/wUKk/wCCbn7NEfjiz0C28TaldanDp9vp890bdJN+dzb1Vj8oGcYr5Q8Df8HAvxB8H/HTwH4V+MvwFvP' +
  'h/pvxCaH+zL+O/eZpY5mVUlVXjUMuWXODkZrA/wCDoDV9Q8e3HwL+GeivGureItfa4iV+VYnbEhYf3QxyawfjJ/wSm+OXhfS5Pjd8b' +
  'viRo/j26+DegyXPhrQ9JtHCrJEoMatlFG1WAY4yTtr9IyfK8qWXUZ45R56vPa7fNvaNrab73Pk8djMY8XOOHvywt2t3d/kfr7Jr1jF' +
  'efZ2vLVbjG7yjKofHrjOacms2chjC3Vuxm+5iQfP9Oea/natm+Hfi/wD4Jw+JPjh4u+PfjGb9oLVLif7Dp1t4geNo5S+BAbcHOwqSSQQ' +
  'oGOK9W+N3gDxt8B/+CU37MPx20/XvEjal4T1GO91oG/mYz21xNuAcFvm5XHOcA1yVOCoxlGHttXPk1i1eVr6X3XS5tHiBtOXJolzaO+' +
  'l7a+Z+6F9qtvpw/fTwxMQSqu4Utj0r4VuP+Csnj7V5/FV54f8AhSus+HvCd3Jb3l/FfviJFYgMw8vAyBnrXz7+yTr3jf8A4KSfGXxp' +
  '+1R4yuNb8PfDPwXp89r4N0JbqSKC5lWMgyuqkK4Vjkk5BJA7V0H7FH7Kvxa+PvwC1yXw34v0rw54V8WX8q6jDLEzT3RU4fBCnjnHUV6u' +
  'TcOZdhKVarmbjJwcE+ZtKLd3JJx3aj+J+f8AG3EecVMZhsFk3OnONSXuJNtKyi3zaJcz18j9AP2UP2pNN/ag+Cln4wht20lZZXt54Z3H' +
  '7qRDhgG7j0Nd14s8a2vhnwrqWpebDKNPtJLraHHzBFLf061+adx8L9H8I/tN6X8E/E/jDUfDPgDwxp5uXdLr7H/aly43O7N0+Y9M5wBX' +
  'L+GPENr4Z8a/Gy88N+KNa17wt4Y8PS2emS3d68yuJSIwBk4OPmwcVNbgfD1a0quGqNQaU4rlduWUrRXN379jz6PijjcPho0MZSTqRbp' +
  'ylzJPnjG8pcn8q6PqfoV+xD+0/fftZ/COTxTd6NDosZvpbWCOOczCRUONxJA6+lFY/wDwTO8HDwb+xj4MiKbJL62a8kGOhdiaK+Ez6n' +
  'RpZjWpYdWhGTSXknY/VuFa+JrZPhq2MlzVJQi5Pzav+p3nxO/Za+Hvxl+IPh7xV4o8K6ZrXiHwqd2k3tyrNJYnO75ecdeeQa7rUNPg1a' +
  'wmtbqGK4trhDHLFIoZJFIwVIPBBHaiivOlVm0k29NvL07HvKnFNtLfc+d0/wCCRf7Nkd9qlyvwg8JedrR3XZMTkOc5+UbsJz/cxXF/8FG' +
  'P+CcHiX9sP4UeC/hb4P8AEWi+BfhbpNxE+tWCRSG4u4IyNkMWAVCgZ+8epoorupZxjKdWNb2jco6q7vZ99epy1MDQlBw5Uk97aH0Z4F/Z7' +
  '8J/Dv4I6f8AD3TdJt4vCmnWK6elltwjxAYO7Hc9Se5NbXw7+G+h/CnwxDo3h7TbfS9LtyWjt4RhVJOSfxoorkniKs4tSk2m7vXd9/U0W' +
  'FoqoqqiuZKydtUu1+xzfxY/Zb8AfG/VrXUPFXhfTNYvLPAimmQhwB0BKkZHsciqlp+x98NdP0jVrGDwhpENnrgQX0UcZVbgKcqCAex9K' +
  'KK3jmWLjBU41ZKK2V3ZfI455Ll86sq06EHJ7vlV36ux33h3w7ZeE9DtdN063jtLGyjEUEMYwsajoBRRRXHKTk7vc9KEYwioxVktj//Z'

/**
 * @param {SDKContext} context
 * @param {PaymentMethodInput} input
 * @returns {Promise<PaymentMethod[]>|PaymentMethod[]}
 */
module.exports = async (context, input) => {
  input.paymentMethods.push({
    id: 'paypal',
    name: 'Paypal',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' +
    'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, ' +
    'when an unknown printer took a galley of type and scrambled it to make a type specimen book',
    amount: 2.50,
    icon: base64icon
  })

  return {paymentMethods: input.paymentMethods}
}
