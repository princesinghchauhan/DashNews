"use client"
import React, { useEffect, useState } from 'react';

const Card = ({ title, value, icon }) => {
  const [storedValue, setStoredValue] = useState(value);

  // Dynamically update localStorage whenever 'storedValue' changes
  useEffect(() => {
    // Update localStorage whenever storedValue changes
    if (storedValue !== value) {
      setStoredValue(value);
    }
  }, [value]);

  useEffect(() => {
    // Save updated value to localStorage each time it changes
    if (storedValue) {
      localStorage.setItem(title, storedValue); // Store using title as the key
    }
  }, [storedValue, title]);

  return (
    <div className="p-4 bg-white shadow rounded-lg flex items-center">
      <div className="text-2xl mr-4">{icon}</div>
      <div>
        <h4 className="text-sm text-gray-500">{title}</h4>
        <h2 className="text-lg text-gray-500 font-semibold">{storedValue}</h2>
      </div>
    </div>
  );
};

export default Card;
