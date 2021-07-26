import React, { useState } from 'react'
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'

import styles from 'Styles/styles.module.css'



// These two are just helpers, they curate spring data, values that are later being interpolated into css

const from = (_i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform



function Deck(props) {
  const cards = props.cards
  const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
  const {isStacked, draggable, selectable, flickable, flippable} = props
  const spread = ((window.innerWidth * 0.6) / cards.length) + 100
  //create an array the length of the cards, with the spread integer multiplied by the index
const cardPositions = cards.map((card, i) => ({
  x: spread * i + 100,
  y: 0,
}))
const to = (i) => {
  if (isStacked === true) {
    return { 
      x: 0,
      position: "relative",
      zIndex: i + cards.length,
      opacity: 0,
      rotX: 30,
      y: i * -1.5,
      scale: 1,
      rot: -10 + Math.random() * 20,
      delay: i * 10,
    }

  } else {
    return { 
      opacity: 0,
      position: "relative",
      x: cardPositions[i].x,
      y: i * -1.5,
      rotX: 30,
      zIndex: i,
      scale: 1,
      rot: -10 + Math.random() * 20,
      delay: i * 100,
    }
  }
}
const [flipped] = useState(() => new Set())

  const [springProps, api] = useSprings(cards.length, i => ({
    ...to(i),
    from: from(i),
  })) // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity, xy }) => {
    if (flickable === true) {
    const flickTrigger = velocity > 0.2
    if (!down && flickTrigger) gone.add(index)
    } 
    
    const numCols = props.layout[0]
      const numRows = props.layout[1]
      const numCards = cards.length
      const thisSpread = ((window.innerWidth * 0.6) / numCols)
      const cardHeight = ((window.innerHeight) / numRows)
      const xArr = []
      const yArr = []
      for (let i = 0; i < numCols; i++) {
        xArr.push(i * (thisSpread))
      }
      for (let i = 0; i < numRows; i++) {
        yArr.push(i * (cardHeight))
      }
      const eXArr = xArr[Symbol.iterator]()  
      const eYArr = yArr[Symbol.iterator]()
      const layoutXArray = Array(Math.ceil(numCards / numCols)).fill(xArr).flat()
      const layoutYArray = Array(Math.ceil(numCards / numRows)).fill(yArr).flat()
      console.log(layoutXArray)
      console.log(layoutYArray)

    const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
     // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
    api.start(i => {
      let isFlipped = false
    if (flippable === true) {
      if (!down) {
        flipped.add(index)
      }
      isFlipped = flipped.has(index)
    }
    
      
      

      if (index !== i) return // We're only interested in changing spring-data for the current spring
      const isGone = gone.has(index)
      const x = draggable ? xy[0] - window.innerWidth * 0.25 : layoutXArray[index] + window.innerHeight * 0.4
      const y =  props.layout ? layoutYArray[index] : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
      const rot = mx / 100 + (isGone ? dir * 10 * velocity : -10 + Math.random() * 20) 
      const rotX =  isFlipped ? 30 : 0
      const zIndex = isFlipped ? cards.length - index : index
      const opacity = isFlipped ? 1 : 0
      const scale = down ? 1.1 : 1 // Active cards lift up a bit
      const z = !down ? 2 : -1 // Active cards lift up a bit
      if (down && flipped.has(index)) 
        return {scale: 3, rot: 0, x: (window.innerHeight * 0.75), y: 0}
        else {
      return {
        x,
        y,
        rot,
        scale,
       rotX,
       opacity,
       zIndex, 
        delay: undefined,
        config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        immediate: key => key === "zIndex"

      }
    }
    })
    
  })
  
  const trans = (r, s, x) =>
  `perspective(1500px) rotateX(${x}deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <>
      {springProps.map(({ x, y, rot, scale, rotX, opacity, zIndex  }, i) => (
        <animated.div className={styles.deck} key={i} style={{ x, y, zIndex, position:"relative", }}>
          {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
          
          <animated.div
            {...bind(i)}
            style={{
              
              backgroundImage: `url(${cards[i].back})`,
              transform: interpolate([rot, scale, rotX], trans),
            }}
          />
  <animated.div
  {...bind(i)}
  style={{
  
    opacity: opacity,
    position: 'absolute',
    transform: interpolate([rot, scale, rotX], trans),
    
  }}
  >
  {(cards[i].front)}
  </animated.div>
            </animated.div>

        
      ))}
    </>
  )
}

export default Deck
