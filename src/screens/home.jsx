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
    <div className="lg:m-9 sm:m-1">
      <div className='flex flex-col md:flex-row flex-wrap'>
        <div className='flex-1 lg:max-w-lx xl:max-w-xl md:max-w-full m-3'>
          <FlujoCreator />
        </div>
        <div className='flex-1 m-3'>
          <FlujosList data={flujos} />
        </div>
      </div>
    </div>
  );
}
