import React, { useState } from 'react'
import styles from 'Styles/styles.module.css'
import {Start} from 'Pages/start'

export default function App() {
  return (
    <div className={styles.container} style={{backgroundImage: 'url(/images/background.jpg)'}}>
      <Start/>
    </div>
  )
}
