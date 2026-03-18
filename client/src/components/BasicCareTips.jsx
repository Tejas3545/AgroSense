import { motion } from 'framer-motion' // eslint-disable-line no-unused-vars
import { t } from '../translations'
import { SunIcon, WaterIcon, EarthIcon, TemperatureIcon, NutritionIcon, BugIcon, CheckIcon } from './SeasonalIcons'

const getBasicTips = (language) => [
  {
    category: language === 'gujarati' ? 'પ્રકાશ' : 'Lighting',
    Icon: SunIcon,
    tips: language === 'gujarati' ? [
      'છોડને દરરોજ 6-8 કલાક માટે તેજસ્વી, પરોક્ષ પ્રકાશમાં મૂકો',
      'બધી બાજુએ સમાન વૃદ્ધિ સુનિશ્ચિત કરવા માટે સાપ્તાહિક પોટ ફેરવો',
      'પાંદડાને બળીથી બચાવવા માટે છોડને સીધા કઠોર બપોરના સૂર્યથી દૂર રાખો',
      'ઓછા પ્રકાશ વિસ્તારો માટે, ગ્રો લાઇટ્સ અથવા ઓછા પ્રકાશ સહન કરતા છોડનો વિચાર કરો',
      'તમારા છોડને તેની આદર્શ પ્રકાશ સ્થિતિ શોધવા માટે દરરોજ નિરીક્ષણ કરો'
    ] : [
      'Place plants in bright, indirect light for 6-8 hours daily',
      'Rotate pots weekly to ensure even growth on all sides',
      'Keep plants away from direct harsh afternoon sun to prevent leaf burn',
      'For low-light areas, consider grow lights or low-light tolerant plants',
      'Observe your plant daily to find its ideal light sweet spot'
    ]
  },
  {
    category: language === 'gujarati' ? 'પાણી આપવું' : 'Watering',
    Icon: WaterIcon,
    tips: language === 'gujarati' ? [
      'જ્યારે માટીનો ઉપરનો ઇંચ સૂકો લાગે ત્યારે પાણી આપો',
      'મૂળને આઘાત ટાળવા માટે ઓરડાના તાપમાનનું પાણી વાપરો',
      'જ્યાં સુધી તે તળિયેના છિદ્રોમાંથી બહાર ન નીકળે ત્યાં સુધી પાણી આપો, પછી તપેલી ખાલી કરો',
      'વિવિધ છોડને અલગ પાણીની જરૂર છે: રસદાર ઓછું, ફર્ન્સ વધુ',
      'સવારે પાણી આપવું આદર્શ છે; ફંગલ સમસ્યાઓ અટકાવવા માટે પાંદડાને ભીંજવવાનું ટાળો',
      'શિયાળામાં, પાણીની આવર્તન ઘટાડો કારણ કે છોડ ધીમે ધીમે વૃદ્ધિ પામે છે'
    ] : [
      'Water when the top inch of soil feels dry to the touch',
      'Use room-temperature water to avoid shocking the roots',
      'Water until it drains from the bottom holes, then empty the saucer',
      'Different plants need different watering: succulents less, ferns more',
      'Morning watering is ideal; avoid wetting leaves to prevent fungal issues',
      'In winter, reduce watering frequency as plants grow slower'
    ]
  },
  {
    category: language === 'gujarati' ? 'માટી અને પોટિંગ' : 'Soil & Potting',
    Icon: EarthIcon,
    tips: language === 'gujarati' ? [
      'પર્લાઇટ અથવા ઓર્કિડ છાલ સાથે સારી ડ્રેનેજ પોટિંગ મિશ્રણનો ઉપયોગ કરો',
      'મૂળ સડો અટકાવવા માટે ડ્રેનેજ છિદ્રો સાથેના પોટ પસંદ કરો',
      'વસંતમાં છોડને ફરીથી પોટ કરો જ્યારે તેઓ તેમના કન્ટેનરથી વધી જાય',
      'તાજી માટી પોષક તત્વો પ્રદાન કરે છે અને ડ્રેનેજ સુધારે છે',
      'ભારે બગીચાની માટી ટાળો; હળવા ઇનડોર પોટિંગ મિશ્રણનો ઉપયોગ કરો',
      'ચોક્કસ જરૂરિયાતોનો વિચાર કરો: કેક્ટી રેતાળ મિશ્રણ પસંદ કરે છે, ફર્ન્સ ભેજ જાળવતા મિશ્રણને પસંદ કરે છે'
    ] : [
      'Use well-draining potting mix with added perlite or orchid bark',
      'Choose pots with drainage holes to prevent root rot',
      'Repot plants in spring when they outgrow their containers',
      'Fresh soil provides nutrients and improves drainage',
      'Avoid heavy garden soil; use lightweight indoor potting mix',
      'Consider the specific needs: cacti prefer sandy mix, ferns prefer moisture-retaining mix'
    ]
  },
  {
    category: language === 'gujarati' ? 'ભેજ અને તાપમાન' : 'Humidity & Temperature',
    Icon: TemperatureIcon,
    tips: language === 'gujarati' ? [
      'મોટાભાગના ઘરના છોડ 40-60% ભેજ સ્તર પસંદ કરે છે',
      'સાપ્તાહિક પાંદડાને ધુમ્મસ આપો અથવા પાણીથી ભરેલા કાંકરા ટ્રે પર મૂકો',
      'ભેજ કુદરતી રીતે વધારવા માટે છોડને એકસાથે જૂથ કરો',
      'છોડને હીટિંગ વેન્ટ્સ, એર કન્ડીશનર અને ઠંડા ડ્રાફ્ટથી દૂર રાખો',
      'મોટાભાગના ઘરના છોડ માટે 65-75°F (18-24°C) વચ્ચેનું તાપમાન જાળવો',
      'અચાનક તાપમાન ફેરફારો ટાળો જે છોડને તાણ આપી શકે છે'
    ] : [
      'Most houseplants prefer 40-60% humidity levels',
      'Mist leaves weekly or place on pebble trays filled with water',
      'Group plants together to naturally increase humidity',
      'Keep plants away from heating vents, air conditioners, and cold drafts',
      'Maintain temperatures between 65-75°F (18-24°C) for most houseplants',
      'Avoid sudden temperature changes that can stress plants'
    ]
  },
  {
    category: language === 'gujarati' ? 'ખોરાક અને પોષક તત્વો' : 'Feeding & Nutrients',
    Icon: NutritionIcon,
    tips: language === 'gujarati' ? [
      'વૃદ્ધિ સીઝન (વસંત/ઉનાળા) દરમિયાન દર 2-4 અઠવાડિયામાં છોડને ખવડાવો',
      'સામાન્ય સંભાળ માટે સંતુલિત ખાતર (જેમ કે 10-10-10) નો ઉપયોગ કરો',
      'પાનખર અને શિયાળાની નિષ્ક્રિયતામાં ખાતર ઘટાડો અથવા બંધ કરો',
      'વધુ ખાતર મૂળને બાળી નાખે છે; પેકેજ સૂચનાઓને કાળજીપૂર્વક અનુસરો',
      'પ્રવાહી અને ધીમા-રિલીઝ ખાતર વચ્ચે વૈકલ્પિક કરો',
      'માછલી ઇમલ્શન જેવા કાર્બનિક વિકલ્પો છોડના મૂળ પર હળવા છે'
    ] : [
      'Feed plants during growing season (spring/summer) every 2-4 weeks',
      'Use balanced fertilizer (like 10-10-10) for general care',
      'Reduce or stop fertilizing in fall and winter dormancy',
      'Over-fertilizing burns roots; follow package instructions carefully',
      'Alternate between liquid and slow-release fertilizers',
      'Organic options like fish emulsion are gentle on plant roots'
    ]
  },
  {
    category: language === 'gujarati' ? 'જીવાત અને રોગ નિવારણ' : 'Pest & Disease Prevention',
    Icon: BugIcon,
    tips: language === 'gujarati' ? [
      'જીવાતો ટાળવા માટે છોડને ઘરે લાવતા પહેલા તપાસો',
      'ધૂળ દૂર કરવા માટે મહિનામાં એકવાર નરમ, ભીના કપડાથી પાંદડા સાફ કરો',
      'કોઈપણ ચેપગ્રસ્ત છોડને તરત જ અન્ય છોડથી અલગ કરો',
      'સામાન્ય ઇનડોર જીવાતો: સ્પાઇડર માઇટ્સ, મીલીબગ્સ, સ્કેલ જંતુઓ અને ફંગસ ગ્નેટ્સ',
      'હળવા પ્રથમ-લાઇન સારવાર તરીકે નીમ તેલ અથવા જંતુનાશક સાબુનો ઉપયોગ કરો',
      'ફંગલ રોગો રોકવા માટે નાના પંખાથી હવાનું પરિભ્રમણ સુધારો',
      'છુપાયેલા જીવાતો માટે નિરીક્ષણ કરવા માટે નવા છોડને 2 અઠવાડિયા માટે ક્વોરેન્ટાઇન કરો'
    ] : [
      'Inspect new plants before bringing them home to avoid pests',
      'Wipe leaves monthly with a soft, damp cloth to remove dust',
      'Isolate any infested plant immediately from other plants',
      'Common indoor pests: spider mites, mealybugs, scale insects, and fungus gnats',
      'Use neem oil or insecticidal soap as gentle first-line treatments',
      'Improve air circulation with a small fan to prevent fungal diseases',
      'Quarantine new plants for 2 weeks to monitor for hidden pests'
    ]
  },
  {
    category: language === 'gujarati' ? 'સામાન્ય સંભાળ દિનચર્યા' : 'General Care Routine',
    Icon: CheckIcon,
    tips: language === 'gujarati' ? [
      'અઠવાડિયામાં 2-3 વખત માટીની ભેજ તપાસો',
      'જીવાતો અથવા રોગ માટે સાપ્તાહિક પાંદડા અને દાંડીઓનું નિરીક્ષણ કરો',
      'મૃત અથવા પીળા પાંદડાને તરત કાપો',
      'પ્રકાશસંશ્લેષણને મહત્તમ કરવા માટે મહિનામાં એકવાર પાંદડા સાફ કરો',
      'પાણી અને છોડની પ્રગતિનો સરળ લોગ રાખો',
      'ધીરજ રાખો - છોડને નવા વાતાવરણમાં સમાયોજન કરવામાં સમય લાગે છે',
      'જો તેઓ સમૃદ્ધ ન થઈ રહ્યા હોય તો છોડને ફરતે ખસેડવામાં ડરશો નહીં'
    ] : [
      'Check soil moisture 2-3 times per week',
      'Inspect leaves and stems weekly for pests or disease',
      'Prune dead or yellowing leaves promptly',
      'Clean leaves monthly to maximize photosynthesis',
      'Keep a simple log of watering and plant progress',
      'Be patient—plants take time to adjust to new environments',
      'Don\'t be afraid to move plants around if they\'re not thriving'
    ]
  }
]

export default function BasicCareTips({ onBack, language = 'english' }) {
  const basicTips = getBasicTips(language)
  
  return (
    <motion.div
      className="tips-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="tips-header">
        <button className="tips-back-btn" onClick={onBack}>
          ← {language === 'gujarati' ? 'પાછા' : 'Back'}
        </button>
        <div>
          <h1>{t('essentialPlantCare', language)}</h1>
          <p>{language === 'gujarati' ? 'કોઈપણ છોડને સ્વસ્થ અને ખુશ રાખવા માટે આવશ્યક ટિપ્સ' : 'Essential tips for keeping any plant healthy and happy'}</p>
        </div>
      </div>

      <div className="responsive-container tips-grid">
        {basicTips.map((section) => (
          <motion.article
            key={section.category}
            className="tips-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="tips-card__header">
              <span className="tips-card__icon">
                <section.Icon size={32} color="var(--color-moss-deep)" />
              </span>
              <h2>{section.category}</h2>
            </div>
            <div className="tips-card__rail" role="list" aria-label={`${section.category} tips`}>
              {section.tips.map((tip, index) => (
                <article className="tips-tip-card" role="listitem" key={`${section.category}-${index}`}>
                  <p>{tip}</p>
                </article>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  )
}
