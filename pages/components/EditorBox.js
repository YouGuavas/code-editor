import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
//import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';


export default function EditorBox(props) {
    return (
    
        <SyntaxHighlighter language={props.language} >
            <div><textarea/></div>
        </SyntaxHighlighter>
    )
}