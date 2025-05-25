import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LeadIntake from './components/LeadIntake'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LeadIntake />
    </>
  )
}

export default App
