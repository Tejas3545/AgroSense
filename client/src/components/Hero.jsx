import { t } from '../translations'
import { PlantIcon } from './Icons'

export default function Hero({ language = 'english' }) {
    return (
        <header className="hero-section">
            <div className="hero-content">
                <div className="hero-icon" aria-hidden="true">
                    <PlantIcon size={28} color="var(--color-moss-deep)" />
                </div>

                <h1>{t('plantHealthAI', language)}</h1>

                <p>{t('heroDescription', language)}</p>

                <ul className="hero-meta" aria-label="Highlights">
                    <li>{t('realTimeAnalysis', language)}</li>
                    <li>{t('personalizedCare', language)}</li>
                </ul>
            </div>
        </header>
    )
}
