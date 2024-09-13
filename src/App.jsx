import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [length, setLength] = useState(12)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if(numberAllowed) {
      str += '0123456789'
    }

    if(charAllowed) str += '!@#$%^&*()_+{}|[]'

    for(let i=0;i<length;i++){
      let char = Math.floor(Math.random()*str.length +1)

      pass += str[char]

      setPassword(pass);
    }

  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(() => {
    generatePassword()
  },[length, numberAllowed, charAllowed, generatePassword])

  const copySelectedPassword = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 20)
    window.navigator.clipboard.writeText(passwordRef.current.value)
  }, [password])

  return (
    <>
      <div className='w-screen h-screen flex justify-center items-center' style={{backgroundColor: 'black', color: 'white'}}>
        <div>
          <div>
            <input type="text" 
            value={password}
            placeholder='password'
            readOnly
            ref = {passwordRef}
            />
            <button 
            onClick={copySelectedPassword}>Copy</button>
          </div>
          <div>
            <input type="range" 
              min = {6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)}
            />
            <label> length: {length} </label>

            <input type="checkbox" 
              value={numberAllowed}
              className='cursor-pointer'
              onChange={() => {
                setNumberAllowed((prev) => !prev)
              }}
            />
            <label>Numbers</label>

            <input type="checkbox" 
              value={charAllowed}
              className='cursor-pointer'
              onChange={() => {
                  setCharAllowed((prev) => !prev)
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
