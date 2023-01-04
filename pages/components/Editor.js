import CodeMirror from '@uiw/react-codemirror';
import {aura} from '@uiw/codemirror-theme-aura';
import { javascript } from "@codemirror/lang-javascript";
import styles from '../../styles/Editor.module.scss';



export default function Editor(props) {
    return (
        <div className="codemirror-wrapper">
          <h3>{props.title}</h3>
          <CodeMirror theme={aura} height="200px" width="400px" extensions={props.extensions}/>
        </div>

    )
}