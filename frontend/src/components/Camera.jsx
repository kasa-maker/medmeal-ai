import React, { useState, useRef } from 'react';

function Camera({ onCapture, onFileSelect }) {
  const [isCamera, setIsCamera] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      setStream(mediaStream);
      setIsCamera(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Camera access error:', error);
      alert('Unable to access camera. Please use file upload instead.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsCamera(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);

      // Convert canvas to blob, then to File
      canvas.toBlob((blob) => {
        const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
        onCapture(file);
        stopCamera();
      }, 'image/jpeg', 0.95);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div style={styles.container}>
      {!isCamera ? (
        <div style={styles.options}>
          <button onClick={startCamera} style={styles.button}>
            📷 Open Camera
          </button>
          <div style={styles.divider}>or</div>
          <label style={styles.uploadLabel}>
            📁 Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={styles.fileInput}
            />
          </label>
        </div>
      ) : (
        <div style={styles.cameraView}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={styles.video}
          />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <div style={styles.controls}>
            <button onClick={capturePhoto} style={styles.captureButton}>
              📸 Capture
            </button>
            <button onClick={stopCamera} style={styles.cancelButton}>
              ✕ Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  button: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '15px 40px',
    borderRadius: '25px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
  divider: {
    color: '#999',
    fontSize: '14px',
  },
  uploadLabel: {
    background: 'white',
    color: '#667eea',
    border: '2px solid #667eea',
    padding: '15px 40px',
    borderRadius: '25px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
  fileInput: {
    display: 'none',
  },
  cameraView: {
    position: 'relative',
  },
  video: {
    width: '100%',
    maxWidth: '600px',
    borderRadius: '15px',
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px',
  },
  captureButton: {
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '12px 30px',
    borderRadius: '25px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  cancelButton: {
    background: '#f44336',
    color: 'white',
    border: 'none',
    padding: '12px 30px',
    borderRadius: '25px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default Camera;
