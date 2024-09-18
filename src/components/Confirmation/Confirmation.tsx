import { useTranslation } from "../../i18n"

type ConfirmationProps = {
    setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>
    emailAddress: string
}

function Confirmation({ setIsSubmitted, emailAddress }: ConfirmationProps) {
    const { t } = useTranslation()

    return (
        <div>
            <h1>{t("confirmation.thanks")}</h1>
            <p>{t("confirmation.message", { email: emailAddress })}</p>
        </div>
    )
}

export default Confirmation