import styles from './SelectOption.module.css';

export default function SelectOption() {

  return (
    <div className={styles.selectWrapper}>
      <select className={styles.select} name="format" id="format">
        <option value="ogv">OGV</option>
        <option value="mp4">MP4</option>
        <option value="mkv">MKV</option>
        <option value="mov">MOV</option>
        <option value="gif">GIF</option>
        </select>
    </div>
  )
}
