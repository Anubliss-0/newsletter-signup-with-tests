import { useState } from "react"
import { withTranslation } from "../../i18n"
import styles from "./Signup.module.scss"

type SignupProps = {
    setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>
    setEmailAddress: React.Dispatch<React.SetStateAction<string>>
    t: (key: string) => string
}

function Signup({ setIsSubmitted, setEmailAddress, t }: SignupProps) {
    const [emailInput, setEmailInput] = useState("")
    const [fadeComponent, setFadeComponent] = useState(false)
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

    const handleSubmission = async () => {
        setEmailAddress(emailInput)
        setFadeComponent(true)

        await delay(1000)

        setIsSubmitted(true)
        setFadeComponent(false)
    };

    return (
        <div className={fadeComponent ? styles.fadeComponent : ""}>
            <h1>{t("signUp.stayUpdated")}</h1>
            <p>{t("signUp.callToAction")}</p>
            <ul>
                <li>{t("signUp.bullet1")}</li>
                <li>{t("signUp.bullet2")}</li>
                <li>{t("signUp.bullet3")}</li>
            </ul>
            <form>
                <label>{t("signUp.emailAddress")}
                    <input type="text" onChange={(e) => setEmailInput(e.target.value)} />
                </label>
                <button type="button" onClick={handleSubmission}>
                    {t("signUp.submitButton")}
                </button>
            </form>
        </div>
    )
}

export { Signup }
const SignupWithTranslation = withTranslation()(Signup)
export default SignupWithTranslation