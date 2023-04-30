import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import CreateFlujoScreen from '../screens/home';
import CompleteFlujoScreen from '../screens/flujoSteps';

export default function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/flujo/:id" exact element={<CompleteFlujoScreen />} />
        <Route path="/" exact element={<CreateFlujoScreen />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
}
