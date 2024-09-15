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
            {/* This line is a test, it will be interpolated later,
            Possibly can be passed to i18n and interpolated there,
            otherwise the string can just be split in two. */}
            <p>{emailAddress}</p>
        </div>
    )
}

export default Confirmation