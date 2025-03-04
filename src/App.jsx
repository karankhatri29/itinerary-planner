import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './views/layout.ejs';
import Index from './views/index.ejs';
import Login from './views/login.ejs';
import Destinations from './views/destinations.ejs';
import DestinationDetail from './views/destination-detail.ejs';
import Form from './views/form.ejs';
import Result from './views/result.ejs';
import Error from '../public/views/error.ejs';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="login" element={<Login />} />
          <Route path="destinations" element={<Destinations />} />
          <Route path="destination/:id" element={<DestinationDetail />} />
          <Route path="form" element={<Form />} />
          <Route path="result" element={<Result />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;