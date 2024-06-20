import './App.css'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import { ImageProvider } from './context/ImageContext'

function App() {
  return (
    <ImageProvider>
      <div className='App'>
        <Header />
        <Main />
      </div>
    </ImageProvider>
  )
}

export default App
