import React from 'react'

const GuessSection = ({a, i, addValue}) => {

  return (
            
      <div className="guessletters" key={i} onClick={()=>addValue(a, i)}>
        {a}
      </div>
       
  )
}

export default GuessSection