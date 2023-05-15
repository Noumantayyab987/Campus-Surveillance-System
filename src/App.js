import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import UploadVideoFootage from './pages/UploadVideoFootage';
import AddLiveCameras from './pages/AddLiveCameras';
import Product from './pages/Product';
import ProductList from './pages/ProductList';
import Registration from './Registration';
import { AuthProvider } from './AuthContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
          <Route path="/UploadVideoFootage" element={<DashboardLayout><UploadVideoFootage /></DashboardLayout>} />
          <Route path="/AddLiveCameras" element={<DashboardLayout><AddLiveCameras /></DashboardLayout>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
