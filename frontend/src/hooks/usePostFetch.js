import {  useState } from "react"

export const usePostFecht = (url, body, errorMessage) => {
  const [isError, setIsError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)

  const postData = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      if (!res.ok) {
        throw new Error(errorMessage)
      }
      const json = await res.json()
      setData(json)
    } catch (error) {
      setIsError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { isError, isLoading, data, postData }

}