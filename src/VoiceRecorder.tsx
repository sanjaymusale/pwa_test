import React, { useState, useRef } from "react";

const VoiceRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone access denied:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="p-4 rounded-xl shadow-lg bg-gray-100 max-w-sm mx-auto text-center">
      <h2 className="text-lg font-semibold mb-4">Voice Recorder</h2>

      {!isRecording ? (
        <button
          onClick={startRecording}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          🎤 Start Recording
        </button>
      ) : (
        <button
          onClick={stopRecording}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          ⏹ Stop Recording
        </button>
      )}

      {audioURL && (
        <div className="mt-4">
          <h3 className="text-md font-medium">Playback:</h3>
          <audio controls src={audioURL} className="mt-2 w-full"></audio>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
