import styles from './Footer.module.css';
import githubIcon from '../../assets/github-white-icon.svg';
import discordIcon from '../../assets/discord-icon.svg';
export default function Footer() {

  return (
    <footer className={styles.footer}>
      <div>
        <a href="github.com/RubenCamus" onClick={
          (event) => {
            event.preventDefault();
            window.api.openLink('https://www.github.com/RubenCamus'); // electron api call to open github link in browser

        }}><img src={githubIcon} alt="github logo" /></a>
      </div>
      <p>Created by RubenC</p>
      <p>For any issues, suggestions or collaboration. </p> <a href="riisenx"><img src={discordIcon} alt="discord logo" /></a> <span>riisenx </span>
    </footer>
  )
}
