import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Hero from './components/Hero'
import UploadZone from './components/UploadZone'
import AnalysisResults from './components/AnalysisResults'
import ScanHistory from './components/ScanHistory'
import Navbar from './components/Navbar'
import BasicCareTips from './components/BasicCareTips'
import SeasonalCareTips from './components/SeasonalCareTips'
import WeatherSoilData from './components/WeatherSoilData'
import { API_BASE_URLS } from './config/api'
import { optimizeImage, getImageHash } from './utils/imageOptimizer'
import { analysisCache } from './utils/analysisCache'

const ANALYZE_TIMEOUT_MS = 120000 
const ANALYZE_MAX_ATTEMPTS = 1 
const MotionDiv = motion.div

function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState('home') 

  // State
  const [uploadedImage, setUploadedImage] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [analysisError, setAnalysisError] = useState(null)
  const [scanHistory, setScanHistory] = useState([])
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language')
    return saved || 'english'
  })

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  // Theme State
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-mode')
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.body.classList.remove('dark-mode')
      document.documentElement.setAttribute('data-theme', 'light')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const toggleTheme = () => setIsDark(!isDark)

  const formatProviderStatus = (providerStatus) => {
    if (!providerStatus || typeof providerStatus !== 'object') {
      return ''
    }
    return Object.entries(providerStatus)
      .map(([provider, status]) => `${provider}: ${status}`)
      .join(' | ')
  }

  const fetchWithApiFallback = async (path, options) => {
    const errors = []
    const endpointErrors = []

    for (const baseUrl of API_BASE_URLS) {
      try {
        const response = await fetch(`${baseUrl}${path}`, options)
        if (response.ok) {
          return response
        }

        const body = await response.text().catch(() => '')
        let parsedBody = null
        if (body) {
          try {
            parsedBody = JSON.parse(body)
          } catch {
            parsedBody = null
          }
        }

        endpointErrors.push({
          endpoint: `${baseUrl}${path}`,
          status: response.status,
          body,
          parsedBody
        })
        errors.push(`${baseUrl}${path} -> ${response.status}${body ? `: ${body}` : ''}`)
      } catch (error) {
        errors.push(`${baseUrl}${path} -> ${error.message}`)
      }
    }

    const combinedError = new Error(`All backend endpoints failed. ${errors.join(' | ')}`)
    combinedError.endpointErrors = endpointErrors

    const backendError = endpointErrors.find(({ parsedBody }) =>
      parsedBody && (parsedBody.provider_status || parsedBody.details || parsedBody.error)
    )

    if (backendError) {
      combinedError.status = backendError.status
      combinedError.backend = backendError.parsedBody
      combinedError.providerStatus = backendError.parsedBody.provider_status
    }

    throw combinedError
  }

  const analyzePlantDisease = async (imageData) => {
    const imageHash = getImageHash(imageData)
    const cachedResult = analysisCache.get(imageHash)
    if (cachedResult) {
      return cachedResult
    }

    console.log('Optimizing image...')
    const optimizedImage = await optimizeImage(imageData, 1024, 1024, 0.85)

    for (let attempt = 1; attempt <= ANALYZE_MAX_ATTEMPTS; attempt++) {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), ANALYZE_TIMEOUT_MS)

      try {
        const response = await fetchWithApiFallback('/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: optimizedImage }),
          signal: controller.signal
        })

        clearTimeout(timeoutId)

        const result = await response.json()
        if (result?.is_mock) {
          const mockError = new Error('Backend returned demo fallback data instead of real AI analysis.')
          mockError.providerStatus = result?.provider_status
          mockError.isMock = true
          throw mockError
        }

        analysisCache.set(imageHash, result)
        return result
      } catch (error) {
        clearTimeout(timeoutId)
        const timedOut = error?.name === 'AbortError' || error?.name === 'TimeoutError' || String(error?.message || '').includes('signal timed out')
        const isLastAttempt = attempt === ANALYZE_MAX_ATTEMPTS

        if (timedOut && !isLastAttempt) {
          await new Promise((resolve) => setTimeout(resolve, 2000))
          continue
        }

        const backendMessage = error?.backend?.details || error?.backend?.error
        const message = timedOut
          ? 'Backend timed out. Please try again.'
          : backendMessage || error?.message || 'Analysis failed.'

        const normalizedError = new Error(message)
        normalizedError.status = error?.status
        normalizedError.providerStatus = error?.providerStatus || error?.backend?.provider_status
        normalizedError.isMock = Boolean(error?.isMock)
        throw normalizedError
      }
    }
  }

  const performAnalysis = async (imageData) => {
    setIsAnalyzing(true)
    setAnalysisError(null)
    setAnalysisResult(null)
    try {
      const result = await analyzePlantDisease(imageData)
      setAnalysisResult(result)
      setScanHistory(prev => [{ ...result, timestamp: new Date(), image: imageData }, ...prev])
      setCurrentPage('analysis')
    } catch (error) {
      console.error('Analysis failed:', error)
      const providerStatusSummary = formatProviderStatus(error?.providerStatus)
      const bannerMessage = providerStatusSummary
        ? `${error.message} Provider status: ${providerStatusSummary}`
        : error.message

      setAnalysisError(bannerMessage)
      setUploadedImage(null)
      setCurrentPage('analysis')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleImageSelected = (imageData) => {
    setAnalysisError(null)
    setUploadedImage(imageData)
    setCurrentPage('analysis')
    performAnalysis(imageData)
  }

  const resetAnalysis = () => {
    setUploadedImage(null)
    setAnalysisResult(null)
    setAnalysisError(null)
    setIsAnalyzing(false)
  }

  const [isDownloading, setIsDownloading] = useState(false)

  const downloadReport = async (language = 'english') => {
    if (!analysisResult) return
    setIsDownloading(true)
    let timeoutId
    try {
      const reportData = {
        disease: analysisResult.disease,
        description: analysisResult.description,
        remedies: analysisResult.remedies || [],
        confidence: analysisResult.confidence,
        severity: analysisResult.severity,
        plant_name: analysisResult.plant_name,
        seasonal_tips: analysisResult.seasonal_tips || '',
        prescribed_care: analysisResult.prescribed_care || {},
        language: language
      }
      
      const controller = new AbortController()
      timeoutId = setTimeout(() => controller.abort(), 60000)
      
      const response = await fetchWithApiFallback('/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportData),
        signal: controller.signal
      })
      
      if (!response.ok) {
        throw new Error('Report generation failed')
      }
      
      const blob = await response.blob()
      clearTimeout(timeoutId)
      
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `plant-health-report-${language}-${Date.now()}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      clearTimeout(timeoutId)
      const msg = error.name === 'AbortError' ? 'PDF download took too long.' : 'Failed to download report.'
      alert(msg)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <>
      <Navbar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        language={language}
        setLanguage={setLanguage}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
      
      {currentPage === 'home' ? (
         <Hero language={language} isDark={isDark} onNavigate={setCurrentPage} />
      ) : (
        <div className="app-container">
          <main className="content-shell">
            <AnimatePresence mode="wait">
              {currentPage === 'analysis' && (
                <MotionDiv
                  key="analysis"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {!uploadedImage && !isAnalyzing && !analysisResult && (
                    <section className="page-shell">
                      <div className="page-header">
                        <h1 className="page-title">
                          {language === 'gujarati' ? 'છોડનું નિદાન' : 'Plant Diagnosis'}
                        </h1>
                        <p className="page-subtitle">
                          {language === 'gujarati'
                            ? 'તમારા છોડનો ફોટો અપલોડ કરો અને AI તરત જ તેનું નિદાન કરશે.'
                            : 'Upload a photo of your plant and the AI will analyze its health instantly.'}
                        </p>
                      </div>

                      {analysisError && (
                        <div className="panel-card" style={{ marginBottom: 'var(--space-4)', borderColor: 'var(--color-error)' }}>
                          <p style={{ margin: 0, color: 'var(--ui-text)' }}>{analysisError}</p>
                        </div>
                      )}

                      <UploadZone onImageSelected={handleImageSelected} language={language} />

                      <ScanHistory
                        history={scanHistory}
                        onSelect={(item) => {
                          setUploadedImage(item.image)
                          setAnalysisResult(item)
                        }}
                      />
                    </section>
                  )}

                  {isAnalyzing && !analysisResult && (
                    <section className="page-shell">
                      <div className="analysis-loading">
                        <div className="analysis-spinner" aria-hidden="true" />
                        <h3>{language === 'gujarati' ? 'વિશ્લેષણ કરી રહ્યું છે...' : 'Analyzing plant health...'}</h3>
                      </div>
                    </section>
                  )}

                  {analysisResult && !isAnalyzing && (
                    <AnalysisResults
                      result={analysisResult}
                      image={uploadedImage}
                      language={language}
                      isDownloading={isDownloading}
                      onReset={() => {
                        resetAnalysis()
                        setCurrentPage('analysis')
                      }}
                      onDownload={downloadReport}
                      onBack={() => {
                        resetAnalysis()
                        setCurrentPage('home')
                      }}
                    />
                  )}
                </MotionDiv>
              )}

              {currentPage === 'basic' && (
                <MotionDiv
                  key="basic"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <BasicCareTips language={language} />
                </MotionDiv>
              )}

              {currentPage === 'seasonal' && (
                <MotionDiv
                  key="seasonal"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <SeasonalCareTips language={language} />
                </MotionDiv>
              )}

              {currentPage === 'environmental' && (
                <MotionDiv
                  key="environmental"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <WeatherSoilData language={language} />
                </MotionDiv>
              )}
            </AnimatePresence>
          </main>
        </div>
      )}
    </>
  )
}

export default App
