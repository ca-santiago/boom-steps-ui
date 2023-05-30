import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

const CompleteFlujoScreen = React.lazy(() => import('../screens/completion'));
const ManagerScreen = React.lazy(() => import('../screens/manager'));

export default function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route
          path="/complete/:id"
          exact
          element={
            <React.Suspense>
              <CompleteFlujoScreen />
            </React.Suspense>
          }
        />
        <Route
          path="/manager"
          exact
          element={
            <React.Suspense>
              <ManagerScreen />
            </React.Suspense>
          }
        />
        <Route path="*" element={<Navigate replace to="/manager" />} />
      </Routes>
    </Router>
  );
}
