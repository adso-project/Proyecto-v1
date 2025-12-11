import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const PropertyContext = createContext(null);

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const { user } = useAuth();

  // Load properties from localStorage on mount
  useEffect(() => {
    const storedProperties = localStorage.getItem('properties');
    if (storedProperties) {
      setProperties(JSON.parse(storedProperties));
    }
  }, []);

  // Save properties to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('properties', JSON.stringify(properties));
  }, [properties]);

  // Add new property
  const addProperty = (propertyData) => {
    const newProperty = {
      id: Date.now().toString(),
      ...propertyData,
      owner: user.email,
      createdAt: new Date().toISOString(),
      availability: {},
      prices: {}
    };
    setProperties([...properties, newProperty]);
    return { success: true, property: newProperty };
  };

  // Update property
  const updateProperty = (propertyId, updates) => {
    setProperties(properties.map(p => 
      p.id === propertyId ? { ...p, ...updates } : p
    ));
    return { success: true };
  };

  // Delete property
  const deleteProperty = (propertyId) => {
    setProperties(properties.filter(p => p.id !== propertyId));
    return { success: true };
  };

  // Update availability
  const updateAvailability = (propertyId, date, isAvailable) => {
    setProperties(properties.map(p => 
      p.id === propertyId 
        ? { ...p, availability: { ...p.availability, [date]: isAvailable } }
        : p
    ));
  };

  // Update pricing
  const updatePricing = (propertyId, date, price) => {
    setProperties(properties.map(p => 
      p.id === propertyId 
        ? { ...p, prices: { ...p.prices, [date]: price } }
        : p
    ));
  };

  // Get user's properties
  const getUserProperties = () => {
    if (!user) return [];
    if (user.role === 'admin') {
      return properties;
    }
    return properties.filter(p => p.owner === user.email);
  };

  return (
    <PropertyContext.Provider value={{
      properties,
      addProperty,
      updateProperty,
      deleteProperty,
      updateAvailability,
      updatePricing,
      getUserProperties
    }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};
