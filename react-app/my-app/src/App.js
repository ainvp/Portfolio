import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Cars from "./Pages/Cars";
import CarDetails from "./Pages/CarDetails";
import Contact from "./Pages/Contact";
import Login from "./Pages/login";
import Signup from "./Pages/signup";
import Profile from "./Pages/profile";
import Dashboard from "./Pages/Dashboard";

import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute adminOnly={true}>
      <Dashboard />
    </ProtectedRoute>
  }
/>

      
      </Routes>
    </BrowserRouter>
  );
}

export default App;