import { motion } from 'framer-motion'
import { t } from '../translations'

export default function TreatmentPlan({ remedies, language = 'english' }) {
    if (!remedies || remedies.length === 0) return null

    return (
        <div className="treatment-plan" style={{ marginTop: 0 }}>
            <h3 style={{
                fontSize: 'var(--text-h3)',
                borderBottom: '1px solid var(--color-stone-light)',
                paddingBottom: 'var(--space-xs)',
                marginBottom: 'var(--space-md)'
            }}>
                {t('quickActionSteps', language)}
            </h3>

            <div className="remedies-list" style={{
                display: 'grid',
                gap: 'var(--space-md)',
                maxHeight: '350px',
                overflowY: 'auto',
                paddingRight: 'var(--space-sm)', // Prevent scrollbar overlap
                // Custom Scrollbar Logic
                scrollbarWidth: 'thin',
                scrollbarColor: 'var(--color-moss-light) var(--color-cream)'
            }}>
                <style>{`
                    .remedies-list::-webkit-scrollbar {
                        width: 6px;
                    }
                    .remedies-list::-webkit-scrollbar-track {
                        background: var(--color-cream);
                    }
                    .remedies-list::-webkit-scrollbar-thumb {
                        background-color: var(--color-moss-light);
                        border-radius: 20px;
                    }
                `}</style>
                {remedies.map((remedy, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 + 0.3 }}
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 'var(--space-sm)',
                            padding: 'var(--space-md)',
                            backgroundColor: 'rgba(245, 241, 237, 0.5)',
                            border: '1px solid var(--color-stone-light)',
                            borderRadius: 'var(--radius-sm)'
                        }}
                    >
                        <span style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1.5rem',
                            color: 'var(--color-clay)',
                            lineHeight: 1,
                            opacity: 0.8
                        }}>
                            {(idx + 1).toString().padStart(2, '0')}.
                        </span>

                        <div style={{ flex: 1 }}>
                            <h4 style={{
                                fontSize: '1rem',
                                fontWeight: 600,
                                marginBottom: 'var(--space-2xs)',
                                color: 'var(--color-moss-deep)'
                            }}>
                                {remedy.action}
                            </h4>
                            <div style={{
                                display: 'flex',
                                gap: 'var(--space-md)',
                                fontSize: 'var(--text-small)',
                                color: 'var(--color-stone)'
                            }}>
                                <span>⏱ {remedy.timeframe}</span>
                                <span>✓ {remedy.effectiveness}% {t('effective', language)}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
