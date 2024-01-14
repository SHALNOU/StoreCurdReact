import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Main } from './pages/Main'
import { AddPost } from './pages/AddPost'
import { PostInfo } from './pages/PostInfo'

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/new' element={<AddPost/>}/>
            <Route path='/posts/:id' element={<PostInfo/>}/>
            <Route path='/posts/:id' element={<PostInfo/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
