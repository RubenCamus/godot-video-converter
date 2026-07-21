import styles from './SecondaryButton.module.css';


export default function SecondaryButton({content}: {content: string} ) {
  return (
    <button className={styles.secondaryButton}>{content}</button>
  )
}
