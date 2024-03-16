import { useEffect, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from 'react-use-clipboard';

function App() {
  const [textToCopy, setTextToCopy] = useState()
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 3000
  });

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  useEffect(() => {
    setTextToCopy(transcript)
  }, [transcript])

  return (
    <>
      <h1 className='text-center font-semibold text-3xl m-2'>Speech to Text Converter</h1>

      <div className='shadow-2xl w-8/12 mx-auto'>
        <p className='text-rose-600 font-semibold m-3'>Microphone: {listening ? 'on' : 'off'}</p>
        <div className='mx-3 min-h-[50vh]'>{transcript}</div>
        <div className='flex flex-wrap'>
          <button className='text-center m-3 bg-emerald-600	text-white py-1 px-3 rounded-md border-none' onClick={setCopied}> {isCopied ? 'Copied!' : 'Copy to clipboard'}</button>
          <button className='text-center m-3 bg-emerald-600	text-white py-1 px-3 rounded-md border-none' onClick={startListening}>Start Listening</button>
          <button className='text-center m-3 bg-emerald-600	text-white py-1 px-3 rounded-md border-none' onClick={SpeechRecognition.stopListening}>Stop Listening</button>
          <button className='text-center m-3 bg-emerald-600	text-white py-1 px-3 rounded-md border-none' onClick={resetTranscript}>Reset</button>
        </div>
      </div>
    </>
  )
}

export default App
