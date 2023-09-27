import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import BookDetail from './pages/BookDetail';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/book-detail/:book' element={<BookDetail />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App