import { motion } from 'framer-motion'
import { t } from '../translations'
import { LeafHealthIcon, SunIcon, SnowflakeIcon } from './SeasonalIcons'
import { AutumnIcon } from './Icons'

const getSeasonalTips = (language) => [
  {
    season: language === 'gujarati' ? 'વસંત' : 'Spring',
    Icon: LeafHealthIcon,
    color: '#E8A891',
    tips: language === 'gujarati' ? [
      'છોડને ફરીથી પોટ કરવાનું શરૂ કરો જે તેમના કન્ટેનરથી વધી ગયા હોય',
      'છોડ સક્રિય વૃદ્ધિ તબક્કામાં પ્રવેશ કરતાં ખાતરનું શેડ્યૂલ શરૂ કરો',
      'મૃત શિયાળુ પર્ણસમૂહને કાપો અને નવી શાખાઓને પ્રોત્સાહિત કરો',
      'તાપમાન ગરમ થતાં પાણી આપવાની આવર્તન વધારો',
      'દિવસના પ્રકાશ વધવાથી છોડને બારીઓની નજીક ખસેડો',
      'શિયાળામાં જીવતા રહી શકે તેવા જીવાતો માટે તપાસો',
      'જો છોડને બહાર ખસેડતા હોય તો તેમને ધીમે ધીમે આઉટડોર પરિસ્થિતિઓને અનુરૂપ બનાવો'
    ] : [
      'Begin repotting plants that have outgrown their containers',
      'Start fertilizing schedule as plants enter active growth phase',
      'Prune dead winter foliage and encourage new branching',
      'Increase watering frequency as temperatures warm up',
      'Move plants closer to windows as daylight increases',
      'Check for overwintering pests that may have survived the cold',
      'Gradually acclimate indoor plants to outdoor conditions if moving them outside'
    ]
  },
  {
    season: language === 'gujarati' ? 'ઉનાળો' : 'Summer',
    Icon: SunIcon,
    color: '#D4AF6F',
    tips: language === 'gujarati' ? [
      'વધુ બાષ્પીભવન દરને કારણે પાણી આપવાની આવર્તન વધારો',
      'પાંદડાને બળતી અટકાવવા માટે ટોચની ગરમી દરમિયાન બપોર પછીનો શેડ આપો',
      'ફંગલ રોગો અટકાવવા માટે પંખા વડે હવાનું પરિભ્રમણ વધારો',
      'દર 2 અઠવાડિયે સંતુલિત ખાતર સાથે છોડને ખવડાવો',
      'ગરમ, ભેજવાળી પરિસ્થિતિઓમાં ઉછરતા જીવાતોનું નિરીક્ષણ કરો',
      'છોડને એર કન્ડીશનીંગ વેન્ટ્સ અને અચાનક તાપમાન ફેરફારોથી દૂર રાખો',
      'તાજી હવા માટે પોટેડ છોડને આવરી બાહ્ય જગ્યાઓમાં ખસેડવાનું વિચારો',
      'ભેજ વધારવા માટે વહેલી સવારે પર્ણસમૂહને ધુમ્મસ કરો'
    ] : [
      'Increase watering frequency due to higher evaporation rates',
      'Provide afternoon shade during peak heat to prevent leaf scorch',
      'Boost air circulation with fans to prevent fungal diseases',
      'Feed plants every 2 weeks with balanced fertilizer',
      'Monitor for pests which thrive in warm, humid conditions',
      'Keep plants away from air conditioning vents and sudden temperature changes',
      'Consider moving potted plants to covered outdoor spaces for fresh air',
      'Mist foliage in the early morning to increase humidity'
    ]
  },
  {
    season: language === 'gujarati' ? 'પાનખર' : 'Autumn',
    Icon: AutumnIcon,
    color: '#C66D52',
    tips: language === 'gujarati' ? [
      'વૃદ્ધિ કુદરતી રીતે ધીમી થતાં ધીમે ધીમે પાણી ઘટાડો',
      'ખાતર એપ્લિકેશન ઘટાડવાનું શરૂ કરો',
      'આકાર જાળવવા માટે હળવો કાપ કરો; વસંત માટે ભારે કાપ સાચવો',
      'છોડને અંદર લાવતા પહેલા જીવાતો માટે સંપૂર્ણ નિરીક્ષણ કરો',
      'ઠંડી રાત્રિના ડ્રાફ્ટવાળી બારીઓથી છોડને દૂર ખસેડો',
      'ઇનડોર હીટિંગ શુષ્ક હવા વધારતાં ભેજ સ્તર તપાસો',
      'ઝાંખા થતા સૂર્યપ્રકાશને મહત્તમ કરવા માટે બારીઓ અને છોડના પાંદડા સાફ કરો',
      'શિયાળા પહેલાં ફરીથી પોટિંગ અને છોડ પ્રચાર પ્રોજેક્ટ્સ માટે યોજના બનાવો'
    ] : [
      'Gradually reduce watering as growth slows naturally',
      'Begin tapering off fertilizer applications',
      'Prune lightly to maintain shape; save heavy pruning for spring',
      'Inspect plants thoroughly for pests before bringing them inside',
      'Move plants away from windows with cold night drafts',
      'Check humidity levels as indoor heating increases dry air',
      'Clean windows and plant leaves to maximize fading sunlight',
      'Plan for repotting and plant propagation projects before winter'
    ]
  },
  {
    season: language === 'gujarati' ? 'શિયાળો' : 'Winter',
    Icon: SnowflakeIcon,
    color: '#2C3E2E',
    tips: language === 'gujarati' ? [
      'પાણી નોંધપાત્ર રીતે ઘટાડો; મોટાભાગના છોડ નિષ્ક્રિયતામાં પ્રવેશ કરે છે',
      'શિયાળાની નિષ્ક્રિયતા દરમિયાન સંપૂર્ણપણે ખાતર બંધ કરો',
      'જ્યારે માટી 2 ઇંચ નીચે સંપૂર્ણપણે સૂકી હોય ત્યારે જ પાણી આપો',
      'છોડને ઠંડા બારીના કાચ અને હીટિંગ વેન્ટ્સથી દૂર રાખો',
      'હ્યુમિડિફાયર અથવા પાણીથી ભરેલા કાંકરા ટ્રે સાથે ભેજ વધારો',
      'વધુ સૂર્યપ્રકાશ માટે બારીઓની નજીક છોડને સ્થાન આપો',
      'મોટાભાગના છોડ માટે 60-70°F (15-21°C) તાપમાન જાળવો',
      'નવી વૃદ્ધિ દેખાય ત્યાં સુધી પાણી અને ખાતર ધૈર્યપૂર્વક રાહ જુઓ'
    ] : [
      'Reduce watering significantly; most plants enter dormancy',
      'Stop fertilizing completely during winter dormancy',
      'Water only when soil is completely dry 2 inches down',
      'Keep plants away from cold window panes and heating vents',
      'Increase humidity with humidifiers or water-filled pebble trays',
      'Provide supplemental lighting if days are too short',
      'Wipe leaves regularly to remove dust blocking limited winter light',
      'Resist the urge to repot or propagate; let plants rest',
      'Lower room temperatures (60-65°F) if possible to reduce watering needs'
    ]
  }
]

const getSeasonalChallenges = (language) => [
  {
    challenge: language === 'gujarati' ? 'મોસમી પ્રકાશ પરિવર્તનો' : 'Seasonal Light Changes',
    solutions: language === 'gujarati' ? [
      'ઓછા શિયાળુ પ્રકાશને પૂરક બનાવવા માટે ગ્રો લાઇટ્સનો ઉપયોગ કરો',
      'પાનખર અને શિયાળામાં છોડને બારીઓની નજીક ખસેડો',
      'ઉપલબ્ધ પ્રકાશને મહત્તમ કરવા માટે નિયમિતપણે બારીઓ સાફ કરો',
      'સમાન પ્રકાશ એક્સપોઝર સુનિશ્ચિત કરવા માટે સાપ્તાહિક છોડને ફેરવો',
      'ઉનાળામાં, તીવ્ર બપોરના સૂર્યને ફિલ્ટર કરવા માટે શીર્સનો ઉપયોગ કરો'
    ] : [
      'Use grow lights to supplement low winter light',
      'Move plants closer to windows in fall and winter',
      'Clean windows regularly to maximize available light',
      'Rotate plants weekly to ensure even light exposure',
      'In summer, use sheers to filter intense afternoon sun'
    ]
  },
  {
    challenge: language === 'gujarati' ? 'તાપમાન વધઘટ' : 'Temperature Fluctuations',
    solutions: language === 'gujarati' ? [
      '65-75°F વચ્ચે સુસંગત તાપમાન જાળવો',
      'છોડને હીટિંગ વેન્ટ્સ અથવા એસી એકમોની નજીક મૂકવાનું ટાળો',
      'શિયાળામાં છોડને ઠંડી બારી ડ્રાફ્ટથી દૂર રાખો',
      'તાપમાન ફેરફારોને ધીમે ધીમે છોડને અનુરૂપ બનાવો',
      'તણાવના ચિહ્નો જુઓ: પાંદડા ખરવા, સુકાઈ જવું, અથવા ધીમી વૃદ્ધિ'
    ] : [
      'Maintain consistent temperatures between 65-75°F',
      'Avoid placing plants near heating vents or AC units',
      'Keep plants away from cold window drafts in winter',
      'Gradually acclimate plants to temperature changes',
      'Watch for signs of stress: leaf drop, wilting, or slow growth'
    ]
  },
  {
    challenge: language === 'gujarati' ? 'ભેજ વિવિધતા' : 'Humidity Variations',
    solutions: language === 'gujarati' ? [
      'શુષ્ક શિયાળાના મહિનાઓમાં હ્યુમિડિફાયરનો ઉપયોગ કરો',
      'માઇક્રોક્લાઇમેટ બનાવવા માટે છોડને એકસાથે જૂથ કરો',
      'છોડને પાણીથી ભરેલા કાંકરા ટ્રે પર મૂકો',
      'નિયમિતપણે પર્ણસમૂહને ધુમ્મસ કરો, ખાસ કરીને ઓછા-ભેજ ઋતુમાં',
      'હીટિંગ વેન્ટ્સ ધરાવતા વિસ્તારોને ટાળો જે હવાને ઝડપથી સૂકવી દે છે'
    ] : [
      'Use humidifiers in dry winter months',
      'Group plants together to create a microclimate',
      'Place plants on pebble trays filled with water',
      'Mist foliage regularly, especially in low-humidity seasons',
      'Avoid areas with heating vents that dry out air quickly'
    ]
  },
  {
    challenge: language === 'gujarati' ? 'જીવાત ફાટી નીકળે' : 'Pest Outbreaks',
    solutions: language === 'gujarati' ? [
      'જીવાતના ચિહ્નો માટે સાપ્તાહિક છોડ તપાસો',
      'ચેપગ્રસ્ત છોડને તરત જ અલગ કરો',
      'સાફ ન થાય ત્યાં સુધી દર 7-10 દિવસે નીમ તેલ છાંટો',
      'ભારે ચેપગ્રસ્ત પાંદડાને તાત્કાલિક દૂર કરો',
      'જીવાત ચેપને રોકવા માટે હવાનું પરિભ્રમણ સુધારો'
    ] : [
      'Check plants weekly for signs of pests',
      'Isolate infected plants immediately',
      'Spray neem oil every 7-10 days until clear',
      'Remove heavily infested leaves promptly',
      'Improve air circulation to prevent pest infestations'
    ]
  }
]

export default function SeasonalCareTips({ onBack, language = 'english' }) {
  const seasonalTips = getSeasonalTips(language)
  const seasonalChallenges = getSeasonalChallenges(language)
  
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
          <h1>{t('seasonalCareGuide', language)}</h1>
          <p>{language === 'gujarati' ? 'આખા વર્ષ દરમિયાન ખીલેલા છોડ માટે મોસમો સાથે તમારી છોડ સંભાળ દિનચર્યા ગોઠવો' : 'Adjust your plant care routine with the seasons for thriving plants year-round'}</p>
        </div>
      </div>

      <div className="responsive-container">
        <div className="seasonal-grid">
          {seasonalTips.map((section) => (
            <motion.article
              key={section.season}
              className="seasonal-card"
              style={{ '--season-color': section.color }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <div className="seasonal-card__header">
                <span className="seasonal-card__emoji">
                  <section.Icon size={40} color={section.color} />
                </span>
                <h2>{section.season}</h2>
              </div>
              <ul className="seasonal-card__list">
                {section.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <div className="challenges-section">
          <h2>Common Seasonal Challenges & Solutions</h2>
          <div className="challenges-grid">
            {seasonalChallenges.map((item) => (
              <motion.div
                key={item.challenge}
                className="challenge-card"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <h3>{item.challenge}</h3>
                <ul>
                  {item.solutions.map((solution) => (
                    <li key={solution}>{solution}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
