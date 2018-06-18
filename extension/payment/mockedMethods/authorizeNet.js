
const base64icon = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAAD/2wBDAA' +
  'IBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDA' +
  'wMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAdACYDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8' +
  'QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNk' +
  'ZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAA' +
  'wEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGR' +
  'omJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1db' +
  'X2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9Jv23/wBuv4reH/2qtL+C/wAE9B0TUvF0unDVLyfViPJWMjIAyygYHJJNcn/wm/8AwUI/6Fv4T/8Af+' +
  'D/AOSK+ZP+Cu3gTx78Rf8Agqffab8N7fXrrxM3huzkSPR5HjufKEZ3kFCDtxjNeQ/8Mi/tgf8AQD+MH/gbdf8AxdAH3z/wm/8AwUI/6Fv4T/8Af+D/AOSKhv8A4lf8F' +
  'AdFsZry58M/Cpre0jaaVUmhLFVGTjE+c4FfBn/DIv7YP/QE+MH/AIG3X/xdRX37JX7XkFlNJcaL8XhAiM0he9utoUDnPz9MUAfsL/wTq/bFuP20vgEviLUdMj0jXNOvJ' +
  'NO1K2jbdGJozgsp9D6dqK8B/wCDeyGa2/ZR8SR3O8XEfiCVZQ/3g4GDn3zmigDJ8c+LdL+G/wDwXvXVNe1C10XTrrwUIIrq7kEUTOYsABjxnNYvij4S/FvVfEuo3Vj+2' +
  'L4Zs7O5uZJbeDz0/cRs5Kp9zsCB+FfZf7T/AOwr8M/2wFs28ceH49QvNPUpb3kUhhuIlPVdw6j2INeNf8OLP2e/+gDrP/gyb/CgB37Emqap8CtT1yX4lftDeGfiDDfRI' +
  'llH9rjT7IwOWPReo4r2/wAd/tT/AA3g8EawzeOPDO1bKbpqEf8AcPvXh3/Diz9nv/oA6z/4Mm/wpV/4IXfs9qwP9gawcHodSbn9KAOZ/wCCCubn9mvxdeIrNa3nii6kgk' +
  'x8sq7jyD360V9h/CL4QeHPgT4BsfDHhXS7fR9F05dsNvCOB6knqWPcmigD/9k='

/**
 * @param {SDKContext} context
 * @param {PaymentMethodInput} input
 * @returns {Promise<PaymentMethod[]>|PaymentMethod[]}
 */
module.exports = async (context, input) => {
  input.paymentMethods.push({
    id: 'authorizenet',
    name: 'Authorize.Net',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' +
    'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, ' +
    'when an unknown printer took a galley of type and scrambled it to make a type specimen book',
    amount: 0.00,
    icon: base64icon
  })

  return {paymentMethods: input.paymentMethods}
}
