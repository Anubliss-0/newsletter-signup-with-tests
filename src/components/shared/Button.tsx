import { withTranslation } from "../../i18n"
import styles from './Button.module.scss'

type ButtonProps = {
    t: (key: string) => string
}

function Button({ t }: ButtonProps) {
    return (
        <button className={styles.button}>
            {t("signUp.submitButton")}
        </button>
    )
}

export { Button }
const ButtonWithTranslation = withTranslation()(Button)
export default ButtonWithTranslation