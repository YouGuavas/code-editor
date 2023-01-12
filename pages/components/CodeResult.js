import { useEffect } from "react"
import styles from '../../styles/CodeResult.module.scss';


export default function CodeRunner(props) {
    useEffect(() => {
        const doc = document.getElementById('code-runner').contentWindow.document;
        //doc is iframe content
        doc.querySelector('html').style.backgroundColor=props.themeBgColor;
        doc.querySelector('body').style.margin=0;
        //set base style
        //TODO: match base style to chosen theme

    })
    return (
        <iframe className={styles.codeRunner} id="code-runner">
        </iframe>
    )
}