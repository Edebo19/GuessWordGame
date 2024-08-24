import React, { useEffect, useReducer, useState } from 'react'
import './App.css'
import GuessSection from './components/GuessSection'
import TheWord from './components/TheWord'
import WelcomePage from './WelcomePage'
import Lives from './components/Lives'
import SuccessPage from './components/SuccessPage'
import FailurePage from './components/FailurePage'

const App = () => {
  const [start, setstart] = useState(0)
  const [categoryState, setcategoryState] = useState("")
  const [gamesArray, setgamesArray]=useState([
    {
      category: "Animal",
      items: ["Antelope", "Tiger", "Giraffe", "Rabbit", "Leopard", "Hyena", "Cheetah", "Python"]
    },
    {
      category: "Country",
      items: ["Japan", "Russia", "Dubai", "England", "Turkey", "Tokyo", "Canada", "Nigeria"]
    },
    {
      category: "Names",
      items: ["Debby", "Peace", "Timothy", "Precious", "Blessing", "Evelyn", "Samuel", "Emmanuel"]
    },
    {
      category: "Colors",
      items: ["Maroon", "Purple", "Azure", "Tomato", "Palegreen", "goldenrod", "Violet", "Magenta"] 
    },
    {
      category: "Cars",
      items: ["Honda", "Mercedes", "Camry","Lexus",  "Venza", "Toyota", "Innoson"]
    },
    {
      category:"Social Media",
      items:[
        // "Facebook","Twitter" , "Whatsapp",
         "Telegram","Instagram" , "LinkedIn", "Youtube"]
    }
  ])
  const [words, setwords]=useState([])
  const [wordTruth, setwordTruth] = useState([])
  const [letters, setLetters]= useState([])
  const [LivesArr, setLivesArr]=useState([1,2,3,4,5])
  const [categoryIndex, setcategoryIndex] = useState(0)
  const [memory, setmemory] = useState([])
  const [next, setnext] = useState(0)



  function addValue(e,i) {
    if (wordTruth.includes(e)) {
      let ind= wordTruth.indexOf(e);
      let inde = wordTruth.lastIndexOf(e);
      if (words[ind] === "") {
        let newWords = [...words]
        newWords[ind] = e;
        setwords(newWords);
        let EmptyKeys=[...letters]
        EmptyKeys[i] =""
        setLetters(EmptyKeys)
      } else if( words[inde]=== "") {
        let theWord =[...words];
        theWord[inde] = e;
        setwords(theWord)
        let EmptyKeys=[...letters]
        EmptyKeys[i] =""
        setLetters(EmptyKeys)
      }
    } else{
      let newLives =[...LivesArr];
      if (newLives.length === 1) {
        setstart(3)
      } else {
        newLives.pop();
      setLivesArr(newLives)
      }
      
    }
  }

  const changeWord=()=>{
    for (let index = 0; index < gamesArray.length; index++) {
      if (categoryState === gamesArray[index].category) {
        setcategoryIndex(index)
        const arr= gamesArray[index].items[Math.floor(Math.random()* gamesArray[index].items.length)].toUpperCase().split("")
        setwordTruth(arr)
        const AnotherArr= (arr.map((e,i,a)=>{
          if (i !==0 && i !==(a.length - 1)) {
            return"";
          } else {
            return e
          }
        }))
        setwords(AnotherArr)
        const arrToAddTo=arr.filter((e, i, a)=> (i !== 0 && i !== (a.length-1)))
        let newArr=Array(3).fill(null).map(()=>{
          const characters= "abcdefghijklmnopqrstuvwxyz";
          return Array(1).fill(null).map(()=>{
            return characters.toUpperCase().charAt(Math.floor(Math.random()*characters.length));
          }).join("");
        });
        const toAdd=()=>{
          for (const element of newArr) {
            const randomIndex = Math.floor(Math.random()* (arrToAddTo.length + 1));
            arrToAddTo.splice(randomIndex, 0 , element)
          }
        }
        toAdd()
        setLetters(arrToAddTo)
        setmemory((prev)=>[...prev, arr.join('')])
      } else {
        console.log("No Category selected");
      }
      
    }
  }

  useEffect(()=>{
    if ((memory.length - 1) === gamesArray[categoryIndex].items.length) {
      setstart(2)
    } else if(letters.filter((e)=> e !=="").length === 3) {
      changeWord()
    }
  }, [letters])
  useEffect(() => {
    changeWord()
  }, [categoryState])
  
  return (
    <div className='MainBody'>

      <div className='Wrapper'>
        {
          start ===1?<> <div className="LettersInputed">
          <div className="LettersInputedHolder">
          {
            words.map((a, i)=>(
              <TheWord key={i} e={a} />
            ))
          }
          </div>
        
        </div>
        <div className="LettersToGuess">
          <div className='LettersHolder'>
            {
              letters.map((e, i)=>(
                <GuessSection addValue={addValue} i={i} a={e}/>
              ))
            }
          </div>
        </div>
        <div className="LivesHolder">
          <p style={{fontSize:"18px", color: 'white', fontFamily:"arial"}}>Lives left:</p>
          {
            LivesArr.map((e,i )=>(
              <Lives key={i} e={e}/>
            ))
          }
        </div>
         </>: start===0? <><WelcomePage gamesArray={gamesArray} setcategoryState={setcategoryState} setstart={setstart}/></>
         : start===2? <SuccessPage/> : start===3 ? <FailurePage/>: null
        }
        
      
      </div>

    </div>
  )
}

export default App