import React, { useCallback, useMemo, useState } from 'react';
import PlaceSelector from '../components/placeSelector';

export default function UsePlaceSelector() {

  const [value, setValue] = useState('');
  const error = useMemo(() => {
    if(value) return null;
    return 'Required';
  },[value]);

  const selectorChange = useCallback((value) => {
    setValue(value);
  }, [setValue]);

  const component = () => <PlaceSelector onValueChange={selectorChange} />

  return {
    error,
    component,
    value
  }

}
