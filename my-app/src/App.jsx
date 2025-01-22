import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Contact from './pages/Contact';
import  Home from './pages/Home';
import { About } from './pages/About'; 
import Service from './pages/Service';
import { Login } from './pages/Login';
import Usecase from './pages/Usecase';
import Useref from './pages/Useref';
import Usereducer from './pages/Usereducer';
import Debounce from './pages/Debounce';
import Usememo from './pages/Usememo';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Callback from './pages/Callback';
import AdminLayout from './components/Admin/AdminLayout';
import AdminOrder from './pages/admin/AdminOrder';
import Cart from './pages/Cart';
import LoadMore from './pages/label';
import UseLayout from './pages/UseLayout';
import Auth from './store/Auth';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/login" element={<Login />} />
          <Route path="/usecase" element={<Usecase />} />
          <Route path="/dataprovider" element={<Usecase />} />
          <Route path="/useref" element={<Useref />} />
          <Route path="/usereducer" element={<Usereducer />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/debounce" element={<Debounce />} />
          <Route path="/usememo" element={<Usememo />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/label" element={<LoadMore />} />
          <Route path="/uselayout" element={<UseLayout />} />
          <Route path="/auth" element={<Auth />} />
          {/* Admin Layout with Nested Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="order" element={<AdminOrder />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
