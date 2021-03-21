import React, { useState, useEffect } from 'react'
import { v4 } from 'uuid'
import { randomColor } from 'randomcolor'
import Draggable from 'react-draggable'

import './App.css'

const App = () => {
  const [value, setValue] = useState('')
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('items')) || [])

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  const newItem = () => {
    if (value) {
      const newItem = {
        id: v4(),
        item: value,
        color: randomColor({
          luminosity: 'light'
        }),
        defaultPos: {
          x: 500,
          y: -500
        }
      }
      setItems(items => [...items, newItem])
      setValue('')
    }
  }

  const deleteItem = id => {
    setItems(items.filter(item => item.id !== id))
  }

  const updatePosition = (data, id) => {
    const newItem = items.find(item => item.id === id).defaultPos = { x: data.x, y: data.y }
    setItems(items => [...items, newItem])
  }

  const keyPress = e => {
    e.charCode === 13 && newItem()
  }

  return (
    <div className="App">
      <div className="wrapper"> 
        <input 
          type="text" 
          placeholder="Enter something..."
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyPress={e => keyPress(e)}
        />
        <button className="enter" onClick={() => newItem()} >ENTER</button>
      </div>
      {
        items && items.map(item => {
          return (
            <Draggable 
              key={item.id} 
              defaultPosition={item.defaultPos} 
              onStop={(_, data) => {
                updatePosition(data, item.id)
              }}
            >
              <div className="todo__item" style={{ backgroundColor: item.color }}>
                { item.item } 
                <button className="delete" onClick={() => deleteItem(item.id)}>X</button>
              </div>
            </Draggable>
          ) 
        })
      }
    </div>
  )
}

export default App
