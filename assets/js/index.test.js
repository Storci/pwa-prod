function sum(a, b) {
  return a + b;
}

test('Ritorna i dati clienti delle celle', () => {
  expect(sum(1,2)).toBe(4)
})
