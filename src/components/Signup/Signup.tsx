import { useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import styles from "./Signup.module.scss"
import illustration from '../../assets/images/illustration-sign-up-desktop.svg'
import Button from "../shared/Button"

type SignupProps = {
    setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>
    setEmailAddress: React.Dispatch<React.SetStateAction<string>>
}

function Signup({ setIsSubmitted, setEmailAddress }: SignupProps) {
    const { t } = useTranslation()
    const [emailInput, setEmailInput] = useState("")
    const [fadeDirection, setFadeDirection] = useState<"in" | "out">("in")
    const [invalidEntry, setInvalidEntry] = useState(false)
    const emailInputRef = useRef<HTMLInputElement>(null)

    const handleSubmission = (e: React.FormEvent) => {
        e.preventDefault()

        if (!emailInputRef.current?.checkValidity()) return

        setFadeDirection("out")
        setInvalidEntry(false)
    }

    const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailInput(e.target.value)
        setInvalidEntry(false)
    }

    const onFadeEnd = () => {
        if (fadeDirection === "out") {
            setIsSubmitted(true)
            setEmailAddress(emailInput)
        }
    }

    return (
        <section
            className={`${styles.signup} ${fadeDirection === "in" ? styles.fadeInComponent : styles.fadeOutComponent}`}
            aria-live="polite"
            onAnimationEnd={onFadeEnd}
            data-testid="sign-up"
        >
            <div className={styles.left}>
                <h1>{t("signUp.stayUpdated")}</h1>
                <p>{t("signUp.callToAction")}</p>
                <ul>
                    <li>{t("signUp.bullet1")}</li>
                    <li>{t("signUp.bullet2")}</li>
                    <li>{t("signUp.bullet3")}</li>
                </ul>
                <form className={styles.form} onSubmit={handleSubmission}>
                    <label>
                        {t("signUp.emailAddress")}
                        <input
                            className={`${styles.input} ${invalidEntry ? styles.invalid : ""}`}
                            ref={emailInputRef}
                            type="email"
                            required
                            onChange={handleEmailInputChange}
                            onInvalid={() => setInvalidEntry(true)}
                            aria-invalid={invalidEntry ? "true" : "false"}
                            placeholder={t('signUp.emailPlaceholder')}
                        />
                    </label>

                    {invalidEntry && (
                        <span role="alert" className={styles.errorMessage}>
                            {t("signUp.invalidEntryMessage")}
                        </span>
                    )}

                    <Button />
                </form>
            </div>
            <div className={styles.right}>
                <img src={illustration} alt="" />
            </div>
        </section>
    )
}

export default Signup