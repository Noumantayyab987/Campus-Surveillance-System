import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import UploadVideoFootage from './pages/UploadVideoFootage';
import AddLiveCameras from './pages/AddLiveCameras';
import Registration from './pages/Registration';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';


const App = () => {

  const PrivateRoute = ({ path, element }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
  
    useEffect(() => {
      if (!isAuthenticated()) {
        navigate('/');
      }
    }, [isAuthenticated, navigate]);
  
    return element;
  };
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/dashboard" element={<PrivateRoute path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />} />
        <Route path="/UploadVideoFootage" element={<PrivateRoute path="/UploadVideoFootage" element={<DashboardLayout><UploadVideoFootage /></DashboardLayout>} />} />
        <Route path="/AddLiveCameras" element={<PrivateRoute path="/AddLiveCameras" element={<DashboardLayout><AddLiveCameras /></DashboardLayout>} />} />
      </Routes>
    </Router>
  );
};

export default App;
