export const formatCurrency = salary => {
  if (!salary) return ''

  return Number(salary).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  })
}

export const formatDistance = distance => {
  if (distance >= 1000) {
    return `${(distance / 1000).toFixed(1)} km`
  }

  return `${distance} m`
}

export const formatDate = date => {
  return new Date(date).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}