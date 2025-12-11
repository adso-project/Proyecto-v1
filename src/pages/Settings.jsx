import { useState } from 'react';
import './Pages.css';

function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    bookingNotifications: true,
    marketingEmails: false,
    currency: 'USD',
    language: 'en',
    timezone: 'America/New_York'
  });
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userSettings', JSON.stringify(settings));
    setSuccess('Settings saved successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Configuración</h1>
        <p>Administra tus preferencias de la aplicación</p>
      </div>

      <form onSubmit={handleSubmit}>
        {success && <div className="success-message">{success}</div>}

        <div className="content-card">
          <h3 style={{ fontFamily: 'Poppins, sans-serif', marginTop: 0 }}>
            Notificaciones
          </h3>
          
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleChange}
                style={{ width: '20px', height: '20px' }}
              />
              <div>
                <div style={{ fontWeight: 600 }}>Notificaciones por Correo</div>
                <small style={{ color: '#666' }}>Recibe notificaciones por correo para actualizaciones importantes</small>
              </div>
            </label>
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="bookingNotifications"
                checked={settings.bookingNotifications}
                onChange={handleChange}
                style={{ width: '20px', height: '20px' }}
              />
              <div>
                <div style={{ fontWeight: 600 }}>Notificaciones de Reservas</div>
                <small style={{ color: '#666' }}>Recibe notificaciones sobre nuevas reservas y cancelaciones</small>
              </div>
            </label>
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="marketingEmails"
                checked={settings.marketingEmails}
                onChange={handleChange}
                style={{ width: '20px', height: '20px' }}
              />
              <div>
                <div style={{ fontWeight: 600 }}>Correos de Marketing</div>
                <small style={{ color: '#666' }}>Recibe ofertas promocionales y actualizaciones</small>
              </div>
            </label>
          </div>
        </div>

        <div className="content-card">
          <h3 style={{ fontFamily: 'Poppins, sans-serif', marginTop: 0 }}>
            Configuración Regional
          </h3>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="currency">Moneda</label>
              <select
                id="currency"
                name="currency"
                value={settings.currency}
                onChange={handleChange}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="language">Idioma</label>
              <select
                id="language"
                name="language"
                value={settings.language}
                onChange={handleChange}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="timezone">Zona Horaria</label>
              <select
                id="timezone"
                name="timezone"
                value={settings.timezone}
                onChange={handleChange}
              >
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Guardar Configuración
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
