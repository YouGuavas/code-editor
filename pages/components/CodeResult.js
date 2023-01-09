export default function CodeRunner(props) {
    return (
        <iframe id="code-runner">
            {props.htmlValue}
        </iframe>
    )
}