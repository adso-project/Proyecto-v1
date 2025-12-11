import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const menuItems = [
    { path: '/dashboard', label: 'Resumen', icon: '📊' },
    { path: '/dashboard/properties', label: 'Propiedades', icon: '🏠' },
    { path: '/dashboard/calendar', label: 'Calendario', icon: '📅' },
    { path: '/dashboard/pricing', label: 'Precios', icon: '💰' },
    { path: '/dashboard/profile', label: 'Perfil', icon: '👤' },
    { path: '/dashboard/settings', label: 'Configuración', icon: '⚙️' },
  ];

  if (user?.role === 'admin') {
    menuItems.push({ path: '/dashboard/admin', label: 'Panel Admin', icon: '🔐' });
  }

  return (
    <div className="dashboard-layout">
      <aside className={`dashboard-sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <h1>PropertyHub</h1>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              {user?.email.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <span className="user-email">{user?.email}</span>
              <span className="user-role">{user?.role}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-button">
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="dashboard-content">
        <button 
          className="mobile-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
