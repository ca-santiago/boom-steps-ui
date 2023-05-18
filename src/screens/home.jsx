import React from 'react';
import { FlujoServices } from '../services/flujo';
import FlujosList from '../components/flujoList';
import FlujoCreator from '../components/creator';
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
    <div className="min-h-screen max-h-screen relative bg-main overflow-hidden">
      <div className="lg:p-9 sm:p-4">
        <div><Toaster reverseOrder position='bottom-center' /></div>
        <div className='grid md:grid-cols-2 gap-3 grid-flow-row sm:grid-col-1'>
          <div classNames2='lg:max-w-lx xl:min-w-xl md:max-w-full'>
            <div className="sm:w-full md:w-full lg:w-11/12 xl:w-10/12 mx-auto">
              <FlujoCreator onCreate={handleOnCreateFlujo} />
              {lastCreated && <LastCreatedLink flujo={lastCreated} />}
            </div>
          </div>
          <div className="">
            <FlujosList data={flujos} />
          </div>
        </div>
      </div>
    </div>
  );
}
