import React from "react";

import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { javascript } from "@codemirror/lang-javascript";
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import {aura, bbedit} from '@uiw/codemirror-themes-all';
import { useState } from "react";

import Editor from './components/Editor';
import CodeRunner from "./components/CodeResult";


export default function Home() {
  const themes = {
    'Aura': {theme: aura, bgColor: 'rgb(34,31,47)', color: 'cyan'},
    'Bbedit': {theme: bbedit, bgColor: 'white', color: 'black'}
  }
  const [themeName, setThemeName] = useState('Aura');
  const [htmlValue, setHTMLValue] = useState('');
  const [cssValue, setCSSValue] = useState('');
  const [jsValue, setJSValue] = useState('');
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
  
  const populateThemeDropDown = () => {
    return Object.keys(themes).map((item, index) => {
      return <option key={index} value={item}>{item}</option> 
    })
  }

  const handleThemeDropDown = (event) => {
    setThemeName(event.target.value);
  }
  const renderEditor = (lang, index) => {
    return <Editor key={index} themeColor={themes[themeName].color} themeBgColor={themes[themeName].bgColor} setCodeValue={lang.fn} theme={themes[themeName] || aura} title={lang.title} extensions={lang.extensions} />
  }

  const run = () => {
    if (typeof window === 'object') {
      const doc = document.getElementById('code-runner').contentWindow.document;
      doc.open();
      doc.write(`<script>${jsValue}</script>`)
      doc.write(`<style>${cssValue}</style>`)
      doc.write(htmlValue);
      doc.close();
    }
  }

  return (
    <>
      <Head>
        <title>Code Editor</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h2>Theme: </h2>
        <select onChange={handleThemeDropDown}>
          {populateThemeDropDown()}
        </select>
        <section className={styles.editorContainer}>

          {Object.keys(langs).map((item, index) => {
            return renderEditor(langs[item], index)
          })}
        </section>

        <section>
          <CodeRunner themeBgColor={themes[themeName].bgColor} htmlValue={htmlValue}/>
        </section>
        <button style={{backgroundColor: themes[themeName].bgColor, color: themes[themeName].color}} className="run" onClick={() => run()}>Run Code</button>
      </main>
    </>
  )
}
