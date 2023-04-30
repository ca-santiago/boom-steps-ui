import React from 'react';
import MakeStepIndicatorIcon, { MakeStatusIcon } from './makeStepIndicator';

export default function FlujosList({ data }) {

  if (data.length < 1) return <p>No hay flujos disponibles</p>

  return (
    <>
      {data.map((item, index, arr) => renderFlujo(item, index, arr.length))}
    </>
  );
}

const FlujoCard = ({ createdAt, status, types }) => {
  return (
    <>

      <div className="flujo-data-container">
        <div className="flujo-body">
          <p>{new Date(createdAt).toDateString()}</p>
        </div>
        <div className="flujo-card-status">
          {MakeStatusIcon(status)}
        </div>
      </div>
      <div className="types-container">
        {
          types.map(FlujoStepIcon)
        }
      </div>
    </>
  );
}

function renderFlujo(flujo, index, totalLen) {
  return (
    <div key={flujo.id} className="flujo-card-container">
      <FlujoCard {...flujo} />
      <>
        {index < totalLen - 1 ? <div className="flujo-card-limiter" /> : null}
      </>
    </div>
  );
}

function FlujoStepIcon(item) {
  return (
    <div key={item} className="type-icon-contaner">
      {MakeStepIndicatorIcon(item)}
    </div>
  );
}