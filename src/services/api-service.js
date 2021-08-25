import { get } from './http-service'

const mockedEndpoints = ['menu_items']

const apiBase = (endpoint) => {
  if (mockedEndpoints.includes(endpoint) && process.env.NODE_ENV === 'development') {
    return 'http://localhost:3001'
  }
  return process.env.VUE_APP_API_BASE
}

const apiEndpoint = (resource) => `${apiBase(resource)}/${resource}`

export const getMenuItems = async () => {
  const response = await get({url: apiEndpoint('menu_items')})
  return JSON.parse(response)
}
