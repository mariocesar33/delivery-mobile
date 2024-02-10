export function formatCurrency(value: number) {
  return value.toLocaleString('cv', {
    style: 'currency',
    currency: 'ECV',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}