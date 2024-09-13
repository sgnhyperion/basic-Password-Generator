import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(12)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (numberAllowed) {
      str += '0123456789'
    }

    if (charAllowed) str += '!@#$%^&*()_+{}|[]'

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str[char]
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  const copySelectedPassword = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 20)
    window.navigator.clipboard.writeText(passwordRef.current.value)
  }, [password])

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, charAllowed, generatePassword])

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Password Generator</h1>
        <div className="mb-6">
          <input
            type="text"
            value={password}
            readOnly
            ref={passwordRef}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-xl text-center"
          />
          <button
            className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            onClick={copySelectedPassword}
          >
            Copy
          </button>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Password Length: {length}</label>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer"
          />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="numberAllowed"
            checked={numberAllowed}
            onChange={() => setNumberAllowed(prev => !prev)}
            className="mr-2 h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
          />
          <label htmlFor="numberAllowed" className="text-gray-700">Include Numbers</label>
        </div>
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="charAllowed"
            checked={charAllowed}
            onChange={() => setCharAllowed(prev => !prev)}
            className="mr-2 h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
          />
          <label htmlFor="charAllowed" className="text-gray-700">Include Special Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App