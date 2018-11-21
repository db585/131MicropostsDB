/**
 * EasyHTTP Library
 * Library for making HTTP requests
 *
 * @version: 0.3.0
 * @author: Brad Traversy, db585
 * @license: MIT
 *
 */

class EasyHTTP {
  // Http GET request
  async get (url) {
    // Proceed Only if promise returned by fetch is resolved
    const response = await window.fetch(url)

    // Proceed Only if response.json() is resolved
    const resData = await response.json()
    return resData
  }

  // Http POST request
  async post (url, data) {
    const response = await window.fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const resData = await response.json()
    return resData
  }

  // Http PUT request (update)
  async put (url, data) {
    const response = await window.fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const resData = await response.json()
    return resData
  }

  // Http DELETE  request
  async delete (url, data) {
    await window.fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
    return 'Resource Deleted'
  }
}

export const http = new EasyHTTP()
