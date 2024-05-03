export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  
  const day = (date.getDate()) >= 10 ? (date.getDate()) : `0${(date.getDate())}`
  const month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : `0${(date.getMonth() + 1)}`
  const year = date.getFullYear()
  const hour = (date.getHours()) >= 10 ? (date.getHours()) : `0${(date.getHours())}`
  const minutes = (date.getMinutes()) >= 10 ? (date.getMinutes()) : `0${(date.getMinutes())}`

  return `${hour}:${minutes} ${day}/${month}/${year}`
}