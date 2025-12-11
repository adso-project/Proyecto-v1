import { useState } from 'react';
import { useProperty } from '../context/PropertyContext';
import './Pages.css';

function Calendar() {
  const { getUserProperties, updateAvailability } = useProperty();
  const properties = getUserProperties();
  const [selectedProperty, setSelectedProperty] = useState(properties[0]?.id || '');
  const [currentDate, setCurrentDate] = useState(new Date());

  const property = properties.find(p => p.id === selectedProperty);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const formatDate = (day) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${year}-${month}-${dayStr}`;
  };

  const toggleAvailability = (day) => {
    if (!selectedProperty) return;
    const dateStr = formatDate(day);
    const currentAvailability = property?.availability?.[dateStr] || false;
    updateAvailability(selectedProperty, dateStr, !currentAvailability);
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  if (properties.length === 0) {
    return (
      <div className="calendar-page">
        <div className="page-header">
          <h1>Calendario</h1>
        </div>
        <div className="empty-state">
          <div className="empty-state-icon">📅</div>
          <h3>No hay propiedades para gestionar</h3>
          <p>Agrega una propiedad primero para gestionar su disponibilidad</p>
        </div>
      </div>
    );
  }

  return (
    <div className="calendar-page">
      <div className="page-header">
        <h1>Calendario</h1>
        <p>Gestiona la disponibilidad de tus propiedades</p>
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

        <div className="calendar-container">
          <div className="calendar-header">
            <button className="btn btn-secondary" onClick={previousMonth}>
              ← Anterior
            </button>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', margin: 0 }}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button className="btn btn-secondary" onClick={nextMonth}>
              Siguiente →
            </button>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <span style={{ marginRight: '16px' }}>
              <span style={{ display: 'inline-block', width: '12px', height: '12px', background: '#d4edda', marginRight: '4px' }}></span>
              Disponible
            </span>
            <span>
              <span style={{ display: 'inline-block', width: '12px', height: '12px', background: '#fee', marginRight: '4px' }}></span>
              No Disponible
            </span>
          </div>

          <div className="calendar-grid">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
              <div key={day} style={{ textAlign: 'center', fontWeight: 600, padding: '8px' }}>
                {day}
              </div>
            ))}
            
            {Array.from({ length: startingDayOfWeek }).map((_, index) => (
              <div key={`empty-${index}`}></div>
            ))}
            
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const dateStr = formatDate(day);
              const isAvailable = property?.availability?.[dateStr] || false;
              
              return (
                <div
                  key={day}
                  className={`calendar-day ${isAvailable ? 'available' : 'unavailable'}`}
                  onClick={() => toggleAvailability(day)}
                >
                  <strong>{day}</strong>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
