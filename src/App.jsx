
import './App.css'
import Homepage from './components/homepage'
import Navbar from './components/navbar'
import { Analytics } from "@vercel/analytics/react"

function App() {
 

  return (
    <>
    <div className='navbar' >
    <Navbar/>
    </div>
    <div className='homepage' >
    <Homepage/>
    </div>
     
      
    </>
  )
}

export default App
