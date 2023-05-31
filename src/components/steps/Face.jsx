import React, { useCallback, useMemo } from 'react';
import Webcam from 'react-webcam';

/**
 * Hooks
 */
import useTimer from '../../hooks/useTImer';
import { useParams } from 'react-router';

/**
 * Services
 */
import CompletionService from '../../services/completion';

/**
 * Styles
 */
import { useCompletionContext } from '../../context/completion';
import { toast } from 'react-hot-toast';
import { FiUpload } from 'react-icons/fi';
import { BsRecordCircle, BsRecordCircleFill } from 'react-icons/bs';
import axios from 'axios';

function FaceStep({ onCompleted }) {
  const { id } = useParams();
  const { state: { token } } = useCompletionContext();

  const [state, setState] = React.useState({
    file: null,
    recording: false,
    processing: false,
  });

  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);

  const timer = useTimer(() => {
    mediaRecorderRef.current.stop();
    setState(prev => ({
      ...prev,
      recording: false
    }));
  });

  /** START RECORDING */
  const handleStartCaptureClick = React.useCallback(() => {
    if (!webcamRef.current.stream) {
      toast.error('Cannot start recording, please try again later', { duration: 1200 });
      return;
    }

    timer.reset();
    setState(prev => ({
      ...prev,
      file: null,
      recording: true,
    }));
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm;codecs=vp8",
    });
    mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable);
    mediaRecorderRef.current.start();
    timer.start();
  }, [webcamRef, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(({ data }) => {
    if (data.size > 0) {
      setState(prev => ({
        ...prev,
        file: data,
        recording: false,
      }));
    }
  }, []);

  const getFile = React.useCallback((blob) => {
    return new File([blob], "video.webm", { type: 'video/webm' });
  }, []);

  function reset() {
    setState({
      recording: false,
      file: null,
      processing: false,
    });
  }

  const sendFile = (signedUrl) => {
    return axios.put(signedUrl, getFile(state.file), {
      headers: {
        'Content-Type': 'video/webm'
      }
    })
  }

  const submit = useCallback(() => {
    setState(prev => ({
      ...prev,
      processing: true,
    }));

    CompletionService.putFaceId({ token, flujoId: id })
      .then(({ signedUrl }) => {
        return sendFile(signedUrl);
      })
      .then(() => {
        reset();
        onCompleted?.();
      })
      .catch(err => {
        console.log(err);
        toast.error('Could not upload the video, please try again', { duration: 2000 });
      })
      .finally(() => {
        setState(prev => ({
          ...prev,
          processing: false,
        }));
      })
  }, [state.file]);

  const canComplete = useMemo(() => {
    return state.file && !state.processing;
  }, [state.file, state.processing]);

  const RecordOrProcessingBtn = useMemo(() => () => (
    <div className="paused flex w-10 h-10 items-center justify-center text-red-600">
      {state.processing && <FiUpload className="animate-pulse" />}
      {!state.processing && !canComplete && (state.recording ? <BsRecordCircleFill size={25} className="animate-pulse" /> : <BsRecordCircle className="cursor-pointer" onClick={handleStartCaptureClick} size={25} />)}
    </div>
  ), [state.processing, state.recording, timer.time, canComplete]);

  return (
    <div className="w-fll h-full text-wix select-none">
      <h3 className="step-title">Camera validation</h3>
      <div className="m-auto  max-w-xl mt-5 box-border">
        <div className={`relative flex items-center justify-center h-72 bg-slate-200 rounded-xl overflow-hidden border-spacing-1 ${state.recording ? "border border-red-400" : "border-transparent"}`}>
          {state.recording && (
            <div className="flex absolute top-0 right-0 z-50 text-white font-bold py-2 px-3 bg-neutral-950 opacity-80">
              <p className="">{timer.time}</p>
            </div>
          )}
          <Webcam mirrored videoConstraints={{ facingMode: "user", width: 640, height: 480 }} className="flex" audio={false} ref={webcamRef} />
        </div>
        <div className="w-full flex justify-center mt-2">
          <RecordOrProcessingBtn />
        </div>
      </div>
      <div className="w-full grid gap-2 justify-normal sm:justify-end grid-flow-row sm:grid-flow-col mt-10">
        {canComplete && (
          <button
            className="p-2 px-4 w-full text-wix bg-accent rounded-lg"
            onClick={reset}
          >Reset</button>
        )}
        <button
          className={`p-2 px-4 w-full md:w-auto text-wix rounded-lg ${canComplete ? "bg-accent" : "bg-slate-400 text-white"}`}
          onClick={submit} disabled={!canComplete}
        >Completar</button>
      </div>
    </div>
  );
}

export default FaceStep;
