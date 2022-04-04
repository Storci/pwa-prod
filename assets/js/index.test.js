const createCard = require("./01_Customers.js")
const getCustomerList = require('./Global/Thingworx/thingworx_api_module.js')

test('Effettua la creazione delle card della pagina 01_Customers', () => {
  getCustomerList()
  .then(customerList => {
    // Genera html della card del cliente
    expect(() => createCard(customerList)).toThrow();
  })
})
