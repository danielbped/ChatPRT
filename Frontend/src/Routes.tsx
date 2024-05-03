import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Chat from './pages/Chat'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Navigate to="/login" /> } />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="*" element={<Login />} />
    </Routes>
  </BrowserRouter>
)

export default App