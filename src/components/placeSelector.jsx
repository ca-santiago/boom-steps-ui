import React, { useEffect, useState } from 'react';
import {
  CountryDropdown,
  RegionDropdown
} from 'react-country-region-selector';

import './placeselector.css'

export default function PlaceSelector({ onChange, inputStyle, containerStyle }) {

  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');

  function selectCountry (val) {
    setCountry(val);
  }
  
  function selectRegion (val) {
    setRegion(val);
  }

  useEffect(() => {
    const selectionCompleted = country && region;
    onChange(selectionCompleted ? `${country} ${region}` : null);
  }, [country, region, onChange]);
  

  return (
    <div className="place-selector-container">
      <CountryDropdown
        className={`${inputStyle} place-selector-input`}
        value={country}
        name="País"
        onChange={(val) => selectCountry(val)} />
      <RegionDropdown
        className={inputStyle}
        country={country}
        value={region}
        onChange={(val) => selectRegion(val)} />
    </div>
  );
}
