import React from 'react';

/** Hooks */
import { useParams } from 'react-router';

/** Components */
import { FlujoServices } from '../services/flujo';
import StepResolverView from './StepResolver';
import ReadinessView from '../components/readiness';
import { CompletionContext } from '../context/completion';

export default function CompleteFlujoScreen() {
  const { id } = useParams();

  const [state, setState] = React.useState({
    flujoData: null,
    loading: true,
    sessionToken: null,
    secondsLeft: 0
  });

  React.useEffect(() => {
    FlujoServices.getFlujoById(id)
      .then((payload) => {
        setState(prev => ({
          ...prev,
          flujoData: payload,
          loading: false,
        }));
      })
      .catch((err) => {
        console.log(err);
        setState({
          loading: false,
          error: true,
          flujoData: null,
        });
      });
  }, [id]);

  const handleOnStart = React.useCallback((payload) => {
    const { token, flujo, secondsLeft } = payload;
    setState(prev => ({
      ...prev,
      sessionToken: token,
      flujoData: flujo,
      secondsLeft,
    }));
  }, []);

  if (state.loading) return null;

  if (!state.flujoData) return <p>Whoops! This flujo does not exists</p>;

  if (state.error) return <p>Error loading... please try again later</p>;

  if (!state.sessionToken) {
    return <ReadinessView data={state.flujoData} onStart={handleOnStart} />;
  }

  const value = { token: state.sessionToken, flujo: state.flujoData, timeLeft: state.secondsLeft };

  return (
    <CompletionContext.Provider value={value}>
      <div className="flex h-screen bg-main">
        <StepResolverView flujo={state.flujoData} timeLeft={state.secondsLeft} />
      </div>
    </CompletionContext.Provider>
  );
}
