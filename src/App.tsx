import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Licence1 from './pages/Licence1';
import Licence2 from './pages/Licence2';
import Licence3 from './pages/Licence3';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/l1/*"
            element={
              <ProtectedRoute>
                <Licence1 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/l2/*"
            element={
              <ProtectedRoute>
                <Licence2 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/l3/*"
            element={
              <ProtectedRoute>
                <Licence3 />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
