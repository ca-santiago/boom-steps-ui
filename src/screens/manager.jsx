import React from 'react';
import { FlujoServices } from '../services/flujo';
import FlujosList from '../components/flujoList';
import FlujoCreator from '../components/creator';
import LastCreatedLink from '../components/lastCreatedLink';
import { Toaster } from 'react-hot-toast';

export default function ManagerScreen() {
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
    <div className="min-h-screen md:max-h-screen relative bg-main flex">
      <div className="lg:px-9 lg:pt-9 sm:px-3 sm:pt-3 flex-1 flex">
        <div><Toaster reverseOrder position='top-right' /></div>

        <div className='grid md:grid-cols-2 gap-3 grid-flow-row sm:grid-col-1 flex-1 overflow-hidden'>
          <div>
            <div className="sm:w-full md:w-full lg:w-11/12 xl:w-10/12 mx-auto">
              <FlujoCreator onCreate={handleOnCreateFlujo} />
              {lastCreated && <LastCreatedLink flujo={lastCreated} />}
            </div>
          </div>
          <FlujosList data={flujos} />
        </div>
      </div>
    </div>
  );
}
