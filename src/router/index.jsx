import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import CompleteFlujoScreen from '../screens/flujoSteps';
import ManagerScreen from '../screens/manager';

export default function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/complete/:id" exact element={<CompleteFlujoScreen />} />
        <Route path="/manager" exact element={<ManagerScreen />} />
        <Route path="*" element={<Navigate replace to="/manager" />} />
      </Routes>
    </Router>
  );
}
