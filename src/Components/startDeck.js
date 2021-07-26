import React, { useState } from 'react'
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'

import styles from 'Styles/start.module.css'



// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i) => ({
  x: 0,
  rotX: 30,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
})
const from = (_i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })

function Deck(props) {
    
  const cards = props.cards
  const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
  const [springProps, api] = useSprings(cards.length, i => ({
    ...to(i),
    from: from(i),
  })) // Create a bunch of springs using the helpers above

  const spread = ((window.innerWidth * 0.6) / cards.length) + 100
    //create an array the length of the cards, with the spread integer multiplied by the index
  const cardPositions = cards.map((card, i) => ({
    x: spread * i + 100,
    y: 0,
  }))
  const [isStacked, setIsStacked] = useState(true)
  const [draggable, setDraggable] = useState(false)
  const [selectable, setSelectable] = useState(false)
  
  console.log(cardPositions)

  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
    // If you flick hard enough it should trigger the card to fly out
    const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
    if (!down) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
    api.start(i => {
      if (index !== i) return // We're only interested in changing spring-data for the current spring
      const isGone = gone.has(index)
      const rotX = isGone ? 180 : 0
      const x = cardPositions[i].x // When a card is gone it flys out left or right, otherwise goes back to zero
      const scale = down ? 1.1 : 1 // Active cards lift up a bit
      const rot = isGone ? 0 : -10 + Math.random() * 20
      const // Active cards rotate a bit
      return {
        x,
        rotX,
        scale,
        rot,
        config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
      }
    })
    
  })
  const trans = (r, s, x) =>
  `perspective(1500px) rotateX(${x}deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`
  const cardStyle = (i) => ({
    ...styles.card,
    transform:
      `translate(${cardPositions[i].x}px, ${cardPositions[i].y}px) rotate(${cardPositions[i].rot}deg) scale(${cardPositions[i].scale})`,
  })    
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <>
      {springProps.map(({ x, y, rot, scale, rotX }, i) => (
        <animated.div className={styles.deck} key={i} style={{ x, y }}>
          {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
          <animated.div
            {...bind(i)}
            style={{
              transform: interpolate([rot, scale, rotX], trans),
              backgroundImage: `url(${cards[i]})`,
            }}
          />
           
            
        </animated.div>
      ))}
    </>
  )
}

export default Deck
