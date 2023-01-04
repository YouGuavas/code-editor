import CodeMirror from '@uiw/react-codemirror';
import { javascript } from "@codemirror/lang-javascript";
import styles from '../../styles/Editor.module.scss';



export default function Editor(props) {
    return (
        <div className="codemirror-wrapper">
          <h3>{props.title}</h3>
          <CodeMirror theme={props.theme} height="200px" width="400px" extensions={props.extensions}/>
        </div>

    )
}