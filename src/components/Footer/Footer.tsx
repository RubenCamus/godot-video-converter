import styles from './Footer.module.css';
export default function Footer() {

  return (
    <footer className={styles.footer}>
      <div>
        <a href="github.com/RubenCamus" onClick={
          (event) => {
            event.preventDefault();
            window.api.openLink('https://www.github.com/RubenCamus'); // electron api call to open github link in browser

        }}><img src="/src/public/github-white-icon.svg" alt="github logo" /></a>
      </div>
      <p>Created by RubenC</p>
      <p>For any issues, suggestions or collaboration. </p> <a href="riisenx"><img src="/src/public/discord-icon.svg" alt="discord logo" /></a> <span>riisenx </span>
    </footer>
  )
}
