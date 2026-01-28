import { motion } from 'framer-motion'
import { t } from '../translations'
import { PlantIcon } from './Icons'

export default function Hero({ language = 'english' }) {
    return (
        <header className="hero-section" style={{
            position: 'relative',
            background: 'linear-gradient(135deg, var(--color-cream) 0%, rgba(245, 241, 237, 0.8) 100%)',
            borderBottom: '1px solid rgba(212, 175, 111, 0.2)',
            overflow: 'hidden'
        }}>
            {/* Decorative Elements */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.08 }}
                transition={{ duration: 1.5 }}
                style={{
                    position: 'absolute',
                    top: -100,
                    right: -50,
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, var(--color-clay) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }}
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.06 }}
                transition={{ duration: 1.8 }}
                style={{
                    position: 'absolute',
                    bottom: -80,
                    left: -50,
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, var(--color-gold) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }}
            />

            <div className="hero-content" style={{
                padding: 'var(--space-2xl) var(--space-md) var(--space-xl)',
                textAlign: 'center',
                maxWidth: '1200px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 2
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <motion.span
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 'var(--space-md)',
                            padding: 'var(--space-md)',
                            background: 'rgba(212, 175, 111, 0.1)',
                            borderRadius: 'var(--radius-lg)',
                            backdropFilter: 'blur(8px)'
                        }}
                    >
                        <PlantIcon size={48} color="var(--color-moss-deep)" />
                    </motion.span>
                    <h5 style={{
                        fontFamily: 'var(--font-sans)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        fontSize: 'var(--text-tiny)',
                        color: 'var(--color-clay)',
                        marginBottom: 'var(--space-md)',
                        display: 'block',
                        fontWeight: 700
                    }}>
                        {t('botanicalIntelligence', language)}
                    </h5>
                </motion.div>

                <div style={{ overflow: 'hidden' }}>
                    <motion.h1
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            marginBottom: 'var(--space-lg)',
                            color: 'var(--color-moss-deep)',
                            fontWeight: 500,
                            fontSize: 'min(var(--text-display), 5vw)'
                        }}
                    >
                        {t('plantHealthAI', language)}
                    </motion.h1>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    style={{
                        margin: '0 auto var(--space-lg)',
                        fontSize: '1.35rem',
                        color: 'var(--color-moss-light)',
                        maxWidth: '45ch',
                        lineHeight: 1.5,
                        fontWeight: 500
                    }}
                >
                    {t('heroDescription', language)}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <div style={{
                        display: 'flex',
                        gap: 'var(--space-md)',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{
                                fontSize: '0.85rem',
                                color: 'var(--color-stone)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                padding: '8px 16px',
                                background: 'rgba(212, 175, 111, 0.08)',
                                borderRadius: 'var(--radius-md)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <span>✓</span> {t('realTimeAnalysis', language)}
                        </motion.div>
                        <motion.div
                            animate={{ x: [0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                            style={{
                                fontSize: '0.85rem',
                                color: 'var(--color-stone)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                padding: '8px 16px',
                                background: 'rgba(198, 109, 82, 0.08)',
                                borderRadius: 'var(--radius-md)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <span>✓</span> {t('personalizedCare', language)}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </header>
    )
}
