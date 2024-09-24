import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import styles from './LanguageSelect.module.scss'

function LanguageSelect() {
    const { t } = useTranslation();

    const changeLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = event.target.value;
        i18n.changeLanguage(selectedLanguage);
    };

    return (
            <label aria-label={t('language')}>
                <div >
                    <select className={styles.languageSelect} onChange={changeLanguage}>
                        <option value="en">English</option>
                        <option value="nl">Nederlands</option>
                        <option value="es">Español</option>
                        <option value="de">Deutsch</option> 
                        <option value="fr">Français</option>
                    </select>
                </div>
            </label>
    );
}

export default LanguageSelect;