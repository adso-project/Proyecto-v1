import { useProperty } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Pages.css';

function Overview() {
  const { getUserProperties } = useProperty();
  const { user } = useAuth();
  const navigate = useNavigate();
  const properties = getUserProperties();

  const totalProperties = properties.length;
  const totalAvailable = properties.filter(p => 
    Object.values(p.availability || {}).some(v => v === true)
  ).length;

  return (
    <div className="overview-page">
      <div className="page-header">
        <h1>Bienvenido, {user?.email?.split('@')[0]}!</h1>
        <p>Aquí está el resumen de tu gestión de propiedades</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Propiedades</div>
          <div className="stat-value">{totalProperties}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">Disponibles</div>
          <div className="stat-value">{totalAvailable}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">Reservas</div>
          <div className="stat-value">0</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">Ingresos</div>
          <div className="stat-value">$0</div>
        </div>
      </div>

      <div className="content-card">
        <h2 style={{ marginTop: 0, fontFamily: 'Poppins, sans-serif' }}>Acciones Rápidas</h2>
        <div className="quick-actions">
          <button className="action-button" onClick={() => navigate('/dashboard/properties/add')}>
            <span>➕</span>
            Agregar Propiedad
          </button>
          <button className="action-button" onClick={() => navigate('/dashboard/calendar')}>
            <span>📅</span>
            Ver Calendario
          </button>
          <button className="action-button" onClick={() => navigate('/dashboard/pricing')}>
            <span>💰</span>
            Establecer Precios
          </button>
          <button className="action-button" onClick={() => navigate('/dashboard/properties')}>
            <span>📊</span>
            Ver Propiedades
          </button>
        </div>
      </div>

      <div className="content-card">
        <h2 style={{ marginTop: 0, fontFamily: 'Poppins, sans-serif' }}>Actividad Reciente</h2>
        <p style={{ color: '#666' }}>No hay actividad reciente para mostrar</p>
      </div>
    </div>
  );
}

export default Overview;
