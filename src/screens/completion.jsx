import React from 'react';

/** Hooks */
import { useParams } from 'react-router';

/** Components */
import { FlujoServices } from '../services/flujo';
import StepResolverView from './StepResolver';
import ReadinessView from '../components/readiness';
import { useCompletionContext, withCompletionProvider } from '../context/completion';

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
    <div className="bg-main h-screen flex">
      <StepResolverView />
    </div>
  );
}

export default withCompletionProvider(CompleteFlujoScreen);
