import { useState } from 'react';
import { useProperty } from '../context/PropertyContext';
import './Pages.css';

function Pricing() {
  const { getUserProperties, updatePricing } = useProperty();
  const properties = getUserProperties();
  const [selectedProperty, setSelectedProperty] = useState(properties[0]?.id || '');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [price, setPrice] = useState('');
  const [success, setSuccess] = useState('');

  const property = properties.find(p => p.id === selectedProperty);

  const handleSetPrice = (e) => {
    e.preventDefault();
    if (!dateRange.start || !dateRange.end || !price) return;

    const start = new Date(dateRange.start);
    const end = new Date(dateRange.end);
    
    let current = new Date(start);
    while (current <= end) {
      const dateStr = current.toISOString().split('T')[0];
      updatePricing(selectedProperty, dateStr, parseFloat(price));
      current.setDate(current.getDate() + 1);
    }

    setSuccess('Pricing updated successfully!');
    setTimeout(() => setSuccess(''), 3000);
    setDateRange({ start: '', end: '' });
    setPrice('');
  };

  if (properties.length === 0) {
    return (
      <div className="pricing-page">
        <div className="page-header">
          <h1>Gestión de Precios</h1>
        </div>
        <div className="empty-state">
          <div className="empty-state-icon">💰</div>
          <h3>No hay propiedades para gestionar</h3>
          <p>Agrega una propiedad primero para establecer precios</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pricing-page">
      <div className="page-header">
        <h1>Gestión de Precios</h1>
        <p>Establece precios personalizados para rangos de fechas</p>
      </div>

      <div className="content-card">
        <div className="form-group" style={{ marginBottom: '24px' }}>
          <label>Selecciona Propiedad</label>
          <select
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
          >
            {properties.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        {property && (
          <div style={{ marginBottom: '24px', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
            <p style={{ margin: 0 }}>
              <strong>Precio Base:</strong> ${property.price}/noche
            </p>
          </div>
        )}

        <form onSubmit={handleSetPrice}>
          {success && <div className="success-message">{success}</div>}

          <h3 style={{ fontFamily: 'Poppins, sans-serif', marginBottom: '16px' }}>
            Establecer Precio Personalizado para Rango de Fechas
          </h3>

          <div className="form-grid">
            <div className="form-group">
              <label>Fecha de Inicio</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                required
              />
            </div>

            <div className="form-group">
              <label>Fecha de Fin</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                min={dateRange.start}
                required
              />
            </div>

            <div className="form-group">
              <label>Precio por Noche ($)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                step="0.01"
                placeholder={property?.price || '0'}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Establecer Precio Personalizado
            </button>
          </div>
        </form>

        {property && Object.keys(property.prices || {}).length > 0 && (
          <div style={{ marginTop: '32px' }}>
            <h3 style={{ fontFamily: 'Poppins, sans-serif', marginBottom: '16px' }}>
              Precios Personalizados
            </h3>
            <div style={{ display: 'grid', gap: '8px' }}>
              {Object.entries(property.prices).slice(0, 10).map(([date, customPrice]) => (
                <div key={date} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  padding: '12px',
                  background: '#f8f9fa',
                  borderRadius: '6px'
                }}>
                  <span>{new Date(date).toLocaleDateString()}</span>
                  <strong>${customPrice}/noche</strong>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pricing;
