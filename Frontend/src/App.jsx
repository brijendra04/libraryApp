import React from "react";
import Home from "../src/Home/Home";
import Courses from "./courses/Courses";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Contact from "../src/contact/Contact";
import { Toaster } from "react-hot-toast";
import About from "./about/About";
import { useAuth } from "./context/AuthProvider";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log("User", authUser);
  return (
    <>
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
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
