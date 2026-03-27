import { motion } from 'framer-motion' // eslint-disable-line no-unused-vars
import { useState } from 'react'
import { t } from '../translations'
import { SunIcon, WaterIcon, TemperatureIcon, SnowflakeIcon } from './SeasonalIcons'

const getSeasonData = (language) => [
  {
    id: 'spring',
    titleKey: 'springRenewal',
    Icon: SunIcon,
    tips: language === 'gujarati' ? [
      'નવી વૃદ્ધિ માટે મૃત અથવા ક્ષતિગ્રસ્ત શાખાઓ કાપો',
      'તાજી પોટિંગ માટીથી છોડને ફરીથી પોટ કરો',
      'નિયમિત ખાતર આપવાનું શરૂ કરો',
      'જેમ જેમ દિવસો લાંબા થાય છે તેમ ધીમે ધીમે પાણી વધારો',
      'રોગના ચિહ્નો માટે નવી વૃદ્ધિ પર નજર રાખો'
    ] : [
      'Prune dead or damaged branches to encourage new growth',
      'Repot plants with fresh potting soil',
      'Begin regular fertilizing schedule',
      'Gradually increase watering as days grow longer',
      'Watch new growth for signs of disease'
    ]
  },
  {
    id: 'summer',
    titleKey: 'summerVitality',
    Icon: WaterIcon,
    tips: language === 'gujarati' ? [
      'ગરમ દિવસોમાં વધુ વખત પાણી આપો',
      'સીધા બપોરના સૂર્યથી રક્ષણ આપો',
      'ભેજ જાળવી રાખવા માટે માટીમાં મલ્ચ ઉમેરો',
      'સક્રિય વૃદ્ધિ દરમિયાન દર 2 અઠવાડિયે ખાતર આપો',
      'જીવાત પ્રવૃત્તિ માટે નિયમિત તપાસ કરો'
    ] : [
      'Water more frequently during hot days',
      'Provide shade from direct afternoon sun',
      'Add mulch to soil to retain moisture',
      'Fertilize every 2 weeks during active growth',
      'Check regularly for pest activity'
    ]
  },
  {
    id: 'fall',
    titleKey: 'fallPreparation',
    Icon: TemperatureIcon,
    tips: language === 'gujarati' ? [
      'ઠંડા હવામાન પહેલાં બહારના છોડ અંદર ખસેડો',
      'ખાતરની આવર્તન ધીમે ધીમે ઘટાડો',
      'ઠંડા તાપમાનને અનુકૂલન માટે પાણી ઘટાડો',
      'શિયાળાની નિષ્ક્રિયતા માટે છોડ તૈયાર કરો',
      'મૂળ મજબૂત કરવા માટે ફોસ્ફરસ-ભારે ખાતર વાપરો'
    ] : [
      'Move outdoor plants inside before cold weather',
      'Gradually reduce fertilizing frequency',
      'Decrease watering to adapt to cooler temperatures',
      'Prepare plants for winter dormancy',
      'Use phosphorus-heavy fertilizer to strengthen roots'
    ]
  },
  {
    id: 'winter',
    titleKey: 'winterDormancy',
    Icon: SnowflakeIcon,
    tips: language === 'gujarati' ? [
      'ખાતર આપવાનું ઓછું કરો અથવા બંધ કરો',
      'માત્ર ત્યારે જ પાણી આપો જ્યારે માટી સંપૂર્ણ સૂકી હોય',
      'ડ્રાફ્ટ અને હીટિંગ વેન્ટ્સથી છોડને દૂર રાખો',
      'જો ઉપલબ્ધ હોય તો વધારાનો પ્રકાશ આપો',
      'ભેજ વધારવા માટે છોડને એકસાથે જૂથબદ્ધ કરો'
    ] : [
      'Reduce or stop fertilizing entirely',
      'Water only when soil is completely dry',
      'Keep plants away from drafts and heating vents',
      'Provide supplemental lighting if available',
      'Group plants together to increase humidity'
    ]
  }
]

export default function SeasonalCareTips({ onBack, language = 'english' }) {
  const [activeSeason, setActiveSeason] = useState('spring')
  const seasons = getSeasonData(language)
  const currentSeason = seasons.find((s) => s.id === activeSeason) || seasons[0]

  return (
    <motion.div className="page-shell" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="page-header">
        {typeof onBack === 'function' && (
          <button className="back-chip" onClick={onBack}>
            ← {language === 'gujarati' ? 'પાછા' : 'Back'}
          </button>
        )}
        <div>
          <h1 className="page-title">{t('seasonalCareGuide', language)}</h1>
          <p className="page-subtitle">
            {language === 'gujarati' ? 'દરેક મોસમ માટે ચોક્કસ સંભાળ ભલામણો' : 'Specific care recommendations for each season'}
          </p>
        </div>
      </div>

      <div className="season-tabs">
        {seasons.map((season) => {
          const Icon = season.Icon
          return (
            <button
              key={season.id}
              onClick={() => setActiveSeason(season.id)}
              className={`season-tab ${activeSeason === season.id ? 'active' : ''}`}
            >
              <Icon size={16} />
              <span>{t(season.id, language)}</span>
            </button>
          )
        })}
      </div>

      <motion.section className="season-panel" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="season-panel-head">
          <span className="care-icon-wrap">
            <currentSeason.Icon size={22} />
          </span>
          <h2>{t(currentSeason.titleKey, language)}</h2>
        </div>
        <div className="season-tip-stack">
          {currentSeason.tips.map((tip, idx) => (
            <div key={idx} className="season-tip-row">
              <span>{(idx + 1).toString().padStart(2, '0')}</span>
              <p>{tip}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  )
}
