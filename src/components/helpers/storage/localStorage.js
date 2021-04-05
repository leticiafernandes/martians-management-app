const isKeyDefined = (key) => {
  return !!localStorage.getItem(key)
}

const setItem = (key, value) => {
  if (!key || !value) return
  localStorage.setItem(key, JSON.stringify(value))
}

const getItem = (key) => {
  if (!key) return
  return JSON.parse(localStorage.getItem(key))
}

export { isKeyDefined, setItem, getItem }
