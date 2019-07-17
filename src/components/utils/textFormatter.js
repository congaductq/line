export const formatLargeNumber = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export function highlight(input, highlightText, wrapper = 'b') {
  const r = new RegExp(`(${highlightText})`, 'ig')
  return input.replace(r, `<${wrapper} class="highlight">$1</${wrapper}>`)
}
