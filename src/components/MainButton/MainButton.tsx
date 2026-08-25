import { MouseEventHandler, useRef } from 'react';
import styles from './MainButton.module.css';


export default function MainButton({ content, onClick, isClickable }: { content: string, onClick?: () => void, isClickable?: boolean }) {
  const buttonRef = useRef(null);
  function changeStyle() {
    if (!isClickable) {
       // get button
      buttonRef.current.classList.add('disabled');
       // change button style
    } else {
      buttonRef.current.classList.remove('disabled');
    }
  }
  return (
    <button onClick={onClick} className={isClickable ? styles.mainButton : styles.disabled} ref={buttonRef}>{ content }</button>
  )
}
