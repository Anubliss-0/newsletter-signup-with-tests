import { useState } from "react"
import { useTranslation } from "react-i18next"
import styles from "./Confirmation.module.scss"

type ConfirmationProps = {
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>
  emailAddress: string
  setEmailAddress: React.Dispatch<React.SetStateAction<string>>
}

function Confirmation({ setIsSubmitted, emailAddress, setEmailAddress }: ConfirmationProps) {
  const { t } = useTranslation()
  const [fadeDirection, setFadeDirection] = useState<"in" | "out">("in")

  const handleDismiss = () => {
    setFadeDirection("out")
  }

  const onFadeEnd = () => {
    if (fadeDirection === "out") {
      setIsSubmitted(false)
      setEmailAddress("")
    }
  }

  return (
    <section
      className={fadeDirection === "in" ? styles.fadeInComponent : styles.fadeOutComponent}
      aria-live="polite"
      onAnimationEnd={onFadeEnd}
      data-testid="confirmation"
    >
      <h1>{t("confirmation.thanks")}</h1>
      <p>{t("confirmation.message", { email: emailAddress })}</p>
      <button type="button" onClick={handleDismiss}>
        {t("confirmation.dismiss")}
      </button>
    </section>
  )
}

export default Confirmation