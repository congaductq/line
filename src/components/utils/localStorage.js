function supportsLocalStorage() {
  return typeof Storage !== 'undefined'
}

export const set = (key, value) => {
  if (supportsLocalStorage()) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export const get = (key) => {
  if (supportsLocalStorage()) {
    try {
      const value = JSON.parse(localStorage.getItem(key))
      return value
    } catch (e) {
      localStorage.setItem(key, null)
      return null
    }
  }
  return undefined
}


export const KEYS = {
  TRUCK_DATA: 'TRUCK_DATA',
}

export default {
  set,
  get,
}
