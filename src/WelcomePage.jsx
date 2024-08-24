import React from 'react'

        
        const WelcomePage = ({setstart,setcategoryState, gamesArray}) => {
  return (
    <div className='Category'>
        <div className="CategoryHolder">
            <h3 style={{fontSize:"30px"}}>Let's Start Guessing!</h3>
           <div className="paragraph">
             <p style={{fontSize:"22px"}}>Pick a category:</p>
           </div>
            <div className='CategoryOptions'>
                {
                    gamesArray.map((e, i)=>(
                        <li key={i} onClick={()=> {setcategoryState(e.category); setstart(1)}}>{e.category}</li>
                    ))
                }
                
            </div>
        </div>
    </div>
  )
}

export default WelcomePage