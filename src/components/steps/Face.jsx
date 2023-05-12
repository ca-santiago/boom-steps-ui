import React, { useCallback, useMemo, useState } from 'react';
import Webcam from 'react-webcam';

/**
 * Hooks
 */
import useTimer from '../../hooks/useTImer';
import useQuery from '../../hooks/useQuery';
import { useParams } from 'react-router';

/**
 * Services
 */
import { StepServices } from '../../services/steps';

/**
 * Styles
 */
import './face.css';
import { FaPlay, FaArrowCircleDown } from 'react-icons/fa';

function FaceStep({ onCompleted }) {

  const { id } = useParams();
  const query = useQuery();

  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);

  const [processing, setProcessing] = useState(false);

  const timer = useTimer(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  });


  /**
   * Action functions
   */
  const handleStartCaptureClick = React.useCallback(() => {
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
    if (data.size > 0) setRecordedChunks((prev) => prev.concat(data));
  }, [setRecordedChunks]);

  const getFile = React.useCallback(() => {
    const blob = new Blob(recordedChunks, {
      type: "video/webm"
    });
    return blob;
  }, [recordedChunks]);

  function reset() {
    setRecordedChunks([]);
  }

  const submit = useCallback(function () {
    setProcessing(true);
    const file = getFile();
    const token = query.get('token');
    console.log({ file })
    StepServices.CreateFaceId({
      file,
      filename: 'video.webm',
      flujoId: id,
      token,
    })
      .then(payload => {
        console.log({ payload });
        reset();
        onCompleted?.();
      })
      .catch(err => {
        console.log(err);
        console.log('error getting file');
      })
      .finally(() => {
        setProcessing(false);
      })
    return;
  }, [getFile, setProcessing]);


  /**
   * Generate interface helpers
   */
  const canComplete = useMemo(() => {
    const haveChunks = recordedChunks.length > 0;
    return haveChunks && !processing;
  }, [recordedChunks.length, processing]);

  const RecordOrProcessingBtn = useMemo(() => () => {
    if (processing) return <FaArrowCircleDown />

    const timeIndicator = <div>{timer.time}</div>;

    const playBtn = (
      <div
        className="paused"
        onClick={handleStartCaptureClick}
      >
        <FaPlay />
      </div>
    );

    return capturing ? timeIndicator : playBtn;
  }, [processing, capturing, timer.time]);

  return (
    <>
      <h3 className="step-component-title">Validación con cámara</h3>
      <div className="camera-container">
        <Webcam className="camera" audio={false} ref={webcamRef} />
        <div className="play-pause-btn">
          <RecordOrProcessingBtn />
        </div>
        {canComplete && <button onClick={reset}>Reset</button>}
      </div>
      <div className="create-btn-container">
        <button
          className={`createflow-button ${canComplete ? "" : "btn-disabled"}`}
          onClick={submit} disabled={!canComplete} >Completar</button>
      </div>
    </>
  );
}

export default FaceStep;
