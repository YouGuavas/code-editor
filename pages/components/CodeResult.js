import styles from '../../styles/CodeResult.module.scss';


export default function CodeRunner() {
    return (
        <iframe className={styles.codeRunner} id="code-runner">
        </iframe>
    )
}