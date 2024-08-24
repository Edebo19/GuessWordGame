import React from 'react'

const FailurePage = ({setstart}) => {
  return (
    <div className='FailurePage'>
        <h1>You have Lost!</h1>
        <button onClick={()=>setstart(0)}>Play Again</button>
    </div>
  )
}

export default FailurePage