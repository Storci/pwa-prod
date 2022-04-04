import * as tw from "./Global/Thingworx/thingworx_api_module.js"

test('Ritorna la lista dei clienti', () => {
  expect(tw.getCustomersList()).not.toBeNull()
})
