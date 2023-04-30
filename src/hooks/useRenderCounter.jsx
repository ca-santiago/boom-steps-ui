import React, { useRef } from 'react';
const SHOW_RENDER_COUNTERS = true;

const useRenderCounter = () => {
  const renderCount = useRef(0);
  renderCount.current = renderCount.current + 1;

  if (SHOW_RENDER_COUNTERS) {
    return (
      <p className="render-counter">{renderCount.current}</p>
    );
  }
  else {
    return null;
  }
};

export default useRenderCounter;