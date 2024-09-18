import { withTranslation } from "../../i18n"

type ConfirmationProps = {
    setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>
    emailAddress: string
    t: (key: string) => string
}

function Confirmation({ setIsSubmitted, emailAddress, t }: ConfirmationProps) {
    return (
        <div data-testid = "confirmation">
            <h1>{t("confirmation.thanks")}</h1>
            <p>{t("confirmation.message", { email: emailAddress })}</p>
        </div>
    )
}

export {Confirmation}
const ConfirmationWithTranslation = withTranslation()(Confirmation)
export default ConfirmationWithTranslation