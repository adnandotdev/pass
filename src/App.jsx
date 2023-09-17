import { useState, useCallback, useEffect, useRef } from 'react'
// import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass=""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str += "!@#$%^&*()"

    for (let i=1; i<=length; i++) {
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed])
useEffect(() => {passwordGenerator()},[passwordGenerator])

const copyFunction = useCallback(() => {
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(password)
},[password])

  return (
    <div className='flex items-center justify-center h-screen p-5' 
    style={{
      backgroundImage:'url("https://watermark.lovepik.com/photo/50054/1552.jpg_wh1200.jpg")',
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center"}}>
      <div className='bg-white bg-opacity-5 backdrop-blur-md rounded-md p-5'>
        <h1 className='text-white text-center font-bold text-3xl drop-shadow-md'>Password Generator</h1>
        <div className='flex'>
            <input 
              type='text'
              value={password}
              placeholder='Password'
              className='p-2 my-5 w-full rounded-s-md outline-none'
              readOnly
              ref={passwordRef}
               />
              <button 
              className='bg-blue-600 text-white p-2 my-5 rounded-e-md'
              onClick={copyFunction}
              >copy</button>
        </div>
        <div className='flex-wrap inline-block'>
              <input 
              type="range" 
              min={6}
              max={100}
              className='cursor-pointer'
              value={length}
              onChange={(e) => {
                setLength(e.target.value)
              }}/>
              <label className='m-2 text-white'>Length: ({length})</label>
        </div>
        <div className='flex-wrap inline-block'>
              <input 
              type='checkbox'
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev)
              }}
              className='ml-5 cursor-pointer'
              />
              <label className='m-2 text-white'>Numbers</label>
        </div>
        <div className='flex-wrap inline-block'>
              <input 
              type='checkbox'
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
              className='ml-5 cursor-pointer'
              />
              <label className='m-2 text-white'>Characters</label>
        </div>

      </div>
      
    </div>
  )
}

export default App
