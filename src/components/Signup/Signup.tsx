import { useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import styles from "./Signup.module.scss"
import desktopImage from '../../assets/images/illustration-sign-up-desktop.svg'
import mobileImage from "../../assets/images/illustration-sign-up-mobile.svg"
import Button from "../shared/Button"
import iconList from "../../assets/images/icon-list.svg"

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
            <div className={styles.mobileImage}>
                <img src={mobileImage} alt="" />
            </div>
            <div className={styles.content}>
                <div className={styles.callToAction}>
                    <h1>{t("signUp.stayUpdated")}</h1>
                    <p>{t("signUp.callToAction")}</p>
                    <ul>
                        <li><img src={iconList} alt="" /><span>{t("signUp.bullet1")}</span></li>
                        <li><img src={iconList} alt="" /><span>{t("signUp.bullet2")}</span></li>
                        <li><img src={iconList} alt="" /><span>{t("signUp.bullet3")}</span></li>
                    </ul>
                </div>
                <form className={styles.form} onSubmit={handleSubmission}>
                    <label>
                        <div className={styles.labels}>
                            {t("signUp.emailAddress")}
                            {invalidEntry && (
                                <span role="alert" className={styles.errorMessage}>
                                    {t("signUp.invalidEntryMessage")}
                                </span>
                            )}
                        </div>
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
                    <Button content={t('signUp.submitButton')} />
                </form>
            </div>
            <div className={styles.desktopImage}>
                <img src={desktopImage} alt="" />
            </div>
        </section>
    )
}

export default Signup