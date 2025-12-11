import { useAuth } from '../context/AuthContext';
import { useProperty } from '../context/PropertyContext';
import { Navigate } from 'react-router-dom';
import './Pages.css';

function AdminPanel() {
  const { user } = useAuth();
  const { properties } = useProperty();

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  const totalUsers = JSON.parse(localStorage.getItem('users') || '[]').length;
  const totalProperties = properties.length;
  const propertyTypes = properties.reduce((acc, p) => {
    acc[p.propertyType] = (acc[p.propertyType] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>🔐 Panel de Administración</h1>
        <p>Resumen del sistema y administración</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Usuarios Totales</div>
          <div className="stat-value">{totalUsers}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">Propiedades Totales</div>
          <div className="stat-value">{totalProperties}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">Anuncios Activos</div>
          <div className="stat-value">{totalProperties}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">Reservas Totales</div>
          <div className="stat-value">0</div>
        </div>
      </div>

      <div className="content-card">
        <h3 style={{ fontFamily: 'Poppins, sans-serif', marginTop: 0 }}>
          Todas las Propiedades
        </h3>
        
        {properties.length === 0 ? (
          <p style={{ color: '#666' }}>No hay propiedades en el sistema</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Nombre de Propiedad</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Propietario</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Ubicación</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Tipo</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Precio</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Creado</th>
                </tr>
              </thead>
              <tbody>
                {properties.map(property => (
                  <tr key={property.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '12px' }}>{property.name}</td>
                    <td style={{ padding: '12px' }}>{property.owner}</td>
                    <td style={{ padding: '12px' }}>{property.location}</td>
                    <td style={{ padding: '12px', textTransform: 'capitalize' }}>{property.propertyType}</td>
                    <td style={{ padding: '12px' }}>${property.price}</td>
                    <td style={{ padding: '12px' }}>
                      {new Date(property.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="content-card">
        <h3 style={{ fontFamily: 'Poppins, sans-serif', marginTop: 0 }}>
          Distribución de Tipos de Propiedades
        </h3>
        
        {Object.keys(propertyTypes).length === 0 ? (
          <p style={{ color: '#666' }}>No hay datos disponibles</p>
        ) : (
          <div style={{ display: 'grid', gap: '12px' }}>
            {Object.entries(propertyTypes).map(([type, count]) => (
              <div key={type} style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px',
                background: '#f8f9fa',
                borderRadius: '6px'
              }}>
                <span style={{ textTransform: 'capitalize', fontWeight: 500 }}>{type}</span>
                <strong>{count} propiedades</strong>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
