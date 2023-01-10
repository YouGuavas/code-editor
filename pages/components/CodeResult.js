import { useEffect } from "react"


export default function CodeRunner(props) {
    useEffect(() => {
        const doc = document.getElementById('code-runner').contentWindow.document;
        doc.querySelector('html').style.backgroundColor='black';

    })
    return (
        <iframe id="code-runner">
        </iframe>
    )
}