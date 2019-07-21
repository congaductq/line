export const containKeyword = (str, keyword) => !keyword || str.toString().toLowerCase().includes(keyword.toLowerCase())

export const getSortClass = (order, desc, field) => order === field ? (desc === 1 ? 'desc' : 'asc') : ''
