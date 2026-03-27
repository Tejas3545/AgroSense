import { useState, useEffect, useCallback } from 'react'
import { t } from '../translations'
import { API_BASE_URL } from '../config/api'
import { WarningIcon } from './Icons'
import { CloudIcon, WindIcon, TemperatureIcon, WaterIcon } from './SeasonalIcons'

const WeatherSoilData = ({ onBack, language = 'english' }) => {
  const [weatherData, setWeatherData] = useState(null)
  const [soilData, setSoilData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const location = 'Rajkot, Gujarat' // Default location

  const fetchEnvironmentalData = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Fetch weather data from backend
      await fetchWeatherData()
      // Fetch soil data from backend
      await fetchSoilData()
    } catch (err) {
      console.error('Error fetching environmental data:', err)
      setError('Failed to load environmental data')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchEnvironmentalData()
  }, [fetchEnvironmentalData])

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/environment/weather?location=${encodeURIComponent(location)}`
      )
      
      if (response.ok) {
        const data = await response.json()
        setWeatherData({
          temperature: data.temperature,
          feels_like: data.feels_like,
          humidity: data.humidity,
          description: data.description,
          windSpeed: data.wind_speed,
          rainfall: data.rainfall,
          cloudiness: data.cloudiness,
          pressure: data.pressure,
          sunrise: data.sunrise,
          sunset: data.sunset
        })
      } else {
        throw new Error('Weather API request failed')
      }
    } catch (error) {
      console.error('Weather API error:', error)
      // Fallback mock data
      setWeatherData({
        temperature: 28,
        humidity: 65,
        description: 'Partly cloudy',
        windSpeed: 12,
        rainfall: 0,
        feels_like: 30,
        cloudiness: 40,
        pressure: 1013
      })
    }
  }

  const fetchSoilData = async () => {
    try {
      // You can add lat/lon parameters if user provides location
      const response = await fetch(`${API_BASE_URL}/environment/soil`)
      
      if (response.ok) {
        const data = await response.json()
        setSoilData({
          ph: data.ph,
          nitrogen: data.nitrogen,
          phosphorus: data.phosphorus,
          potassium: data.potassium,
          organicMatter: data.organic_matter,
          texture: data.texture,
          moisture: data.moisture,
          source: data.source
        })
      } else {
        throw new Error('Soil API request failed')
      }
    } catch (error) {
      console.error('Soil API error:', error)
      // Fallback mock data
      setSoilData({
        ph: 6.8,
        nitrogen: 'Medium',
        phosphorus: 'High',
        potassium: 'Medium',
        organicMatter: '2.1%',
        texture: 'Clay Loam',
        moisture: '45%',
        source: 'Fallback Data'
      })
    }
  }

  if (loading) {
    return (
      <div className="page-shell">
        <div className="page-header">
          <button className="back-chip" onClick={onBack}>← {language === 'gujarati' ? 'પાછા' : 'Back'}</button>
        </div>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading environmental data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-shell">
        <div className="page-header">
          <button className="back-chip" onClick={onBack}>← {language === 'gujarati' ? 'પાછા' : 'Back'}</button>
        </div>
        <div className="error-message">
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
            <WarningIcon size={20} color="var(--color-warning)" />
            {error}
          </p>
          <button onClick={fetchEnvironmentalData} className="retry-btn">
            {language === 'gujarati' ? 'ફરી પ્રયાસ કરો' : 'Retry'}
          </button>
        </div>
      </div>
    )
  }

  const recommendations = language === 'gujarati'
    ? [
        `ઊંચા તાપમાન દરમિયાન સવારે અથવા સાંજે પાણી આપો (${weatherData?.temperature ?? '--'}°C)`,
        `ભેજ જાળવવા માટે મૂળની આસપાસ મલ્ચિંગ કરો (${weatherData?.humidity ?? '--'}%)`,
        `pH ${soilData?.ph ?? '--'} ને 6.0-7.0 વચ્ચે જાળવવા માટે માટી ચકાસો`
      ]
    : [
        `Water in early morning or evening during high temperatures (${weatherData?.temperature ?? '--'}°C)`,
        `Apply mulch around roots to conserve moisture (${weatherData?.humidity ?? '--'}%)`,
        `Test soil to maintain pH between 6.0-7.0 (current ${soilData?.ph ?? '--'})`
      ]

  return (
    <div className="page-shell">
      <div className="page-header">
        {typeof onBack === 'function' && (
          <button className="back-chip" onClick={onBack}>← {language === 'gujarati' ? 'પાછા' : 'Back'}</button>
        )}
        <div>
          <h1 className="page-title">{t('weatherSoilData', language)}</h1>
          <p className="page-subtitle">
            {language === 'gujarati' ? 'તમારા સ્થાન માટે રીઅલ-ટાઇમ પર્યાવરણીય માહિતી' : 'Real-time environmental data for your location'}
          </p>
        </div>
      </div>

      <div className="env-grid">
        <section className="panel-card">
          <div className="panel-head">
            <h2><CloudIcon size={18} /> {t('currentWeather', language)}</h2>
            <span>{location}</span>
          </div>
          <div className="hero-metric">
            <strong>{weatherData?.temperature ?? '--'}°</strong>
            <p>{weatherData?.description || '--'}</p>
          </div>
          <div className="stat-grid">
            <div className="stat-card"><TemperatureIcon size={18} /><span>{t('temperature', language)}</span><strong>{weatherData?.temperature ?? '--'}°C</strong></div>
            <div className="stat-card"><WaterIcon size={18} /><span>{t('humidity', language)}</span><strong>{weatherData?.humidity ?? '--'}%</strong></div>
            <div className="stat-card"><WindIcon size={18} /><span>{t('windSpeed', language)}</span><strong>{weatherData?.windSpeed ?? '--'} km/h</strong></div>
          </div>
        </section>

        <section className="panel-card">
          <div className="panel-head">
            <h2><WaterIcon size={18} /> {t('soilData', language)}</h2>
          </div>
          <div className="stat-grid">
            <div className="stat-card"><WaterIcon size={18} /><span>{t('soilMoisture', language)}</span><strong>{soilData?.moisture ?? '--'}</strong></div>
            <div className="stat-card"><TemperatureIcon size={18} /><span>{t('soilTemperature', language)}</span><strong>{weatherData?.feels_like ?? weatherData?.temperature ?? '--'}°C</strong></div>
          </div>
          <div className="soil-strip">
            <div className="soil-strip-top">
              <span>{t('phLevel', language)}</span>
              <strong>{soilData?.ph ?? '--'}</strong>
            </div>
            <div className="soil-strip-grid">
              <div><span>{t('nitrogen', language)}</span><strong>{soilData?.nitrogen ?? '--'}</strong></div>
              <div><span>{t('phosphorus', language)}</span><strong>{soilData?.phosphorus ?? '--'}</strong></div>
              <div><span>{t('potassium', language)}</span><strong>{soilData?.potassium ?? '--'}</strong></div>
            </div>
          </div>
        </section>
      </div>

      <section className="panel-card recommendation-panel">
        <div className="panel-head">
          <h2>{t('recommendations', language)}</h2>
        </div>
        <div className="recommend-grid">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="recommend-card">
              <span>✓</span>
              <p>{rec}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default WeatherSoilData
