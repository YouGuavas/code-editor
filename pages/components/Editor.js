import CodeMirror from '@uiw/react-codemirror';
import styles from '../../styles/Editor.module.scss';

export default function Editor(props) {
  const renderH3 = () => {
    if (props.index === props.activeEditor) {
      return <h3 className={styles.activeH3} onClick={props.setActiveEditor} style={{backgroundColor: props.themeBgColor, color: props.themeColor}} >{props.title}</h3>
    } else {
      return <h3 onClick={props.setActiveEditor} style={{backgroundColor: props.themeBgColor, color: props.themeColor}} >{props.title}</h3>

    }
  }
  const handleH3Style = () => {
    if (props.index === props.activeEditor) {
      return `${styles.activeH3}`
    } else {
      return ``
      //return {backgroundColor: props.themeBgColor, color: props.themeColor};
    }
  }
    return (
        <div className={styles.codeMirrorWrapper}>
          {renderH3()}
          <CodeMirror onChange={(e)=>props.setCodeValue(e)} theme={props.theme.theme} height="200px" width="400px" extensions={props.extensions}/>
        </div>

    )
}