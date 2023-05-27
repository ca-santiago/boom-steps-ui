import React from 'react';

/** Hooks */
import { useParams } from 'react-router';

/** Components */
import { FlujoServices } from '../services/flujo';
import StepResolver from '../components/stepResolver';
import ReadinessView from '../components/readiness';
import { useCompletionContext, withCompletionProvider } from '../context/completion';
import { Toaster } from 'react-hot-toast';

function CompleteFlujoScreen() {
  const { id } = useParams();
  const { actions, state } = useCompletionContext();

  React.useEffect(() => {
    FlujoServices.getFlujoById(id)
      .then((payload) => {
        actions.setFlujo(payload);
      })
      .catch((err) => {
        console.log(err);
        actions.setLoadingError(true);
      });
  }, [id]);

  const handleOnStart = React.useCallback((payload) => {
    actions.setSession(payload);
  }, []);

  if (state.loading) return null;

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
