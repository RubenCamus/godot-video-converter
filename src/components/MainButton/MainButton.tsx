import styles from './MainButton.module.css';


export default function MainButton({ content, onClick  }: { content: string, onClick?: () => void}) {
  return (
    <button onClick={onClick} className={styles.mainButton}>{ content }</button>
  )
}
