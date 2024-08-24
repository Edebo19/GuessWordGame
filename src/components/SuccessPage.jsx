import React from 'react'

const SuccessPage = ({setstart}) => {
  return (
    <div className='SuccessHolder'>
        <h1>You have Won!!!</h1>
        <button onClick={()=>setstart(0)}>Play Again</button>
    </div>
  )
}

export default SuccessPage