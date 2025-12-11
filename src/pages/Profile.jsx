import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Pages.css';

function Profile() {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.profile?.name || '',
    phone: user?.profile?.phone || '',
    address: user?.profile?.address || ''
  });
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
    updateProfile(formData);
    setSuccess('Profile updated successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="profile-page">
      <div className="page-header">
        <h1>Mi Perfil</h1>
        <p>Administra tu información personal</p>
      </div>

      <div className="content-card">
        <form onSubmit={handleSubmit}>
          {success && <div className="success-message">{success}</div>}

          <div className="form-grid">
            <div className="form-group">
              <label>Correo Electrónico</label>
              <input
                type="email"
                value={user?.email}
                disabled
                style={{ background: '#f0f0f0', cursor: 'not-allowed' }}
              />
              <small style={{ color: '#666', fontSize: '12px' }}>El correo electrónico no se puede cambiar</small>
            </div>

            <div className="form-group">
              <label>Rol</label>
              <input
                type="text"
                value={user?.role || 'user'}
                disabled
                style={{ background: '#f0f0f0', cursor: 'not-allowed', textTransform: 'capitalize' }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Nombre Completo</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ingresa tu nombre completo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Número de Teléfono</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ingresa tu número de teléfono"
              />
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="address">Dirección</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Ingresa tu dirección"
                rows="3"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
