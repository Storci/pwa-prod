import { createCard } from "./01_Customers.js"

test('Effettua la creazione delle card della pagina 01_Customers', () => {
  tw.getCustomersList()
  .then(customerList => {
    // Genera html della card del cliente
    expect(() => createCard(customerList)).toThrow();
  })
})
