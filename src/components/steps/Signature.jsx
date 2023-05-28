import React from 'react';
import { useParams } from 'react-router';
import SignaturePad from 'signature_pad';
import { useCompletionContext } from '../../context/completion';
import CompletionService from '../../services/completion';

function SignatureStep({ onCompleted }) {
  const { id } = useParams();
  const { state: { token } } = useCompletionContext();

  const canvasRef = React.useRef();
  const [pad, setPad] = React.useState(null);
  const [img, setImg] = React.useState(null);

  function resetCanvas() {
    setImg(null);
    pad.clear();
  }

  function onEndDrawing() {
    if (!pad) return;
    const imgURL = pad.toDataURL("image/jpeg");
    setImg(imgURL);
  }

  function fitToContainer(canvas) {
    if (!canvas) return;
    // Make it visually fill the positioned parent
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    // ...then set the internal size to match
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  window.onresize = () => {
    fitToContainer(canvasRef.current);
    if (pad) {
      resetCanvas();
    }
  }

  React.useEffect(() => {
    fitToContainer(canvasRef.current);
    const _pad = new SignaturePad(canvasRef.current, { backgroundColor: 'rgb(255, 255, 255)' });
    _pad.addEventListener("endStroke", onEndDrawing);
    setPad(_pad);
  }, [canvasRef.current]);

  function submit() {
    if (!img) return;
    fetch(img)
      .then(res => res.blob())
      .then(fileData => {
        return CompletionService.putSignature({
          file: fileData,
          filename: 'signature.jpg',
          flujoId: id,
          token,
        })
      })
      .then(() => {
        resetCanvas();
        onCompleted?.();
      })
      .catch(err => {
        console.log({ err });
      })
  }

  const showReset = img;

  return (
    <div>
      <h3 className="step-title">Digital signature</h3>
      <div className="w-full h-72 mt-10 mx-auto flex justify-center">
        <canvas onBlur={onEndDrawing} onChange={onEndDrawing} ref={canvasRef} className="w-full border rounded-md flex border-gray-400"></canvas>
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
