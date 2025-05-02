import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import {Navbar} from './Components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { Toaster } from'react-hot-toast';
import {Footer} from './Components/Footer';
import Service from './Pages/Services';
import AdminDashboard from './Pages/AdminDashboard';
import AdminUser from './Pages/adminUser';
import AdminService from './Pages/adminService';
import AdminBookings from './Pages/adminBookings';
import BookingPage from './Pages/bookingPage';
import Profile from './Pages/profile';
import Contact from './Pages/contact';
import AdminContact from './Pages/adminContact';
// Wrapper component to handle layout
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
    </div>
  );
};

function App() {
  return (
    <>
      <Toaster position="bottom-right" />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/service" element={<Service/>} />
            <Route path="/admin-dashboard" element={<AdminDashboard/>} />
            <Route path="/admin-users" element={<AdminUser/>} />
            <Route path="/admin-services" element={<AdminService/>} />
            <Route path="/admin-bookings" element={<AdminBookings/>} />
            <Route path="/admin-contact" element={<AdminContact/>} />
            <Route path="/booking/:serviceId" element={<BookingPage/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/contact" element={<Contact/>} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
