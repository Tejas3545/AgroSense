import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion' // eslint-disable-line no-unused-vars
import { t } from '../translations'
import { LeafIcon } from './Icons'

export default function UploadZone({ onImageSelected, language = 'english' }) {
    const fileInputRef = useRef(null)
    const [isDragOver, setIsDragOver] = useState(false)

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragOver(false)
        const file = e.dataTransfer.files[0]
        if (file?.type.startsWith('image/')) {
            processFile(file)
        }
    }

    const processFile = (file) => {
        const reader = new FileReader()
        reader.onload = (event) => {
            onImageSelected(event.target.result)
        }
        reader.readAsDataURL(file)
    }

    return (
        <section className="upload-container" style={{
            maxWidth: '800px',
            margin: 'var(--space-lg) auto',
            padding: '0 var(--space-md)'
        }}>
            <motion.div
                className="upload-dropzone"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                    e.preventDefault()
                    setIsDragOver(true)
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ 
                    scale: 1.02, 
                    backgroundColor: 'rgba(232, 168, 145, 0.08)',
                    borderColor: 'var(--color-clay)'
                }}
                transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                style={{
                    border: `2px dashed ${isDragOver ? 'var(--color-clay)' : 'var(--color-stone-light)'}`,
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-2xl) var(--space-lg)',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: isDragOver ? 'rgba(232, 168, 145, 0.12)' : 'linear-gradient(135deg, var(--color-white) 0%, rgba(245, 241, 237, 0.5) 100%)',
                    boxShadow: isDragOver ? '0 8px 32px rgba(198, 109, 82, 0.2)' : '0 4px 20px rgba(44, 62, 46, 0.08)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease'
                }}
            >
                <motion.div
                    animate={{
                        y: isDragOver ? -8 : 0,
                        color: isDragOver ? 'var(--color-clay)' : 'var(--color-moss-light)'
                    }}
                >
                    <motion.span 
                        style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-md)' }}
                        animate={{ scale: isDragOver ? 1.2 : 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                    >
                        <LeafIcon size={64} color={isDragOver ? 'var(--color-clay)' : 'var(--color-moss-light)'} />
                    </motion.span>
                    <h2 style={{ 
                        fontSize: 'var(--text-h3)', 
                        marginBottom: 'var(--space-xs)',
                        fontWeight: 600
                    }}>
                        {language === 'gujarati' ? 'તમારો નમૂનો અપલોડ કરો' : 'Upload Your Specimen'}
                    </h2>
                    <p style={{ 
                        fontSize: 'var(--text-small)',
                        color: 'var(--color-stone)',
                        marginBottom: 'var(--space-md)'
                    }}>
                        {t('dragDropImage', language)}
                    </p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        style={{
                            fontSize: '0.75rem',
                            color: 'var(--color-stone)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em'
                        }}
                    >
                        {language === 'gujarati' ? 'PNG, JPG, WEBP (10MB સુધી)' : 'PNG, JPG, WEBP (up to 10MB)'}
                    </motion.div>
                </motion.div>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        if (e.target.files[0]) processFile(e.target.files[0])
                    }}
                    hidden
                />
            </motion.div>
        </section>
    )
}
