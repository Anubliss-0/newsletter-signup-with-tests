import { useState } from "react"
import { Trans, useTranslation } from "react-i18next"
import styles from "./Confirmation.module.scss"
import Button from "../shared/Button"
import successImg from '../../assets/images/icon-success.svg'

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
      className={`${styles.confirmation} ${fadeDirection === "in" ? styles.fadeInComponent : styles.fadeOutComponent}`}
      aria-live="polite"
      onAnimationEnd={onFadeEnd}
      data-testid="confirmation"
    >
      <img src={successImg} alt="" />
      <h1>{t("confirmation.thanks")}</h1>
      <Trans
        i18nKey="confirmation.message"
        values={{ email: emailAddress }}
        components={{ strong: <strong />, p: <p />}}
      >
        <p>A confirmation email has been sent to <strong>{emailAddress}</strong>. Please open it and click the button inside to confirm your subscription.</p>
      </Trans>
      <Button content={t("confirmation.dismiss")} onClick={handleDismiss} />
    </section>
  )
}

export default Confirmation