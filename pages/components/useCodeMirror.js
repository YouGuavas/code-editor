import {useEffect, useState} from 'react';
import {EditorView, basicSetup} from 'codemirror';
import {javascript} from '@codemirror/lang-javascript';

export default function useCodeMirror(extensions) {
    const ref = useRef();
    const [view, setView] = useState();

    useEffect(() => {
        const view = new EditorView({
            extensions: [
                basicSetup,
                javascript({
                    jsx: true,
                    typescript: true,
                }),
                ...extensions,
                //spread operator expands extensions array into single elements
                //TODO: learn and understand why we spread extensions /here/
            ],
            parent: ref,
        });
        setView(view);
        return () => {
            view.destroy();
            setView(undefined);
        };
    }, []);
    return { ref, view };
}