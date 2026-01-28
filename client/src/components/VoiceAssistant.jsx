import { useState } from 'react'
import { t } from '../translations'
import { MicrophoneIcon, EditIcon } from './Icons'

const VoiceAssistant = ({ onResult, isAnalyzing, language = 'english' }) => {
  const [isListening, setIsListening] = useState(false)
  const [textInput, setTextInput] = useState('')
  const [showTextInput, setShowTextInput] = useState(false)
  const supported = ('webkitSpeechRecognition' in window) || ('SpeechRecognition' in window)

  const startListening = () => {
    if (!supported) return
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-IN' // Indian English

    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      onResult(transcript)
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
      
      // Provide user feedback based on error type
      if (event.error === 'network') {
        // Try to restart recognition or provide fallback
        setTimeout(() => {
          console.log('Retrying voice recognition...')
          // You can add retry logic here
        }, 1000)
      } else if (event.error === 'not-allowed') {
        alert('Microphone permission denied. Please allow microphone access and refresh the page.')
      } else if (event.error === 'no-speech') {
        console.log('No speech detected - try again')
      }
    }

    recognition.start()
  }

  const handleTextSubmit = (e) => {
    e.preventDefault()
    if (textInput.trim()) {
      onResult(textInput)
      setTextInput('')
    }
  }

  return (
    <div className="voice-assistant">
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
        <button
          className={`voice-btn ${isListening ? 'listening' : ''} ${!supported ? 'unsupported' : ''}`}
          onClick={startListening}
          disabled={isAnalyzing || !supported}
          title={language === 'gujarati' 
            ? (supported ? "બોલવા માટે ક્લિક કરો" : "આ બ્રાઉઝરમાં વોઇસ સપોર્ટેડ નથી")
            : (supported ? "Click to speak" : "Voice not supported in this browser")
          }
        >
          {isListening ? (
            <div className="voice-icon-animated">
              <MicrophoneIcon size={24} color="var(--color-white)" />
            </div>
          ) : (
            <MicrophoneIcon size={24} color="var(--color-white)" />
          )}
        </button>
        
        <button
          className="text-input-btn"
          onClick={() => setShowTextInput(!showTextInput)}
          title={language === 'gujarati' ? "તેના બદલે કમાન્ડ ટાઇપ કરો" : "Type command instead"}
          style={{
            background: 'var(--color-moss-light)',
            color: 'var(--color-white)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <EditIcon size={16} color="var(--color-white)" />
        </button>
      </div>
      
      {showTextInput && (
        <form onSubmit={handleTextSubmit} style={{ marginTop: 'var(--space-sm)' }}>
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder={language === 'gujarati' 
              ? "કમાન્ડ ટાઇપ કરો (દા.ત., 'છોડનું વિશ્લેષણ કરો')" 
              : "Type command (e.g., 'analyze plant')"
            }
            style={{
              padding: 'var(--space-sm)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)',
              width: '200px',
              fontSize: '0.9rem'
            }}
          />
          <button
            type="submit"
            style={{
              marginLeft: 'var(--space-xs)',
              padding: 'var(--space-sm)',
              background: 'var(--color-moss-deep)',
              color: 'var(--color-white)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer'
            }}
          >
            {language === 'gujarati' ? 'જાઓ' : 'Go'}
          </button>
        </form>
      )}
      
      {!supported && (
        <small style={{ color: 'var(--color-warning)', fontSize: '0.8rem' }}>
          {language === 'gujarati' 
            ? 'વોઇસ સપોર્ટેડ નથી - ટેક્સ્ટ ઇનપુટનો ઉપયોગ કરો'
            : 'Voice not supported - use text input'
          }
        </small>
      )}
      
      {isListening && (
        <div className="listening-indicator">
          {language === 'gujarati' ? 'સાંભળી રહ્યું છે...' : 'Listening...'}
        </div>
      )}
    </div>
  )
}

export default VoiceAssistant
