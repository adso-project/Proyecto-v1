import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PropertyProvider } from './context/PropertyContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Overview from './pages/Overview';
import Properties from './pages/Properties';
import AddEditProperty from './pages/AddEditProperty';
import Calendar from './pages/Calendar';
import Pricing from './pages/Pricing';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import AdminPanel from './pages/AdminPanel';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <PropertyProvider>
          <div className="App">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              >
                <Route index element={<Overview />} />
                <Route path="properties" element={<Properties />} />
                <Route path="properties/add" element={<AddEditProperty />} />
                <Route path="properties/edit/:id" element={<AddEditProperty />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
                <Route path="admin" element={<AdminPanel />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </PropertyProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
