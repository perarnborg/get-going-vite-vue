export const get = (options) => makeRequest('get', options)

export const post = (options) => makeRequest('post', options)

export const put = (options) => makeRequest('put', options)

export const del = (options) => makeRequest('delete', options)

const getFormData = (data) => {
  const formData = new FormData()
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key])
  })
  return formData
}

const makeRequest = (method, options) => {
  const { url } = options
  let formData = null
  if (options.json) {
    formData = JSON.stringify(options.json)
  }
  if (options.data) {
    formData = getFormData(options.data)
  }
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    if (options.token) {
      // xhr.withCredentials = true
      xhr.setRequestHeader('Authorization', `Bearer ${options.token}`)
    }
    if (options.json) {
      xhr.setRequestHeader('Content-Type', 'application/json')
    }
    if (options.blob) {
      xhr.responseType = 'arraybuffer'
    }
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        if (options.blob) {
          const BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder
          if (BlobBuilder) {
            // android + ios chrome
            const oBuilder = new BlobBuilder()
            const aFileParts = [xhr.response]
            oBuilder.append(aFileParts[0])
            resolve(oBuilder.getBlob('text/plain'))
          } else {
            // everyone else
            resolve(new Blob([xhr.response]))
          }
          return
        }
        resolve(xhr.response)
      } else {
        const error = {
          status: xhr.status,
          statusText: xhr.statusText,
          method,
          message: errorMessage(xhr.response) ? errorMessage(xhr.response) : null
        }
        if (options.onerror) {
          options.onerror(error)
        }
        reject(new Error(error.message ? error.message : `HTTP ${error.status} error. ${error.statusText}`))
      }
    }
    xhr.onerror = () => {
      const error = {
        status: xhr.status,
        statusText: xhr.statusText,
        method
      }
      if (options.onerror) {
        options.onerror(error)
      }
      reject(new Error(`HTTP ${error.status} error. ${error.statusText}`))
    }
    if (formData) {
      xhr.send(formData)
    } else {
      xhr.send()
    }
  })
}

const errorMessage = (response) => {
  let parsedResponse = response
  if (typeof response === 'string') {
    try {
      parsedResponse = JSON.parse(response)
    } catch (error) {
      console.error(error) // eslint-disable-line no-console
    }
  }
  if (parsedResponse) {
    return parsedResponse.message
  }
  return null
}
