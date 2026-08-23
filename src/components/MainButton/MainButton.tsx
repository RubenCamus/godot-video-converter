import { MouseEventHandler, useRef } from 'react';
import styles from './MainButton.module.css';


export default function MainButton({ content, onClick, canConvert }: { content: string, onClick?: () => void, canConvert?: boolean }) {
  const buttonRef = useRef(null);
  function changeStyle() {
    if (!canConvert) {
       // get button
      buttonRef.current.classList.add('disabled');
       // change button style
    } else {
      buttonRef.current.classList.remove('disabled');
    }
  }
  return (
    <button onClick={onClick} className={styles.mainButton} ref={buttonRef}>{ content }</button>
  )
}
