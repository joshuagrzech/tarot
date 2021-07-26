import * as Tarot from './tarot.js'



const royal = [Tarot.king, Tarot.queen, Tarot.knight, Tarot.page] 
const sword = [Tarot.sword1, Tarot.sword2, Tarot.sword3, Tarot.sword4, Tarot.sword5, Tarot.sword6, Tarot.sword7, Tarot.sword8, Tarot.sword9, Tarot.sword10, ...royal]
const cup = [Tarot.cup1, Tarot.cup2, Tarot.cup3, Tarot.cup4, Tarot.cup5, Tarot.cup6, Tarot.cup7, Tarot.cup8, Tarot.cup9, Tarot.cup10, ...royal]
const pentacle = [Tarot.pentacle1, Tarot.pentacle2, Tarot.pentacle3, Tarot.pentacle4, Tarot.pentacle5, Tarot.pentacle6, Tarot.pentacle7, Tarot.pentacle8, Tarot.pentacle9, Tarot.pentacle10, ...royal]
const wand =  [Tarot.wand1, Tarot.wand2, Tarot.wand3, Tarot.wand4, Tarot.wand5, Tarot.wand6, Tarot.wand7, Tarot.wand8, Tarot.wand9, Tarot.wand10, ...royal]
const major = [
Tarot.brave,
Tarot.chariot,
Tarot.death,
Tarot.devil,
Tarot.emperor,
Tarot.empress,
Tarot.fool,
Tarot.hanged,
Tarot.hermit,
Tarot.hierophant,
Tarot.judgement,
Tarot.justice,
Tarot.lover,
Tarot.magician,
Tarot.moon,
Tarot.priestess,
Tarot.sun,
Tarot.temperament,
Tarot.tower,
Tarot.world,
]
const suits = [sword, cup, pentacle, wand, major];
const numbers = [Tarot.numbers2, Tarot.numbers3, Tarot.numbers4, Tarot.numbers5, Tarot.numbers6, Tarot.numbers7, Tarot.numbers8, Tarot.numbers9, Tarot.numbers10]
const labels = [Tarot.ofswords, Tarot.ofcups, Tarot.ofpentacles, Tarot.ofwands] 

const oneMinorCard = (i, x, r) => {
    const preventDragHandler = (e) => {
        e.preventDefault();
      }
    const whatSuit = i <= 4 ? i : 0
    const whatNumber = x <= 13 ? x : 0
    const thisCard = suits[whatSuit][whatNumber]
    return(
        <div>
            <>
            
            {i <= 3 ? (
                <>
                {x > 1 && x < 9 ? (
                <img onDragStart={preventDragHandler}
src={numbers[x - 2]} style={{position: 'absolute', height: '100%', width: '100%', opacity: 0.75}} />
                ) : (null)}
                <img onDragStart={preventDragHandler}
src={labels[i]} style={{position: 'absolute', height: '80%', width: '100%', marginTop: '20%', opacity: 0.9}} />
                </>
            ) : null}
            
            <img onDragStart={preventDragHandler} src={thisCard} style={{position: 'absolute', height: '100%', width: '100%', opacity: 0.75}} />
            </>
        </div>
    )
}

export const drawMinorCard = () => {
    //chose a random number between 0 and 4
    const suit = Math.floor(Math.random() * 5)
    //chose a random number between 0 and 10
    const number = Math.floor(Math.random() * 13)
    const royal = Math.floor(Math.random() * 3)
    return oneMinorCard(suit, number, royal)
}
