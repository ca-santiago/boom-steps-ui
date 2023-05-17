import React from 'react';
import { FlujoServices } from '../services/flujo';
import FlujosList from '../components/FlujosList';
import FlujoCreator from '../components/creator/flujo-creator';
import LastCreatedLink from '../components/lastCreatedLink';
import { Toaster } from 'react-hot-toast';

export default function CreateFlujoScreen() {
  const [flujos, setFlujos] = React.useState([]);
  const [lastCreated, setLastCreated] = React.useState(null);

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

  const handleOnCreateFlujo = (data) => {
    setLastCreated(data);
  }

  if (loading) return <p>Cargando flujos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="lg:m-9 sm:m-1 relative">
      <div><Toaster reverseOrder position='bottom-center' /></div>
      <div className='flex flex-col md:flex-row flex-wrap'>
        <div className='flex-1 lg:max-w-lx xl:max-w-xl md:max-w-full m-3'>
          <FlujoCreator onCreate={handleOnCreateFlujo} />
          {lastCreated && <LastCreatedLink flujo={lastCreated} />}
        </div>
        <div className='flex-1 m-3'>
          <FlujosList data={flujos} />
        </div>
      </div>
    </div>
  );
}
