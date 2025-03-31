import React from 'react';
import Home from '../src/Home/Home';
import Courses from './courses/Courses';
import { Navigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Contact from '../src/contact/Contact';
import { Toaster } from 'react-hot-toast';
import About from './about/About';
import PaymentButton from './components/PaymentButton';
import { useAuth } from './context/AuthProvider';
import Checkout from "./components/Checkout";
import { CartProvider } from './context/CartContext';

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log('User', authUser);

  return (
    <CartProvider>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/courses"
            element={authUser ? <Courses /> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contacts" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Toaster />
        {/* <PaymentButton /> */}
      </div>
    </CartProvider>
  );
}

export default App;
