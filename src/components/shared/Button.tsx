import { useTranslation } from 'react-i18next'
import styles from './Button.module.scss'


function Button() {
    const { t } = useTranslation()

    return (
        <button className={styles.button}>
            {t("signUp.submitButton")}
        </button>
    )
}

export default Button