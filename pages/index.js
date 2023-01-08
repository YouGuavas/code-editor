import React from "react";

import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { javascript } from "@codemirror/lang-javascript";
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import {aura} from '@uiw/codemirror-theme-aura';
import { useState } from "react";

import Editor from './components/Editor';


export default function Home() {
  const [theme, setTheme] = useState(aura);
  const langs = {
    html: {
      title: "HTML",
      extensions: [html({ matchClosingTags: true })]
    },
    css: {
      title: "CSS",
      extensions: [css()]
    },
    javascript: {
      title: "Javascript",
      extensions: [javascript({ jsx: true })]
    }
  }
  
  const renderEditor = (lang) => {
    return <Editor theme={theme || aura} title={lang.title} extensions={lang.extensions} />
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
      <section className={styles.editorContainer}>
        {Object.keys(langs).map((item) => {
          return renderEditor(langs[item])
        })}
        </section>

        <div className={styles.center}>
          
        </div>

        
      </main>
    </>
  )
}
