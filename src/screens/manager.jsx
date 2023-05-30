import React from 'react';
import FlujosList from '../components/flujoList';
import FlujoCreator from '../components/creator';
import { Toaster } from 'react-hot-toast';
import { withManagerProvider } from '../context/manager';

function ManagerScreen() {

  return (
    <div className="min-h-screen md:max-h-screen relative bg-main flex">
      <div>
        <Toaster
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
            }
          }}
          position='bottom-center'
        />
      </div>
      <div className="lg:px-9 lg:pt-9 sm:px-3 sm:pt-3 flex-1 flex">
        <div className='grid md:grid-cols-2 gap-3 grid-flow-row sm:grid-col-1 flex-1 overflow-hidden'>
          <div className="w-full md:max-w-md mx-auto">
            <FlujoCreator />
          </div>
          <FlujosList />
        </div>
      </div>
    </div>
  );
}

export default withManagerProvider(ManagerScreen);