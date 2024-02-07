export function formatCurrency(value: number) {
  return value.toLocaleString('cv', {
    style: 'currency',
    currency: 'ECV'
  })
}