import React, { useState } from 'react'

const useHttp = () => {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendRequest = async (fetchObj, dataHandle) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(fetchObj.url, {
        method: fetchObj.method || 'get',
        body: JSON.stringify(fetchObj.body) || null,
        headers: fetchObj.headers,
      })

      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})!`)
      }

      const data = await response.json()

      dataHandle(data)
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  return { sendRequest, isLoading, error }
}

export default useHttp
