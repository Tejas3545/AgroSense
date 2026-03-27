import { useMemo } from 'react'
import { t } from '../translations'
import Accordion from './Accordion'

export default function DetailedCareGuide({ prescribedCare, language = 'english' }) {

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
          content:
            typeof prescribedCare.overview === 'string' && prescribedCare.overview.trim()
              ? prescribedCare.overview
              : 'No overview available yet.'
        },
        {
          id: 'immediate',
          title: t('immediateActions', language),
          items: normalizeList(prescribedCare.immediate_actions)
        },
        {
          id: 'schedule',
          title: t('treatmentSchedule', language),
          schedule: normalizeSchedule(prescribedCare.treatment_schedule)
        },
        {
          id: 'environment',
          title: t('environmentalImprovements', language),
          items: normalizeList(prescribedCare.environmental_improvements)
        },
        {
          id: 'prevention',
          title: t('preventionTips', language),
          items: normalizeList(prescribedCare.prevention)
        }
      ]
    },
    [prescribedCare, language]
  )

  if (!prescribedCare) return null

  return (
    <div className="guide-shell">
      <div className="guide-head">
        <h2>{t('completeCare', language)}</h2>
        <p>{t('followGuide', language)}</p>
      </div>

      <Accordion items={sections} defaultOpen="overview" />

      <div className="guide-note">
        <p>
          <strong>{t('importantNote', language)}:</strong> {t('recoveryNote', language)}
        </p>
      </div>
    </div>
  )
}
