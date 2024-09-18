import { useState } from "react";
import { withTranslation } from "../../i18n";
import styles from "./Confirmation.module.scss";

type ConfirmationProps = {
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  emailAddress: string;
  setEmailAddress: React.Dispatch<React.SetStateAction<string>>;
  t: (key: string) => string;
};

function Confirmation({ setIsSubmitted, emailAddress, setEmailAddress, t }: ConfirmationProps) {
  const [fadeDirection, setFadeDirection] = useState<"in" | "out">("in")

  const handleDismiss = () => {
    setFadeDirection("out");
  };

  const onFadeEnd = () => {
    if (fadeDirection === "out") {
      setIsSubmitted(false);
      setEmailAddress("");
    }
  };

  return (
    <section
      className={fadeDirection === "in" ? styles.fadeInComponent : styles.fadeOutComponent}
      aria-live="polite"
      onAnimationEnd={onFadeEnd}
    >
      <h1 id="heading">{t("confirmation.thanks")}</h1>
      <p>{t("confirmation.message", { email: emailAddress })}</p>
      <button type="button" onClick={handleDismiss}>
        {t("confirmation.dismiss")}
      </button>
    </section>
  );
}

export { Confirmation };
const ConfirmationWithTranslation = withTranslation()(Confirmation);
export default ConfirmationWithTranslation;