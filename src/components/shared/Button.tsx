import styles from './Button.module.scss'

type ButtonProps = {
    content: string
    onClick?: () => void 
}

function Button({ content, onClick }: ButtonProps) {
    return (
        <button className={styles.button} onClick={onClick}>
            {content}
        </button>
    )
}

export default Button