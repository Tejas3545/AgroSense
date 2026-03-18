import { motion } from 'framer-motion' // eslint-disable-line no-unused-vars

export default function ScanHistory({ history, onSelect }) {
    if (!history || history.length === 0) return null

    return (
        <section className="history-section" style={{
            borderTop: '1px solid var(--color-stone-light)',
            paddingTop: 'var(--space-2xl)',
            marginTop: 'var(--space-2xl)',
            paddingBottom: 'var(--space-2xl)'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 var(--space-md)' }}>
                <h3 style={{
                    textAlign: 'center',
                    marginBottom: 'var(--space-lg)',
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'var(--text-h3)',
                    color: 'var(--color-stone)'
                }}>
                    Specimen Archive
                </h3>

                <div className="history-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: 'var(--space-md)'
                }}>
                    {history.map((scan, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -5 }}
                            onClick={() => onSelect(scan)}
                            style={{
                                cursor: 'pointer',
                                background: 'var(--color-white)',
                                borderRadius: 'var(--radius-md)',
                                overflow: 'hidden',
                                boxShadow: 'var(--shadow-soft)',
                                transition: 'box-shadow 0.2s'
                            }}
                        >
                            <div style={{ height: '180px', overflow: 'hidden' }}>
                                <img
                                    src={scan.image}
                                    alt={scan.disease}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div style={{ padding: 'var(--space-sm)' }}>
                                <h4 style={{
                                    fontSize: '1rem',
                                    marginBottom: '4px',
                                    fontFamily: 'var(--font-serif)'
                                }}>
                                    {scan.disease}
                                </h4>
                                <span style={{
                                    fontSize: 'var(--text-tiny)',
                                    color: 'var(--color-moss-light)',
                                    display: 'block'
                                }}>
                                    {new Date(scan.timestamp).toLocaleDateString()}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
