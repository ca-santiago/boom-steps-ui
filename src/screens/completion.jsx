import React from 'react';

/** Hooks */
import { useParams } from 'react-router';

/** Components */
import { FlujoServices } from '../services/flujo';
import StepResolverView from './StepResolver';
import ReadinessView from '../components/readiness';
import { isInReadiness } from '../helpers/flujos';

export default function CompleteFlujoScreen() {
  const { id } = useParams();

  const [state, setState] = React.useState({
    flujoData: null,
    loading: true,
    sessionToken: null
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

  const handleOnStart = (token) => {
    setState(prev => ({
      ...prev,
      sessionToken: token
    }));
  }

  if (state.loading) return <p>Loading...</p>;

  if (state.error || !state.flujoData) return <p>Error loading... please try again later</p>;

  if (isInReadiness(state.flujoData)) {
    return <ReadinessView data={state.flujoData} onStart={handleOnStart} />;
  }

  return (
    <>
      <div className="step-container">
        <StepResolverView flujo={flujo} />
      </div>
    </>
  );
}
