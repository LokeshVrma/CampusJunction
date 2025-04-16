import { useState }from 'react'

const PingBackend = () => {
    const [status, setStatus] = useState(false)
    const apiUrl = import.meta.env.VITE_API_URL;
  return (
    <div>{apiUrl}</div>
  )
}

export default PingBackend