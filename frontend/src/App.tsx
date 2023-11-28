
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import AddSong from './pages/AddSong'
import UpdateSong from './pages/UpdateSong'
import Sidebar from './components/Sidebar'
import PlayStation from './components/PlayStation'

function App() {

  return (
    <BrowserRouter>
      <div className='flex w-full gap-4'>
        <div className='flex w-1/6'>
          <Sidebar />
        </div>
        <div className='flex w-5/6 border-r-4'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/add-song' element={<AddSong />} />
            <Route path='/update-song/:id' element={<UpdateSong />} />
          </Routes>
        </div>
      </div >
    </BrowserRouter>
  )
}

export default App
