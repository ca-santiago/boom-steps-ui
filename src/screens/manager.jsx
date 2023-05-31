import React from 'react';
import FlujosList from '../components/flujoList';
import FlujoCreator from '../components/creator';
import { Toaster } from 'react-hot-toast';
import { withManagerProvider } from '../context/manager';

const ToasterComponent = () => (
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
);

function ManagerScreen() {
  return (
    <div className="min-h-screen md:max-h-screen relative bg-main flex">
      <ToasterComponent />
      <div className="flex w-full lg:px-9 lg:pt-9 sm:px-3 sm:pt-3">
        <div className="flex w-full lg:w-11/12 xl:w-7/12 max-w-4xl mx-auto">
          <div className='grid md:grid-cols-2 gap-3 w-full grid-col-1 flex-1 overflow-hidden'>
            <FlujoCreator />
            <FlujosList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withManagerProvider(ManagerScreen);