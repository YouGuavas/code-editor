import { useEffect } from "react"


export default function CodeRunner(props) {
    useEffect(() => {
        const doc = document.getElementById('code-runner').contentWindow.document;
        //doc is iframe content
        doc.querySelector('html').style.backgroundColor='black';
        //set base style
        //TODO: match base style to chosen theme

    })
    return (
        <iframe id="code-runner">
        </iframe>
    )
}