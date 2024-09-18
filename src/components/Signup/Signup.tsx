import { useState, useRef } from "react"
import { withTranslation } from "../../i18n"
import styles from "./Signup.module.scss"

type SignupProps = {
    setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>
    setEmailAddress: React.Dispatch<React.SetStateAction<string>>
    t: (key: string) => string
};

function Signup({ setIsSubmitted, setEmailAddress, t }: SignupProps) {
    const [emailInput, setEmailInput] = useState("")
    const [fadeDirection, setFadeDirection] = useState<"in" | "out">("in")
    const [invalidEntry, setInvalidEntry] = useState(false)
    const emailInputRef = useRef<HTMLInputElement>(null)

    const handleSubmission = () => {
        if (emailInputRef.current && !emailInputRef.current.checkValidity()) {
            setInvalidEntry(true)
            return
        }

        setFadeDirection("out")
        setInvalidEntry(false)
    };

    const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailInput(e.target.value)
        setInvalidEntry(false)
    };

    const onFadeEnd = () => {
        if (fadeDirection === "out") {
            setIsSubmitted(true)
            setEmailAddress(emailInput)
        }
    }

    return (
        <section
            className={fadeDirection === "in" ? styles.fadeInComponent : styles.fadeOutComponent}
            aria-live="polite"
            onAnimationEnd={onFadeEnd}
            data-testid="sign-up"
        >
            <h1>{t("signUp.stayUpdated")}</h1>
            <p>{t("signUp.callToAction")}</p>
            <ul>
                <li>{t("signUp.bullet1")}</li>
                <li>{t("signUp.bullet2")}</li>
                <li>{t("signUp.bullet3")}</li>
            </ul>
            <form>
                <label>
                    {t("signUp.emailAddress")}
                    <input
                        className={`${styles.input} ${invalidEntry ? styles.invalid : ""}`}
                        ref={emailInputRef}
                        type="email"
                        required
                        onChange={handleEmailInputChange}
                        aria-invalid={invalidEntry ? "true" : "false"}
                    />
                </label>

                {invalidEntry && (
                    <span role="alert" className={styles.errorMessage}>
                        {t("signUp.invalidEntryMessage")}
                    </span>
                )}

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