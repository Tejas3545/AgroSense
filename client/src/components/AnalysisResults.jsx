import { motion } from 'framer-motion' // eslint-disable-line no-unused-vars
import TreatmentPlan from './TreatmentPlan'
import DetailedCareGuide from './DetailedCareGuide'
import { t } from '../translations'
import { WarningIcon, GlobeIcon } from './Icons'

// SVG Icon Components
const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 4 23 10 17 10"/>
    <polyline points="1 20 1 14 7 14"/>
    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
  </svg>
)

const DownloadIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

export default function AnalysisResults({ result, image, onReset, onDownload, onBack, language = 'english', isDownloading = false }) {
    if (!result) return null

    const getSeverityColor = (imp) => {
        switch (imp) {
            case 'critical': return '#E05D44'; // Red-orange
            case 'high': return '#E8A891';     // Clay-soft
            case 'medium': return '#D4AF6F';   // Gold
            default: return '#8C8C82';         // Stone
        }
    }

    return (
      <motion.section
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="analysis-shell"
      >
        <div className="page-header compact">
          <button className="back-chip" onClick={onBack}>← {t('backToHome', language)}</button>
          <button className="back-chip muted" onClick={onReset}><RefreshIcon /> {t('scanAnother', language)}</button>
        </div>

        <div className="analysis-layout">
          <aside className="analysis-side panel-card">
            <button className="analysis-reset-btn" onClick={onReset}>{t('scanAnother', language)}</button>
            <div className="analysis-image-wrap">
              <img src={image} alt="Analyzed specimen" />
            </div>
            <div className="analysis-controls">
              <label>
                <GlobeIcon size={16} /> {t('reportLanguage', language)}
              </label>
              <div className="analysis-report-language">English</div>
              <button className="btn-download" onClick={() => onDownload('english')} disabled={isDownloading}>
                {isDownloading ? (
                  <><RefreshIcon /> {language === 'gujarati' ? 'તૈયાર કરી રહ્યા છીએ...' : 'Generating...'}</>
                ) : (
                  <><DownloadIcon size={16} /> {language === 'gujarati' ? 'હેલ્થ રિપોર્ટ ડાઉનલોડ (English)' : 'Download Health Report (English)'}</>
                )}
              </button>
            </div>
          </aside>

          <div className="analysis-main">
            <section className="panel-card">
              <div className="analysis-head">
                <h2>{language === 'gujarati' ? 'AI આંતરદૃષ્ટિ' : 'AI insights'}</h2>
                <span className="severity-chip" style={{ backgroundColor: getSeverityColor(result.severity) }}>
                  {t(result.severity.toLowerCase(), language)}
                </span>
              </div>

              {result.is_mock && (
                <div className="demo-chip">
                  <WarningIcon size={14} />
                  <span>{t('demoMode', language)}</span>
                </div>
              )}

              <h3 className="analysis-disease">{result.disease}</h3>
              {result.plant_name && (
                <p className="analysis-plant">{t('identifiedAs', language)}: <strong>{result.plant_name}</strong></p>
              )}

              <div className="analysis-confidence">
                <div className="analysis-confidence-bar">
                  <motion.div
                    className="analysis-confidence-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${result.confidence}%` }}
                    transition={{ duration: 1, ease: 'circOut' }}
                  />
                </div>
                <div className="analysis-confidence-meta">
                  <span>{t('aiConfidence', language)}</span>
                  <span>{result.confidence}% {t('match', language)}</span>
                </div>
              </div>

              <p className="analysis-description">{result.description}</p>

              {result.seasonal_tips && (
                <div className="analysis-seasonal-tip">
                  <h4>{t('seasonalCareTip', language)}</h4>
                  <p>"{result.seasonal_tips}"</p>
                </div>
              )}
            </section>

            <section className="panel-card">
              <TreatmentPlan remedies={result.remedies} language={language} />
              {result.prescribed_care && <DetailedCareGuide prescribedCare={result.prescribed_care} language={language} />}
            </section>
          </div>
        </div>
      </motion.section>
    )
}
