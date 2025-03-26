import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../views/layout.jsx';
import Index from '../views/index.jsx';
import Login from '../views/login.jsx';
import Destinations from '../views/destinations.jsx';
import DestinationDetail from '../views/destination-detail.jsx';
import Form from '../views/form.jsx';
import Result from '../views/result.jsx';
import Error from '../views/error.jsx';
import AboutUs from '../views/about-us.jsx';
import Hotels from '../views/hotel-view.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="destinations" element={<Destinations />} />
          <Route path="login" element={<Login />} />
          <Route path="destination/:id" element={<DestinationDetail />} />
          <Route path="form" element={<Form />} />
          <Route path="result" element={<Result />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="hotels" element={<Hotels />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;