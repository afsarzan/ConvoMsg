import './App.css'
import ChatBox from './components/chatbox'
import EnterBox from './components/EnterBox'

function App() {

  return (
    <div style={{
        backgroundColor: 'var(--primary-brown)',
        color: 'var(--primary-brown)',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
      }} >
        <EnterBox />
      {/* <ChatBox /> */}
    </div>
  )
}

export default App
