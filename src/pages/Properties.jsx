import { useState } from 'react';
import { useProperty } from '../context/PropertyContext';
import { Link } from 'react-router-dom';
import './Pages.css';

function Properties() {
  const { getUserProperties, deleteProperty } = useProperty();
  const properties = getUserProperties();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleDelete = (propertyId) => {
    deleteProperty(propertyId);
    setDeleteConfirm(null);
  };

  if (properties.length === 0) {
    return (
      <div className="properties-page">
        <div className="page-header">
          <h1>Mis Propiedades</h1>
          <Link to="/dashboard/properties/add">
            <button className="btn btn-primary">+ Agregar Propiedad</button>
          </Link>
        </div>
        
        <div className="empty-state">
          <div className="empty-state-icon">🏠</div>
          <h3>Aún no tienes propiedades</h3>
          <p>Comienza agregando tu primera propiedad para gestionar</p>
          <Link to="/dashboard/properties/add">
            <button className="btn btn-primary" style={{ marginTop: '16px' }}>
              Agregar Primera Propiedad
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="properties-page">
      <div className="page-header">
        <div>
          <h1>Mis Propiedades</h1>
        </div>
        <Link to="/dashboard/properties/add">
          <button className="btn btn-primary">+ Agregar Propiedad</button>
        </Link>
      </div>

      <div className="property-grid">
        {properties.map((property) => (
          <div key={property.id} className="property-card">
            <div className="property-image">🏠</div>
            <div className="property-info">
              <h3 className="property-name">{property.name}</h3>
              <p className="property-location">📍 {property.location}</p>
              <div className="property-details">
                <span>🛏️ {property.bedrooms} camas</span>
                <span>🚿 {property.bathrooms} baños</span>
                <span>👥 {property.guests} huéspedes</span>
              </div>
              <div className="property-actions">
                <Link to={`/dashboard/properties/edit/${property.id}`}>
                  <button className="btn btn-primary">Editar</button>
                </Link>
                <button 
                  className="btn btn-danger"
                  onClick={() => setDeleteConfirm(property.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Confirmar Eliminación</h3>
            <p>¿Estás seguro de que deseas eliminar esta propiedad?</p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>
                Cancelar
              </button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm)}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Properties;
