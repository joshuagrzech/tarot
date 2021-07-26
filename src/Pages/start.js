import React, { useState } from 'react'
import Deck from 'Components/deck'
import styles from 'Styles/start.module.css'
import {drawMinorCard} from 'Components/Tarot/deck'
import * as Tarot from 'Components/Tarot/tarot'
require('typeface-berkshire-swash')

const cards = []
const times = 78
//push an object to the cards array 56 times
for (let i = 0; i < times; i++) {
  cards.push({back: Tarot.back, front: drawMinorCard()})
}



console.log(drawMinorCard())

export function Start() {
  return (
    <div className={styles.container}>
      <div className="deck-container">
      <Deck cards={cards} isStacked={true} draggable={false} flippable={true} layout={[3,1]}/>
      </div>
      <div className="introduction">
        <h1>Welcome to Tarot!</h1>
        <h2>Select three cards from the deck. <br/> Hold down on each card after drawing for interpretation guidence.</h2>
      </div>
    </div>
  )
}
