import * as tw from "./Global/Thingworx/thingworx_api_module.js"

test('Ritorna i dati clienti delle celle', () => {
  expect(tw.service_01_getDryersGeneralInfo('Storci.Thing.Canossa'))
})
