import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard.jsx';
import About from './pages/UploadVideoFootage.jsx';
import AddLiveCameras from './pages/AddLiveCameras.jsx';
import Comment from './pages/DownloadLogFIle.jsx';
import Product from './pages/Product.jsx';
import ProductList from './pages/ProductList.jsx';
import Registration from "./Registration.js";
import { AuthProvider } from './AuthContext';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Registration><Registration /></Registration>} />
          <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
          <Route path="/UploadVideoFootage" element={<DashboardLayout><About /></DashboardLayout>} />
          <Route path="/DownloadLogFIle" element={<DashboardLayout><Comment /></DashboardLayout>} />
          <Route path="/AddLiveCameras" element={<DashboardLayout><AddLiveCameras /></DashboardLayout>} />
          <Route path="/product" element={<DashboardLayout><Product /></DashboardLayout>} />
          <Route path="/productList" element={<DashboardLayout><ProductList /></DashboardLayout>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
