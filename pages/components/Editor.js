import CodeMirror from '@uiw/react-codemirror';
import styles from '../../styles/Editor.module.scss';

export default function Editor(props) {

  const handleActive = () => {
    if (props.index === props.activeEditor) {
      return `${styles.codeMirrorWrapper} ${styles.active}`;
    } else {
      return `${styles.codeMirrorWrapper}`;
    }
  }
  
  
    return (
        <div className={handleActive()} onClick={props.setActiveEditor}>
          <h3 style={{backgroundColor: props.themeBgColor, color: props.themeColor}} >{props.title}</h3>
          <CodeMirror value={props.value} onChange={(e, lang)=>props.setCodeValue(e, lang)} theme={props.theme.theme} height='200px' extensions={props.extensions}/>
        </div>

    )
}