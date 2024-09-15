import { useState } from "react"
import Signup from "./components/Signup/Signup"
import Confirmation from "./components/Confirmation/Confirmation"

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [emailAddress, setEmailAddress] = useState("")

  return (
    <>
      {!isSubmitted && <Signup
        setIsSubmitted={setIsSubmitted}
        setEmailAddress={setEmailAddress}
      />}
      {isSubmitted && <Confirmation
        setIsSubmitted={setIsSubmitted}
        emailAddress={emailAddress}
      />}
    </>
  )
}

export default App
