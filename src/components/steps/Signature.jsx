import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import SignaturePad from 'signature_pad';
import { StepServices } from '../../services/steps';
import { useCompletionContext } from '../../context/completion';

function SignatureStep({ onCompleted }) {

  const { id } = useParams();
  const { state: { token } } = useCompletionContext();

  const canvasRef = useRef();
  const [pad, setPad] = useState(null);
  const [img, setImg] = useState(null);

  function onEndDrawing() {
    if (!pad) return;
    const imgURL = pad.toDataURL("image/jpeg");
    setImg(imgURL);
  }

  useEffect(() => {
    const _pad = new SignaturePad(canvasRef.current, { backgroundColor: 'white' });
    _pad.addEventListener("endStroke", onEndDrawing);
    setPad(() => _pad);
  }, [canvasRef.current]);

  function submit() {
    if (!img) return;
    fetch(img)
      .then(res => res.blob())
      .then(fileData => {
        console.log(fileData)
        return StepServices.putSignature({
          file: fileData,
          filename: 'signature.jpg',
          flujoId: id,
          token,
        })
      })
      .then(() => {
        onCompleted();
      })
      .catch(err => {
        console.log({ err });
      })
  }

  function resetCanvas() {
    setImg(null);
    pad.clear();
  }

  const showReset = img;

  return (
    <div>
      <h3 className="text-montserrat font-semibold text-gray-700">Digital signature</h3>
      <div className="w-full mt-10">
        <canvas onBlur={onEndDrawing} onChange={onEndDrawing} ref={canvasRef} height={300} width={550} className="border rounded-md flex border-gray-400"></canvas>
      </div>
      <div className="grid grid-flow-col justify-end gap-3 mt-10">
        {showReset && (
          <button
            disabled={pad?.isEmpty()}
            className={`p-2 px-3 rounded-md bg-accent ${pad?.isEmpty() ? "disabled" : ""}`}
            onClick={resetCanvas}
          >Reset</button>
        )}
        <button
          disabled={!img}
          onClick={() => submit()}
          className={`p-2 px-3 rounded-md ${img ? "bg-accent" : "bg-gray-400 text-gray-100"}`}
        >Complete</button>
      </div>
    </div>
  );
}

export default SignatureStep;
