import { useState } from 'react'
import './App.css'
import Layout from './layouts/Layout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Layout>
      Content
    </Layout>
  )
}

export default App
