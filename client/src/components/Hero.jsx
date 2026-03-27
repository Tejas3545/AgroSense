import PropTypes from 'prop-types'
import { t } from '../translations'
import { PlantIcon, AutumnIcon, GlobeIcon, SearchIcon } from './Icons'
import PlantShader from './PlantShader'

export default function Hero({ language = 'english', isDark = false, onNavigate }) {
  const features = [
    { id: 'analysis', titleKey: 'instantDiagnosis', descKey: 'instantDiagnosisDesc', Icon: SearchIcon },
    { id: 'basic', titleKey: 'fundamentalCare', descKey: 'fundamentalCareDesc', Icon: PlantIcon },
    { id: 'seasonal', titleKey: 'seasonalGuidance', descKey: 'seasonalGuidanceDesc', Icon: AutumnIcon },
    { id: 'environmental', titleKey: 'environmentalInsights', descKey: 'environmentalInsightsDesc', Icon: GlobeIcon }
  ]

  return (
    <section className="hero-landing">
      <div className="hero-landing__shader-bg">
        <PlantShader isDark={isDark} />
      </div>

      <div className="hero-landing__inner">
        <div className="hero-landing__content">
          <h1>
            {language === 'gujarati' ? 'છોડના રોગનું\nનિદાન કરો' : 'Diagnose with\nPlant Health AI'}
          </h1>
          <p>
            {language === 'gujarati'
              ? 'AI-સંચાલિત રોગ શોધ અને છોડની સંભાળ. તમારા છોડના સ્વાસ્થ્ય માટે બુદ્ધિશાળી સાધન.'
              : 'Integrate AI-powered disease identification into your plant care routine and get instant diagnosis with treatment plans.'}
          </p>
          <div className="hero-features">
            {features.map((f) => (
              <div
                key={f.id}
                className="hero-feature hero-feature--clickable"
                onClick={() => onNavigate(f.id)}
              >
                <span className="hero-feature__icon">
                  <f.Icon size={20} color="currentColor" />
                </span>
                <div>
                  <h4>{t(f.titleKey, language)}</h4>
                  <p>{t(f.descKey, language)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

Hero.propTypes = {
  language: PropTypes.string,
  isDark: PropTypes.bool,
  onNavigate: PropTypes.func.isRequired
}
