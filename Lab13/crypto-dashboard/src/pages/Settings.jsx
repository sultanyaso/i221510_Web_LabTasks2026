import SettingsForm from '../components/SettingsForm'
import styles from './Settings.module.css'

export default function Settings() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>Customize your dashboard preferences</p>
      </div>
      <SettingsForm />
    </div>
  )
}
