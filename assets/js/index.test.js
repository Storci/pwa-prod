import createCard from "./Global/Thingworx/thingworx_api_module.js"

test('Effettua la creazione delle card della pagina 01_Customers', () => {
  tw.getCustomersList()
  .then(customerList => {
    // Genera html della card del cliente
    expect(() => createCard(customerList)).toThrow();
  })
})
