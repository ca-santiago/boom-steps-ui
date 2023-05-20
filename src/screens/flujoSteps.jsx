import React from 'react';

/** Hooks */
import { useParams } from 'react-router';

/** Components */
import { FlujoServices } from '../services/flujo';
import StepResolverView from './StepResolver';

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

  if (state.loading)
    return <p>Loading...</p>;

  console.log({
    state
  });
  if (state.error || !state.flujoData) return <p>Error loading... please try again later</p>;

  if (state.flujoData) {
    return (
      <div>
        <pre>{state.flujoData.status}</pre>
      </div>
    );
  }

  return (
    <>
      <div className="step-container">
        <StepResolverView flujo={flujo} />
      </div>
    </>
  );
}
