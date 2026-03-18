import { motion } from 'framer-motion' // eslint-disable-line no-unused-vars
import { useMemo, useState } from 'react'
import { t } from '../translations'

// SVG Icon Components
const ClipboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
  </svg>
)

const AlertIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
)

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)

const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

export default function DetailedCareGuide({ prescribedCare, language = 'english' }) {
  const [expandedSection, setExpandedSection] = useState('overview')

  const normalizeList = (value) => {
    if (Array.isArray(value)) return value
    if (typeof value === 'string') {
      return value
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean)
    }
    return []
  }

  const normalizeSchedule = (value) => {
    if (!Array.isArray(value)) return []
    return value.filter((item) => item && (item.week || item.actions))
  }

  const sections = useMemo(
    () => {
      if (!prescribedCare) return []
      
      return [
        {
          id: 'overview',
          title: t('overview', language),
          icon: <ClipboardIcon />,
          content:
            typeof prescribedCare.overview === 'string' && prescribedCare.overview.trim()
              ? prescribedCare.overview
              : 'No overview available yet.'
        },
        {
          id: 'immediate',
          title: t('immediateActions', language),
          icon: <AlertIcon />,
          items: normalizeList(prescribedCare.immediate_actions)
        },
        {
          id: 'schedule',
          title: t('treatmentSchedule', language),
          icon: <CalendarIcon />,
          schedule: normalizeSchedule(prescribedCare.treatment_schedule)
        },
        {
          id: 'environment',
          title: t('environmentalImprovements', language),
          icon: <GlobeIcon />,
          items: normalizeList(prescribedCare.environmental_improvements)
        },
        {
          id: 'prevention',
          title: t('preventionTips', language),
          icon: <ShieldIcon />,
          items: normalizeList(prescribedCare.prevention)
        }
      ]
    },
    [prescribedCare, language]
  )

  if (!prescribedCare) return null

  return (
    <div className="detailed-care-guide">
      <div className="care-guide__header">
        <h2>{t('completeCare', language)}</h2>
        <p>{t('followGuide', language)}</p>
      </div>

      <div className="care-guide__sections">
        {sections.map((section, sectionIndex) => (
          <motion.div
            key={section.id}
            className="care-guide__section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: sectionIndex * 0.08, duration: 0.4 }}
          >
            <button
              className={`care-guide__toggle ${expandedSection === section.id ? 'active' : ''}`}
              onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
            >
              <span className="toggle-icon">{section.icon}</span>
              <span className="toggle-title">{section.title}</span>
              <span className="toggle-arrow">{expandedSection === section.id ? '▲' : '▼'}</span>
            </button>

            {expandedSection === section.id && (
              <motion.div
                className="care-guide__content"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {section.content && (
                  <p className="care-guide__text">{section.content}</p>
                )}

                {section.items && section.items.length > 0 && (
                  <ul className="care-guide__list">
                    {section.items.map((item, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.3 }}
                      >
                        <span className="list-marker" aria-hidden="true">•</span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                )}

                {section.schedule && section.schedule.length > 0 && (
                  <div className="care-guide__schedule">
                    {section.schedule.map((item, idx) => (
                      <div key={idx} className="schedule-item">
                        <h5>{item.week}</h5>
                        {Array.isArray(item.actions) ? (
                          <ul>
                            {item.actions.map((action, actionIdx) => (
                              <li key={actionIdx}>{action}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>{item.actions}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="care-guide__note">
        <p>
          <strong>{t('importantNote', language)}:</strong> {t('recoveryNote', language)}
        </p>
      </div>
    </div>
  )
}
