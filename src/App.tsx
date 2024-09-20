import { useState } from "react"
import Signup from "./components/Signup/Signup"
import Confirmation from "./components/Confirmation/Confirmation"
import styles from './App.module.scss'

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [emailAddress, setEmailAddress] = useState("")

  return (
    <main className={styles.appContainer}>
      {!isSubmitted && <Signup
        setIsSubmitted={setIsSubmitted}
        setEmailAddress={setEmailAddress}
      />}
      {isSubmitted && <Confirmation
        setIsSubmitted={setIsSubmitted}
        emailAddress={emailAddress}
        setEmailAddress={setEmailAddress}
      />}
    </main>
  )
}

export default App
