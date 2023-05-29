import React from 'react';

/** Components */
import StepResolver from '../components/stepResolver';
import ReadinessView from '../components/readiness';
import { useCompletionContext, withCompletionProvider } from '../context/completion';
import { Toaster } from 'react-hot-toast';

function CompleteFlujoScreen() {
  const { actions, state } = useCompletionContext();

  const handleOnStart = React.useCallback((payload) => {
    actions.setSession(payload);
  }, [actions.setSession]);

  if (state.loading) return <p>Loading...</p>;

  if (!state.flujo) return <p>Whoops! This flujo does not exists</p>;

  if (state.loadingError) return <p>Error loading... please try again later</p>;

  if (!state.token) {
    return <ReadinessView onStart={handleOnStart} />;
  }

  return (
    <div className="bg-main w-full h-screen flex">
      <Toaster position='top-right' toastOptions={{ duration: 1200 }} />
      <div className="max-w-screen-lg h-full flex flex-1 m-auto">
        <StepResolver />
      </div>
    </div>
  );
}

export default withCompletionProvider(CompleteFlujoScreen);
