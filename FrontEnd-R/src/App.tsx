import { useState } from 'react';
import './App.css'
import ChatBox from './components/chatbox'
import EnterBox from './components/EnterBox'

function App() {
const [name, setName] = useState<String | null>('');

const handleSetName = (newName: string) => {
  setName(newName);
}

  return (
    <div style={{
        backgroundColor: 'var(--primary-brown)',
        color: 'var(--primary-brown)',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
      }} >
        { name ? <ChatBox  name={name}/> : <EnterBox  name={name} setName={handleSetName} /> }
        
    </div>
  )
}

export default App
