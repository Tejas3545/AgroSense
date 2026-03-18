import { motion } from 'framer-motion' // eslint-disable-line no-unused-vars
import { useState } from 'react'
import TreatmentPlan from './TreatmentPlan'
import DetailedCareGuide from './DetailedCareGuide'
import { t } from '../translations'
import { WarningIcon } from './Icons'

// SVG Icon Components
const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
)

const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 4 23 10 17 10"/>
    <polyline points="1 20 1 14 7 14"/>
    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
  </svg>
)

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

const ClipboardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
  </svg>
)

const GlobeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)

export default function AnalysisResults({ result, image, onReset, onDownload, onBack, language = 'english', isDownloading = false }) {
    const [pdfLanguage, setPdfLanguage] = useState('english')
    
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
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="results-container responsive-container"
            style={{ marginBottom: 'var(--space-2xl)' }}
        >
            <motion.div 
                style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-md)' }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
            >
                <motion.button
                    onClick={onBack}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'transparent',
                        border: '1px solid rgba(44,62,46,0.2)',
                        color: 'var(--color-moss-deep)',
                        padding: '8px 12px',
                        borderRadius: '999px',
                        cursor: 'pointer',
                        fontWeight: 600
                    }}
                    whileHover={{ scale: 1.05, x: -2 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <ArrowLeftIcon />
                    <span>{t('backToHome', language)}</span>
                </motion.button>

                <div className="btn-scan-another" style={{ margin: 0 }}>
                    <motion.button 
                        onClick={onReset}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                        <RefreshIcon /> {t('scanAnother', language)}
                    </motion.button>
                </div>
            </motion.div>

            <div className="results-layout-3" style={{ marginTop: 'var(--space-lg)' }}>
                {/* COL 1: Image & Controls */}
                <motion.div 
                    className="col-image"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <motion.div
                        initial={{ scale: 0.92 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                        style={{
                            position: 'relative',
                            borderRadius: 'var(--radius-md)',
                            overflow: 'hidden',
                            boxShadow: 'var(--shadow-hover)',
                            maxHeight: '400px'
                        }}
                    >
                        <motion.img
                            src={image}
                            alt="Analyzed Specimen"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        />
                        <motion.button
                            onClick={onReset}
                            style={{
                                position: 'absolute',
                                top: 'var(--space-sm)',
                                right: 'var(--space-sm)',
                                background: 'rgba(255,255,255,0.9)',
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                            title="Close / Scan Another"
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <CloseIcon />
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* COL 2: Diagnosis & Description */}
                <motion.div 
                    className="col-description"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <motion.div 
                            style={{
                                display: 'inline-block',
                                padding: '4px 12px',
                                borderRadius: '100px',
                                backgroundColor: getSeverityColor(result.severity),
                                color: '#fff',
                                fontSize: 'var(--text-tiny)',
                                textTransform: 'uppercase',
                            fontWeight: 600,
                            letterSpacing: '0.05em',
                            marginBottom: 'var(--space-sm)'
                        }}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.3, type: "spring", stiffness: 200 }}
                        >
                            {t(result.severity.toLowerCase(), language)} {t('severity', language)}
                        </motion.div>

                        {result.is_mock && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                justifyContent: 'center',
                                marginBottom: 'var(--space-md)',
                                padding: 'var(--space-xs) var(--space-sm)',
                                backgroundColor: '#ffec99',
                                color: '#664d03',
                                borderRadius: '4px',
                                fontSize: '0.85rem',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                border: '1px solid #ffd43b'
                            }}>
                                <WarningIcon size={16} color="#664d03" />
                                {t('demoMode', language)}
                            </div>
                        )}

                        <motion.h2 
                            style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: 'var(--space-xs)' }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                        >
                            {result.disease}
                        </motion.h2>

                        {result.plant_name && (
                            <motion.h3 
                                style={{
                                    fontSize: '1.2rem',
                                    color: 'var(--color-moss-light)',
                                    fontFamily: 'var(--font-serif)',
                                    marginTop: '-0.5rem',
                                    marginBottom: 'var(--space-md)'
                                }}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8, duration: 0.4 }}
                            >
                                {t('identifiedAs', language)}: {result.plant_name}
                            </motion.h3>
                        )}

                        <div className="confidence-meter" style={{ marginBottom: 'var(--space-lg)' }}>
                            <div style={{
                                height: '4px',
                                background: 'var(--color-stone-light)',
                                width: '100%',
                                borderRadius: '2px',
                                overflow: 'hidden'
                            }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${result.confidence}%` }}
                                    transition={{ duration: 1, ease: 'circOut' }}
                                    style={{
                                        height: '100%',
                                        background: 'var(--color-moss-deep)'
                                    }}
                                />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: 'var(--text-tiny)', color: 'var(--color-stone)' }}>
                                <span>{t('aiConfidence', language)}</span>
                                <span>{result.confidence}% {t('match', language)}</span>
                            </div>
                        </div>

                        <p style={{ fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 'var(--space-md)' }}>
                            {result.description}
                        </p>


                        {result.seasonal_tips && (
                            <div style={{
                                marginBottom: 'var(--space-md)',
                                padding: 'var(--space-sm)',
                                backgroundColor: 'rgba(232, 168, 145, 0.15)',
                                borderLeft: '4px solid var(--color-clay)',
                                borderRadius: '0 var(--radius-sm) var(--radius-sm) 0'
                            }}>
                                <h4 style={{
                                    fontSize: '0.9rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    color: 'var(--color-clay)',
                                    marginBottom: 'var(--space-xs)'
                                }}>
                                    {t('seasonalCareTip', language)}
                                </h4>
                                <p style={{ margin: 0, fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--color-moss-deep)' }}>
                                    "{result.seasonal_tips}"
                                </p>
                            </div>
                        )}

                        {result.prescribed_care && (
                            <div style={{
                                marginBottom: 'var(--space-md)',
                                padding: 'var(--space-sm)',
                                backgroundColor: 'rgba(212, 175, 111, 0.1)',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid rgba(212, 175, 111, 0.3)'
                            }}>
                                <h4 style={{
                                    fontSize: '1rem',
                                    color: 'var(--color-moss-deep)',
                                    marginBottom: 'var(--space-sm)',
                                    fontWeight: 600,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <ClipboardIcon /> {t('detailedCareGuide', language)}
                                </h4>
                                <p style={{ margin: '0 0 var(--space-sm) 0', fontSize: '0.95rem', color: 'var(--color-moss-light)' }}>
                                    {result.prescribed_care.overview}
                                </p>
                            </div>
                        )}

                        <div style={{ marginTop: 'var(--space-lg)' }}>
                            {/* Language Selector */}
                            <div style={{ marginBottom: 'var(--space-md)' }}>
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    color: 'var(--color-moss-deep)',
                                    marginBottom: 'var(--space-xs)'
                                }}>
                                    <GlobeIcon /> {t('reportLanguage', language)}
                                </label>
                                <select 
                                    value={pdfLanguage}
                                    onChange={(e) => setPdfLanguage(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        borderRadius: 'var(--radius-sm)',
                                        border: '2px solid var(--color-moss-light)',
                                        backgroundColor: 'var(--color-bg)',
                                        color: 'var(--color-moss-deep)',
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => e.target.style.borderColor = 'var(--color-moss-deep)'}
                                    onMouseLeave={(e) => e.target.style.borderColor = 'var(--color-moss-light)'}
                                >
                                    <option value="english">English</option>
                                    <option value="gujarati">ગુજરાતી (Gujarati)</option>
                                </select>
                            </div>
                            
                            <button
                                onClick={() => onDownload(pdfLanguage)}
                                disabled={isDownloading}
                                className="btn-download"
                                style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '8px', 
                                    justifyContent: 'center',
                                    opacity: isDownloading ? 0.6 : 1,
                                    cursor: isDownloading ? 'wait' : 'pointer'
                                }}
                            >
                                {isDownloading ? (
                                    <>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                                            <circle cx="12" cy="12" r="10"/>
                                            <path d="M12 6v6l4 2"/>
                                        </svg>
                                        {t('downloading', language) || 'Generating PDF...'}
                                    </>
                                ) : (
                                    <>
                                        <DownloadIcon /> {t('downloadReport', language)} ({pdfLanguage === 'english' ? 'English' : 'ગુજરાતી'})
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>

                {/* COL 3: Treatment Plan */}
                <div className="col-treatment">
                    <TreatmentPlan remedies={result.remedies} language={language} />
                </div>
            </div>

            {/* Detailed Care Guide - Full Width Below Results */}
            {result.prescribed_care && (
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    style={{ marginTop: 'var(--space-xl)' }}
                >
                    <DetailedCareGuide prescribedCare={result.prescribed_care} language={language} />
                </motion.div>
            )}
        </motion.section>
    )
}
