import { useMemo } from 'react';
  
export default function StepSwitcher({ steps, currentKey }) {

  const currComponent = useMemo(() => steps.find(s => {
    return s.key === currentKey;
  }), [steps, currentKey]);

  if(currComponent) return currComponent.component;
  return null;
}