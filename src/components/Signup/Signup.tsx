import { useTranslation } from "../../i18n";

function Signup() {
    const { t } = useTranslation();

    return (
        <h1>{t("stayUpdated")}</h1>
    )
}

export default Signup