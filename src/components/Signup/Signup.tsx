import { useTranslation } from "../../i18n"

type SignupProps = {
    setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>
    setEmailAddress: React.Dispatch<React.SetStateAction<string>>
}

function Signup({ setIsSubmitted }: SignupProps) {
    const { t } = useTranslation()

    // TODO
    // UseEffect will need to be used here to add the class before removing the button.

    const handleSubmission = () => {
        setIsSubmitted(true)
    }

    return (
        <div>
            <h1>{t("signUp.stayUpdated")}</h1>
            <p>{t("signUp.callToAction")}</p>
            <ul>
                <li>{t("signUp.bullet1")}</li>
                <li>{t("signUp.bullet2")}</li>
                <li>{t("signUp.bullet3")}</li>
            </ul>
            <form>
                <label>{t("signUp.emailAddress")}
                    <input type="text"/>
                </label>
                <button type="button" onClick={handleSubmission}>
                    {t("signUp.submitButton")}
                </button>
            </form>
        </div>
    )
}

export default Signup