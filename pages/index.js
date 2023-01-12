import React, { useState, useEffect, use } from "react";


import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import editorStyles from '../styles/Editor.module.scss';
import { javascript } from "@codemirror/lang-javascript";
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import {aura, bbedit, bespin, githubLight, githubDark, solarizedLight, solarizedDark, noctisLilac, tokyoNightStorm, tokyoNightDay} from '@uiw/codemirror-themes-all';

import Editor from './components/Editor';
import CodeRunner from "./components/CodeResult";


export default function Home() {
  const themes = {
    'Aura': {theme: aura, bgColor: 'rgb(34,31,47)', color: 'white'},
    'Bbedit': {theme: bbedit, bgColor: 'white', color: 'black'},
    'Bespin': {theme: bespin, bgColor: 'rgb(41,33,27)', color: 'gray'},
    'Github Dark': {theme: githubDark, bgColor: 'rgb(12,17,24)', color: 'gray'},
    'Github Light': {theme: githubLight, bgColor: 'white', color: 'black'},
    'Noctis Lilac': {theme: noctisLilac, bgColor: 'rgb(242, 240, 249)', color: 'rgb(92,67,160)'},
    'Solarized Dark': {theme: solarizedDark, bgColor: 'rgb(0,43,56)', color: 'rgb(138,157,157)'},
    'Solarized Light': {theme: solarizedLight, bgColor: 'rgb(254,247,227)', color: 'rgb(112,134,140)'},
    'Tokyo Night Day': {theme: tokyoNightDay, bgColor: 'rgb(225,226,231)', color: 'rgb(55,85,198)'	},
    'Tokyo Night Storm': {theme: tokyoNightStorm, bgColor: 'rgb(36,38,61)', color: 'rgb(116,122,166)'},
  }
  const [themeName, setThemeName] = useState('Aura');
  const [htmlValue, setHTMLValue] = useState('');
  const [cssValue, setCSSValue] = useState('');
  const [jsValue, setJSValue] = useState('');
  const [activeEditor, setActiveEditor] = useState(0);
  const langs = {
    html: {
      title: "HTML",
      extensions: [html({ matchClosingTags: true })],
      fn: setHTMLValue
    },
    css: {
      title: "CSS",
      extensions: [css()],
      fn: setCSSValue
    },
    javascript: {
      title: "Javascript",
      extensions: [javascript({ jsx: true })],
      fn: setJSValue
    }
  }

  const updateLocalStorage = (updating, update) => {
    let data = localStorage.getItem('browser-code-editor-7746');
    if (data) {
      data = JSON.parse(data);
      data[updating] = update;
      localStorage.setItem('browser-code-editor-7746', JSON.stringify(data));
    } else {
      localStorage.setItem('browser-code-editor-7746', JSON.stringify({
        theme: 'Aura',
        html: htmlValue,
        css: cssValue,
        javascript: jsValue
      }))
    }
  }
  
  const populateThemeDropDown = () => {
    return Object.keys(themes).map((item, index) => {
        return <option key={index} value={item}>{item}</option> 
    })
  }
  const handleThemeDropDown = (event) => {
    updateLocalStorage('theme', event.target.value);
    setThemeName(event.target.value);
  }
  const handleChange = (e, lang) => {
    langs[lang].fn(e, () => {
      if (typeof window === 'object') {
        const doc = document.getElementById('code-runner').contentWindow.document;
        doc.open();
        doc.write(`<script>${jsValue}</script>`)
        doc.write(`<style>${cssValue}</style>`)
        doc.write(htmlValue);
        doc.close();
      }
    });
    updateLocalStorage(lang, e);
  }


  const renderEditor = () => {
    const handleValue = (lang) => {
      if (langs[lang].title === 'Javascript') { 
        return jsValue;
      } else if (langs[lang].title === 'CSS') { 
        return cssValue;
      } else {
        return htmlValue;
      }
    }

    return Object.keys(langs).map((lang, index) => {
      return <Editor value={handleValue(lang)} key={index} activeEditor={activeEditor} setActiveEditor={() => setActiveEditor(index)} index={index} themeColor={themes[themeName].color} themeBgColor={themes[themeName].bgColor} setCodeValue={(e) => handleChange(e, lang)} theme={themes[themeName] || aura} title={langs[lang].title} extensions={langs[lang].extensions} />
    })
  }
  const renderMobileH3 = () => {
    return Object.keys(langs).map((lang, index) => {
      if (index === activeEditor) {
        return <h3 onClick={() => setActiveEditor(index)} className={editorStyles.activeH3} style={{backgroundColor: themes[themeName].bgColor, color: themes[themeName].color}} key={index}>{langs[lang].title}</h3>
      } else {
        return <h3 onClick={() => setActiveEditor(index)} style={{backgroundColor: themes[themeName].bgColor, color: themes[themeName].color}} key={index}>{langs[lang].title}</h3>
      }
    })
  }

  const run = (js=false) => {
    if (typeof window === 'object') {
      const doc = document.getElementById('code-runner').contentWindow.document;
      doc.open();
      if (js) doc.write(`<script>${jsValue}</script>`)
      doc.write(`<style>${cssValue}</style>`)
      doc.write(htmlValue);
      doc.close();
    }
  }

 
useEffect(() => {
  run();
}, [htmlValue, cssValue])

 useEffect(() => {
  let data = localStorage.getItem('browser-code-editor-7746');
  if (data) {
    data = JSON.parse(data);
    setThemeName(data.theme);
    setHTMLValue(data.html);
    setCSSValue(data.css);
    setJSValue(data.javascript);
  }
 }, [])

  return (
    <>
      <Head>
        <title>Code Editor</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <form className="theme-selection" name='theme-selection'>
          <label className='theme-label' htmlFor='theme-dropdown'>Theme: </label>
          <select value={themeName} name='theme-dropdown' className='theme-dropdown' onChange={handleThemeDropDown}>
            {populateThemeDropDown()}
          </select>
        </form>
        <section className={styles.editorContainer}>
          <div className={editorStyles.mobileH3Container}>
            {renderMobileH3()}
          </div>
          {renderEditor()}
        </section>

        <section>
          <CodeRunner themeBgColor={themes[themeName].bgColor}/>
        </section>
        <button style={{backgroundColor: themes[themeName].bgColor, color: themes[themeName].color}} className="run" onClick={() => run(true)}>Run Code</button>
      </main>
    </>
  )
}
