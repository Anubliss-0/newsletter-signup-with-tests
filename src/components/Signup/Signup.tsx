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
    const [fadeDirection, setFadeDirection] = useState<"in" | "out">("in");

    const handleSubmission = () => {
        setFadeDirection("out")
    };

    const onFadeEnd = () => {
        if (fadeDirection === "out") {
            setIsSubmitted(true)
            setEmailAddress(emailInput)
        }
    };

    return (
        <section
            className={fadeDirection === "in" ? styles.fadeInComponent : styles.fadeOutComponent}
            aria-live="polite"
            onAnimationEnd={onFadeEnd}
        >            <h1>{t("signUp.stayUpdated")}</h1>
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
        </section>
    )
}

export { Signup }
const SignupWithTranslation = withTranslation()(Signup)
export default SignupWithTranslation