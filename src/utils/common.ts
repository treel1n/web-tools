export const fmtDate = (function() {
  const formater = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  })
  return (t?: number | Date) => formater.format(t)
})()