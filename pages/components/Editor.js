import CodeMirror from '@uiw/react-codemirror';


export default function Editor(props) {
    return (
        <div className="codemirror-wrapper">
          <h3>{props.title}</h3>
          <CodeMirror onChange={(e)=>props.setCodeValue(e)} theme={props.theme} height="200px" width="400px" extensions={props.extensions}/>
        </div>

    )
}