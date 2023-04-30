import React from 'react';
import { FlujoServices } from '../services/flujo';
import MakeStepIndicatorIcon, { MakeStatusIcon } from './makeStepIndicator';

export default function FlujosList() {
  const [flujos, setFlujos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    FlujoServices.GetFlujosPaginated()
      .then(({ results }) => {
        console.log({ results })
        setFlujos(results);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando flujos...</p>

  if (flujos.length < 1) return <p>No hay flujos disponibles</p>

  return (
    <>
      {flujos.map((item, index, arr) => renderFlujo(item, index, arr.length))}
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