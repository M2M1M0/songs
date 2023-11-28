
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import AddSong from './pages/AddSong'
import UpdateSong from './pages/UpdateSong'
import Sidebar from './components/Sidebar'

function App() {

  return (
    <BrowserRouter>
      <div className='flex w-full'>
        <div className='flex w-[160px]'>
          <Sidebar />
        </div>
        <div className='flex flex-1'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/:catName' element={<Home />} />
            <Route path='/add-song' element={<AddSong />} />
            <Route path='/update-song/:id' element={<UpdateSong />} />
          </Routes>
        </div>
      </div >
    </BrowserRouter>
  )
}

export default App
