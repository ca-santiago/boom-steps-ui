import React from 'react';
import { Link } from 'react-router-dom';

/***
 * Hooks
 */
import useQuery from '../hooks/useQuery';
import { useNavigate, useParams } from 'react-router';

/**
 * Components
 */
import { FlujoServices } from '../services/flujo';
import StepResolverView from './StepResolver';

export default function CompleteFlujoScreen() {
  const { id } = useParams();
  const query = useQuery();
  const navigate = useNavigate();

  const [flujo, setFlujo] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    // HERE: Temporary disable redirection
    //if(!query.get('token')) navigate('/');
    
    FlujoServices.getFlujoById(id)
    .then((data) => data.json())
    .then((payload)=> {
      setFlujo(payload);
    })
    .catch(function() {
      // history.replace('/');
    })
    .finally(()=> {
      setLoading(false);
    })
  }, [id]);

  if(loading)
    return <p>Loading...</p>;

  
  if(!loading && flujo === null) 
    return <Link to="/"><p>Regresar</p></Link>;

  return (
    <>
      <div className="step-container">
        <StepResolverView flujo={flujo} />
      </div>
    </>
  );
}
