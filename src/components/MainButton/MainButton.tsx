import styles from './MainButton.module.css';


export default function MainButton({ content }: { content: string }) {
  return (
    <button className={styles.mainButton}>{ content }</button>
  )
}
