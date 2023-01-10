import CodeMirror from '@uiw/react-codemirror';
import styles from '../../styles/Editor.module.scss';

export default function Editor(props) {
    return (
        <div className={styles.codeMirrorWrapper}>
          <h3 style={{backgroundColor: props.themeBgColor, color: props.themeColor}}>{props.title}</h3>
          <CodeMirror onChange={(e)=>props.setCodeValue(e)} theme={props.theme.theme} height="200px" width="400px" extensions={props.extensions}/>
        </div>

    )
}