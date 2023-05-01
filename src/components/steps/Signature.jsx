import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import SignaturePad from 'signature_pad';
import useQuery from '../../hooks/useQuery';
import { StepServices } from '../../services/steps';

import './signature.css';

function SignatureStep({ onCompleted }) {

  const { id } = useParams();
  const query = useQuery();

  const canvasRef = useRef();
  const [pad, setPad] = useState(null); 
  const [img, setImg] = useState(null);

  function onEndDrawing() {
    if(!pad) return;
    const imgURL = pad.toDataURL("image/jpeg");
    setImg(imgURL);
  }

  useEffect(()=> {
    const _pad = new SignaturePad(canvasRef.current, { backgroundColor: 'white' });
    setPad(() => _pad);
    _pad.onEnd = () => onEndDrawing();
    return () => {}
  }, [canvasRef.current]);
  
  function submit() {
    if(!img) return;
    
    fetch(img)
      .then(res => res.blob())
      .then(fileData =>  StepServices.CreateSignature({
          file: fileData,
          filename: 'signature.jpg',
          flujoId: id,
          token: query.get('token')
        })
      )
      .then(()=> {
        onCompleted();
      })
      .catch(err => {
        console.log({err});
      })
  }

  function resetCanvas() {
    setImg(null);
    pad.clear();
  }

  return (
    <>
      <h3 className="step-component-title">Firma autógrafa</h3>
      <div className="canvas-container">
        <canvas ref={canvasRef} className="canvas"></canvas>
        <div className="canvas-actions">
          <div>
            <button 
              disabled={pad?.isEmpty()}
              className={`canvas-action-btn ${pad?.isEmpty() ? "disabled": ""}`}
              onClick={()=> resetCanvas()}
            >Restablecer</button>
          </div>
        </div>
      </div>
      <div className="create-btn-container">
        <button 
          disabled={!img}
          onClick={()=> submit()}
          className={`createflow-button ${img ? "" : "btn-disabled"}`}
        >Enviar</button>
      </div>
    </>
  );
}

export default SignatureStep;
