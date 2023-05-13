import React from 'react';
import { FlujoServices } from '../services/flujo';
import FlujosList from '../components/FlujosList';
import FlujoCreator from '../components/creator/flujo-creator';

import './home.css';

export default function CreateFlujoScreen() {

  const [flujos, setFlujos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    FlujoServices.GetFlujosPaginated()
      .then(({ results }) => setFlujos(results))
      .catch(() => {
        setError('Something went wrong, try refreshing the page');
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  if (loading) return <p>Cargando flujos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="home-main-container">
      <FlujoCreator />
      <div className="flujos-list-container container-card-style1">
        <h3 key='flujo-list-title'>Flujos creados</h3>
        <FlujosList data={flujos} />
      </div>
    </div>
  );
}
