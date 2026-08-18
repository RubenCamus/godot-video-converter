import { useRef, useState } from 'react';
import styles from './SelectOption.module.css';


export default function SelectOption({ updateFormat }: { updateFormat: (format: string) => void }) {
// Call back function tu update parent (App.tsx) format state
  function returnFormat(value: string) {
    updateFormat(value)
  }
  return (
    <div className={styles.selectWrapper}>
      <select className={styles.select} name="format" id="format" value={"ogv"} onChange={e => returnFormat(e.target.value)}>
        <option value="ogv">OGV</option>
        <option value="mp4">MP4</option>
        <option value="mkv">MKV</option>
        <option value="mov">MOV</option>
        <option value="gif">GIF</option>
        </select>
    </div>
  )
}
