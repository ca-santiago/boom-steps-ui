import React, { useCallback, useMemo, useState } from 'react';
import Webcam from 'react-webcam';

/**
 * Hooks
 */
import useTimer from '../../hooks/useTImer';
import { useParams } from 'react-router';

/**
 * Services
 */
import { StepServices } from '../../services/steps';

/**
 * Styles
 */
import { useCompletionContext } from '../../context/completion';
import { toast } from 'react-hot-toast';
import { FiUpload } from 'react-icons/fi';
import { BsRecordCircle, BsRecordCircleFill } from 'react-icons/bs';


const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
}

function FaceStep({ onCompleted }) {
  const { id } = useParams();
  const { state: { token } } = useCompletionContext();
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);

  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);

  const [processing, setProcessing] = useState(false);

  const timer = useTimer(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  });

  /** START CAPTURING */
  const handleStartCaptureClick = React.useCallback(() => {
    if (!webcamRef.current.stream) {
      toast.error('Cannot start recording, please try again later', { duration: 1200 });
      return;
    }

    timer.reset();
    setRecordedChunks([]);
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable);
    mediaRecorderRef.current.start();
    timer.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(({ data }) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => prev.concat(data));
    }
  }, [setRecordedChunks]);

  const getFile = React.useCallback((chunks) => {
    const blob = new Blob(chunks, {
      type: "video/webm"
    });
    return blob;
  }, []);

  function reset() {
    setRecordedChunks([]);
  }

  const submit = useCallback(function () {
    setProcessing(true);
    const file = getFile();
    StepServices.CreateFaceId({
      file,
      filename: 'video.webm',
      flujoId: id,
      token,
    })
      .then(() => {
        toast.success('Step completed');
        reset();
        onCompleted?.();
      })
      .catch(err => {
        console.log(err);
        toast.error('Could not upload the video, please try again');
      })
      .finally(() => {
        setProcessing(false);
      })
    return;
  }, [getFile, setProcessing]);

  const canComplete = useMemo(() => {
    const haveChunks = recordedChunks.length > 0;
    return haveChunks && !processing;
  }, [recordedChunks.length, processing]); 9

  const RecordOrProcessingBtn = useMemo(() => () => (
    <div className="paused flex w-10 h-10 items-center justify-center text-red-600 cursor-pointer">
      {processing && <FiUpload className="animate-pulse" />}
      {!processing && (capturing ? <BsRecordCircleFill size={25} className="animate-pulse" /> : <BsRecordCircle onClick={handleStartCaptureClick} size={25} />)}
    </div>
  ), [processing, capturing, timer.time]);

  return (
    <div className="w-fll h-full text-wix select-none">
      <h3 className="font-semibold text-lg text-center">Validación con cámara</h3>
      <div className="m-auto  max-w-xl mt-5 box-border">
        <div className={`relative h-72 bg-slate-200 rounded-xl overflow-hidden border-spacing-1 ${capturing ? "border border-red-400" : "border-transparent"}`}>
          {capturing && (
            <div className="flex absolute top-0 right-0 z-50 text-white font-bold py-2 px-3 bg-neutral-950 opacity-80">
              <p className="">{timer.time}</p>
            </div>
          )}
          <Webcam videoConstraints={videoConstraints} audio={false} ref={webcamRef} />
        </div>
        <div className="w-full flex justify-center mt-2">
          <RecordOrProcessingBtn />
        </div>
      </div>
      <div className="w-full grid gap-2 justify-end grid-flow-col mt-10">
        {canComplete && (
          <button
            className="p-2 px-4 text-wix bg-accent rounded-lg"
            onClick={reset}
          >Reset</button>
        )}
        <button
          className={`p-2 px-4 text-wix rounded-lg ${canComplete ? "bg-accent" : "bg-gray-400 text-white"}`}
          onClick={submit} disabled={!canComplete}
        >Completar</button>
      </div>
    </div>
  );
}

export default FaceStep;
