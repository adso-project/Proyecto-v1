import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProperty } from '../context/PropertyContext';
import './Pages.css';

function AddEditProperty() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addProperty, updateProperty, getUserProperties } = useProperty();
  
  const existingProperty = id ? getUserProperties().find(p => p.id === id) : null;
  
  const [formData, setFormData] = useState(existingProperty || {
    name: '',
    location: '',
    description: '',
    bedrooms: '',
    bathrooms: '',
    guests: '',
    price: '',
    propertyType: 'apartment'
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.name || !formData.location || !formData.bedrooms || !formData.bathrooms || !formData.guests || !formData.price) {
      setError('Por favor completa todos los campos requeridos');
      return;
    }

    if (id) {
      updateProperty(id, formData);
      setSuccess('¡Propiedad actualizada exitosamente!');
    } else {
      addProperty(formData);
      setSuccess('¡Propiedad agregada exitosamente!');
    }

    setTimeout(() => {
      navigate('/dashboard/properties');
    }, 1500);
  };

  return (
    <div className="add-property-page">
      <div className="page-header">
        <h1>{id ? 'Editar Propiedad' : 'Agregar Nueva Propiedad'}</h1>
        <p>Completa los detalles de tu propiedad</p>
      </div>

      <div className="content-card">
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Nombre de la Propiedad *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="ej., Acogedor Apartamento en la Playa"
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Ubicación *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="ej., Cancún, México"
              />
            </div>

            <div className="form-group">
              <label htmlFor="propertyType">Tipo de Propiedad *</label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
              >
                <option value="apartment">Apartamento</option>
                <option value="house">Casa</option>
                <option value="villa">Villa</option>
                <option value="condo">Condominio</option>
                <option value="cabin">Cabaña</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="bedrooms">Habitaciones *</label>
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="bathrooms">Baños *</label>
              <input
                type="number"
                id="bathrooms"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                min="0"
                step="0.5"
              />
            </div>

            <div className="form-group">
              <label htmlFor="guests">Máximo de Huéspedes *</label>
              <input
                type="number"
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                min="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Precio Base por Noche ($) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe tu propiedad..."
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate('/dashboard/properties')}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {id ? 'Actualizar Propiedad' : 'Agregar Propiedad'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEditProperty;
