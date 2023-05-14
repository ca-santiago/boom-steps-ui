import { useMemo, useState } from 'react';

export default function useFlujoCreator() {

  const [selectedSteps, setSelectedSteps] = useState([]);

  const canCreate = useMemo(()=> {
    return selectedSteps.length > 0;
  },[selectedSteps]);

  function addStep(value) {
    setSelectedSteps([...selectedSteps, value]);
  }

  function removeStep(value){
    setSelectedSteps(selectedSteps.filter(s => s !== value));
  }

  function getState() {
    const selected = [...selectedSteps];
    return selected;
  }

  return {
    getState,
    addStep,
    removeStep,
    canCreate
  };
}
